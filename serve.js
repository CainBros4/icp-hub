/**
 * serve.js — Key Lime Brand Hub Server
 * Zero external dependencies. Handles static files, brand endpoints, and asset upload API.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { toJSON, toMarkdown, toPromptPack } = require('./brand-renderer');

const PORT = process.env.PORT || 3000;
const DIR = __dirname;
const DATA_DIR = path.join(DIR, 'data');
const UPLOADS_DIR = path.join(DATA_DIR, 'uploads');
const ASSETS_FILE = path.join(DATA_DIR, 'assets.json');

// Ensure data directories exist
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
if (!fs.existsSync(ASSETS_FILE)) fs.writeFileSync(ASSETS_FILE, JSON.stringify({ assets: [] }, null, 2));

const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon', '.md': 'text/plain; charset=utf-8', '.woff2': 'font/woff2',
  '.gif': 'image/gif', '.txt': 'text/plain',
};

function readAssets() {
  try { return JSON.parse(fs.readFileSync(ASSETS_FILE, 'utf8')); }
  catch { return { assets: [] }; }
}

function writeAssets(data) {
  fs.writeFileSync(ASSETS_FILE, JSON.stringify(data, null, 2));
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').substring(0, 60);
}

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function json(res, code, data) {
  cors(res);
  res.writeHead(code, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function text(res, code, body, contentType) {
  cors(res);
  res.writeHead(code, { 'Content-Type': contentType || 'text/plain; charset=utf-8' });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

/**
 * Minimal multipart form-data parser (zero deps)
 * Returns { fields: {}, files: [{ fieldname, filename, mimetype, data }] }
 */
function parseMultipart(buf, boundary) {
  const files = [];
  const fields = {};
  const sep = Buffer.from('--' + boundary);
  let start = 0;

  while (true) {
    const idx = buf.indexOf(sep, start);
    if (idx === -1) break;
    const nextIdx = buf.indexOf(sep, idx + sep.length);
    if (nextIdx === -1) break;

    const part = buf.slice(idx + sep.length, nextIdx);
    const headerEnd = part.indexOf('\r\n\r\n');
    if (headerEnd === -1) { start = nextIdx; continue; }

    const headers = part.slice(0, headerEnd).toString('utf8');
    let body = part.slice(headerEnd + 4);
    // Trim trailing \r\n
    if (body.length >= 2 && body[body.length - 2] === 0x0d && body[body.length - 1] === 0x0a) {
      body = body.slice(0, body.length - 2);
    }

    const nameMatch = headers.match(/name="([^"]+)"/);
    const filenameMatch = headers.match(/filename="([^"]+)"/);
    const typeMatch = headers.match(/Content-Type:\s*(.+)/i);

    if (filenameMatch) {
      files.push({
        fieldname: nameMatch ? nameMatch[1] : 'file',
        filename: filenameMatch[1],
        mimetype: typeMatch ? typeMatch[1].trim() : 'application/octet-stream',
        data: body,
      });
    } else if (nameMatch) {
      fields[nameMatch[1]] = body.toString('utf8');
    }

    start = nextIdx;
  }

  return { fields, files };
}

// ── ROUTE HANDLER ──
const server = http.createServer(async (req, res) => {
  const method = req.method;
  let url = req.url.split('?')[0];
  const query = {};
  const qs = req.url.split('?')[1];
  if (qs) qs.split('&').forEach(p => { const [k, v] = p.split('='); query[k] = decodeURIComponent(v || ''); });

  cors(res);
  if (method === 'OPTIONS') { res.writeHead(204); return res.end(); }

  // ── BRAND ENDPOINTS ──
  if (url === '/brand.json' && method === 'GET') {
    return text(res, 200, toJSON(), 'application/json');
  }
  if (url === '/brand.md' && method === 'GET') {
    return text(res, 200, toMarkdown(), 'text/plain; charset=utf-8');
  }
  if (url === '/brand/prompt-pack' && method === 'GET') {
    const manifest = readAssets();
    return text(res, 200, toPromptPack(manifest), 'text/plain; charset=utf-8');
  }

  // ── ASSET API ──
  if (url === '/assets/api/upload' && method === 'POST') {
    try {
      const contentType = req.headers['content-type'] || '';
      const boundaryMatch = contentType.match(/boundary=(.+)/);
      if (!boundaryMatch) return json(res, 400, { error: 'Missing boundary' });

      const body = await readBody(req);
      const { files, fields } = parseMultipart(body, boundaryMatch[1]);
      if (files.length === 0) return json(res, 400, { error: 'No files uploaded' });

      const manifest = readAssets();
      const results = [];

      for (const file of files) {
        const id = 'asset_' + crypto.randomBytes(4).toString('hex');
        const ext = path.extname(file.filename).toLowerCase() || '.jpg';
        const slug = slugify(file.filename.replace(ext, ''));
        const filename = slug + '_' + id + ext;
        const filePath = path.join(UPLOADS_DIR, filename);

        fs.writeFileSync(filePath, file.data);

        const entry = {
          id,
          url: '/data/uploads/' + filename,
          filename,
          title: fields.title || file.filename.replace(ext, '').replace(/[-_]/g, ' '),
          category: fields.category || 'references',
          exemplifies: [],
          caption: '',
          do_not_caption: '',
          tags: [],
          uploaded: new Date().toISOString(),
          size: file.data.length,
        };

        manifest.assets.push(entry);
        results.push({ id: entry.id, url: entry.url, filename: entry.filename });
      }

      writeAssets(manifest);
      return json(res, 201, results.length === 1 ? results[0] : results);
    } catch (err) {
      console.error('Upload error:', err);
      return json(res, 500, { error: 'Upload failed: ' + err.message });
    }
  }

  if (url === '/assets/api/list' && method === 'GET') {
    const manifest = readAssets();
    let assets = manifest.assets;
    if (query.category) assets = assets.filter(a => a.category === query.category);
    return json(res, 200, { assets });
  }

  if (url === '/assets/api/manifest.json' && method === 'GET') {
    const manifest = readAssets();
    // Add full URLs
    const host = req.headers.host || 'localhost:' + PORT;
    const proto = req.headers['x-forwarded-proto'] || 'http';
    const base = proto + '://' + host;
    const enriched = {
      brand: 'Key Lime',
      generated: new Date().toISOString(),
      assets: manifest.assets.map(a => ({
        ...a,
        url: base + a.url,
      })),
    };
    return json(res, 200, enriched);
  }

  // PATCH /assets/api/:id
  const patchMatch = url.match(/^\/assets\/api\/([a-z0-9_]+)$/);
  if (patchMatch && method === 'PATCH') {
    try {
      const body = await readBody(req);
      const updates = JSON.parse(body.toString('utf8'));
      const manifest = readAssets();
      const idx = manifest.assets.findIndex(a => a.id === patchMatch[1]);
      if (idx === -1) return json(res, 404, { error: 'Asset not found' });

      const allowed = ['title', 'category', 'exemplifies', 'caption', 'do_not_caption', 'tags'];
      allowed.forEach(k => { if (updates[k] !== undefined) manifest.assets[idx][k] = updates[k]; });
      writeAssets(manifest);
      return json(res, 200, manifest.assets[idx]);
    } catch (err) {
      return json(res, 400, { error: 'Invalid JSON: ' + err.message });
    }
  }

  // DELETE /assets/api/:id
  if (patchMatch && method === 'DELETE') {
    const manifest = readAssets();
    const idx = manifest.assets.findIndex(a => a.id === patchMatch[1]);
    if (idx === -1) return json(res, 404, { error: 'Asset not found' });

    const asset = manifest.assets[idx];
    const filePath = path.join(DIR, asset.url);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    manifest.assets.splice(idx, 1);
    writeAssets(manifest);
    return json(res, 200, { deleted: asset.id });
  }

  // ── STATIC FILE SERVING ──
  // Pretty-URL aliases → canonical pages
  if (url === '/')                url = '/index.html';
  if (url === '/philosophy')      url = '/philosophy.html';
  if (url === '/brand')           url = '/brand-guide.html';
  if (url === '/brand-guide')     url = '/brand-guide.html';
  if (url === '/messaging')       url = '/messaging.html';
  if (url === '/look-and-feel')   url = '/look-and-feel.html';
  if (url === '/strategy')        url = '/strategy.html';
  if (url === '/assets')          url = '/assets.html';
  if (url === '/icp' || url === '/playbooks') url = '/icp-hub.html';
  if (url === '/audiences/buyers' || url === '/audiences/sellers' || url === '/audiences/concierges') url = '/icp-hub.html';

  const filePath = path.join(DIR, url);
  if (!filePath.startsWith(DIR)) { res.writeHead(403); return res.end('Forbidden'); }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Fallback to index.html for any missing route
      fs.readFile(path.join(DIR, 'index.html'), (err2, fallback) => {
        if (err2) { res.writeHead(404); return res.end('Not found'); }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(fallback);
      });
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const mime = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': mime });
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Key Lime Brand Hub on port ${PORT}`);
  console.log(`  /                   → brand & marketing hub (landing)`);
  console.log(`  /philosophy         → brand philosophy`);
  console.log(`  /brand-guide        → visual identity & style guide`);
  console.log(`  /messaging          → messaging & positioning`);
  console.log(`  /look-and-feel      → creative references & moodboard`);
  console.log(`  /strategy           → marketing strategy`);
  console.log(`  /icp                → ICP playbooks`);
  console.log(`  /assets             → visual asset library`);
  console.log(`  /brand.json         → structured brand spec (APIs)`);
  console.log(`  /brand.md           → markdown brand spec`);
  console.log(`  /brand/prompt-pack  → LLM-ready brand context`);
  console.log(`  /assets/api/*       → asset CRUD API`);
});

