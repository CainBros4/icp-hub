/**
 * brand-renderer.js — Renders brand-data.js into JSON, Markdown, and Prompt-Pack formats
 */
const BRAND = require('./brand-data');

function toJSON() {
  return JSON.stringify(BRAND, null, 2);
}

function toMarkdown() {
  const B = BRAND;
  const l = [];
  const h = (n, t) => '#'.repeat(n) + ' ' + t;

  l.push(h(1, `${B.brand} — Brand Specification`));
  l.push(`*Version ${B.version} · Updated ${B.updated}*\n\n---\n`);

  l.push(h(2, 'Philosophy'));
  l.push(h(3, 'Identity Contract'));
  l.push(`> "${B.philosophy.identity_contract}"\n`);
  l.push(h(3, 'Mission'));
  l.push(B.philosophy.mission + '\n');
  l.push(h(3, 'Vision'));
  l.push(B.philosophy.vision + '\n');
  l.push(h(3, 'Trajectory'));
  l.push('| Phase | Market | Posture |\n|---|---|---|');
  B.philosophy.trajectory.forEach(t => l.push(`| ${t.phase} | ${t.market} | ${t.posture} |`));
  l.push('\n---\n');

  l.push(h(2, 'Core Values') + '\n');
  B.values.forEach((v, i) => {
    l.push(h(3, `${i + 1}. ${v.name}`));
    l.push(v.description);
    l.push(`**Test:** ${v.test}\n`);
  });
  l.push('---\n');

  l.push(h(2, 'Brand Archetypes') + '\n');
  ['primary', 'secondary', 'tertiary'].forEach(key => {
    const a = B.archetypes[key];
    l.push(h(3, `${key.charAt(0).toUpperCase() + key.slice(1)} · ${a.role}: The ${a.name}`));
    l.push(`*"${a.essence}"*\n`);
    l.push(`**Core desire:** ${a.core_desire}`);
    l.push(`**Core fear:** ${a.core_fear}`);
    l.push(`**Shadow to avoid:** ${a.shadow_to_avoid}\n`);
    a.application.forEach(pt => l.push(`- ${pt}`));
    l.push(`\n**Reference brands:** ${a.reference_brands.join(', ')}\n`);
  });
  l.push(`> **The Combination:** ${B.archetypes.combination}\n`);
  l.push('---\n');

  // Buyer archetypes
  l.push(h(2, 'Buyer Archetype Stack') + '\n');
  l.push(`*${B.buyer_archetypes.weight}*\n`);
  l.push(`**Problem frame:** ${B.buyer_archetypes.problem_frame}\n`);
  l.push(h(3, 'The Four Moves'));
  l.push('| Move | Archetype | What it does |\n|---|---|---|');
  B.buyer_archetypes.four_moves.forEach(m => l.push(`| ${m.name} | ${m.archetype} | ${m.move} |`));
  l.push(`\n**Persuasion sequence:** ${B.buyer_archetypes.persuasion_sequence}\n`);
  l.push('---\n');

  // Seller archetypes
  l.push(h(2, 'Seller Archetype Stack') + '\n');
  l.push(`*${B.seller_archetypes.weight}*\n`);
  l.push(`**Problem frame:** ${B.seller_archetypes.problem_frame}\n`);
  l.push(h(3, 'The Four Moves'));
  B.seller_archetypes.four_moves.forEach(m => {
    l.push(`**${m.name}** · *${m.archetype}* — ${m.move}`);
    if (m.examples) m.examples.forEach(ex => l.push(`  > "${ex}"`));
    l.push('');
  });
  l.push(`**Persuasion sequence:** ${B.seller_archetypes.persuasion_sequence}\n`);
  l.push('---\n');

  // North Star
  l.push(h(2, 'North Star — The Unifying Moment'));
  l.push(`> ${B.north_star.unifying_moment}\n`);
  l.push(`*Archetype:* ${B.north_star.archetype}\n`);
  l.push(B.north_star.note + '\n');
  l.push('---\n');

  // Both-Sides Negotiation
  if (B.both_sides_negotiation) {
    const bs = B.both_sides_negotiation;
    l.push(h(2, 'Both-Sides Negotiation — Category Pillar'));
    l.push(`> ${bs.thesis}\n`);
    l.push(`**Frame as:** ${bs.frame_as}`);
    l.push(`**Never frame as:** ${bs.never_frame_as}\n`);
    l.push(`${bs.rationale}\n`);
    l.push(h(3, 'Do say'));
    bs.do_say.forEach(s => l.push(`- ${s}`));
    l.push('');
    l.push(h(3, 'Avoid saying'));
    bs.avoid_saying.forEach(s => l.push(`- ${s}`));
    l.push('');
    l.push(h(3, 'Archetype mapping'));
    Object.entries(bs.archetype_mapping).forEach(([k, v]) => {
      l.push(`- **${k.charAt(0).toUpperCase() + k.slice(1)}:** ${v}`);
    });
    l.push('');
    l.push(h(3, 'Proof formats'));
    bs.proof_formats.forEach(p => l.push(`- ${p}`));
    l.push('');
    l.push(`**Category ownership:** ${bs.category_ownership}\n`);
    l.push(h(3, 'Guardrails'));
    bs.guardrails.forEach(g => l.push(`- ${g}`));
    l.push('\n---\n');
  }

  l.push(h(2, 'Brand Voice') + '\n');
  l.push(h(3, `Persona: ${B.voice.persona}`));
  l.push(B.voice.description + '\n');
  l.push('**Use:** ' + B.voice.use.join(', ') + '\n');
  l.push('**Avoid:** ' + B.voice.avoid.join(', ') + '\n');
  l.push(`**AI Personification:** "${B.voice.ai_personification}"\n`);
  l.push('---\n');

  l.push(h(2, 'Visual Identity') + '\n');
  l.push(h(3, 'Color Palette'));
  l.push('| Name | Hex | Role | Usage |\n|---|---|---|---|');
  B.visual_identity.colors.forEach(c => l.push(`| ${c.name} | \`${c.hex}\` | ${c.role} | ${c.usage} |`));
  l.push(`\n**The Pie Rule:** ${B.visual_identity.pie_rule}\n`);
  l.push(h(3, 'Typography'));
  l.push(`**Primary:** ${B.visual_identity.typography.primary.family} — ${B.visual_identity.typography.primary.usage}`);
  l.push(`**Secondary:** ${B.visual_identity.typography.secondary.family} — ${B.visual_identity.typography.secondary.usage}\n`);
  l.push('**Rules:**');
  B.visual_identity.typography.rules.forEach(r => l.push(`- ${r}`));
  l.push('\n---\n');

  l.push(h(2, 'Image Generation Guidance') + '\n');
  l.push('**Do:**');
  B.image_generation_guidance.subject_matter.do.forEach(d => l.push(`- ${d}`));
  l.push('\n**Avoid:**');
  B.image_generation_guidance.subject_matter.avoid.forEach(a => l.push(`- ${a}`));
  l.push('\n**Composition:** ' + B.image_generation_guidance.composition.principles.join('; '));
  l.push('\n**Color Application:** ' + B.image_generation_guidance.color_application);
  l.push('\n---\n');

  l.push(h(2, 'Guardrails') + '\n');
  l.push('**Must:**');
  B.guardrails.must_haves.forEach(m => l.push(`- ${m}`));
  l.push('\n**Must Not:**');
  B.guardrails.must_nots.forEach(m => l.push(`- ${m}`));
  l.push('\n---\n');

  l.push(h(2, 'Taglines'));
  B.taglines.forEach(t => l.push(`- "${t}"`));

  return l.join('\n');
}

function toPromptPack(assetManifest) {
  const B = BRAND;
  const l = [];

  l.push('=== KEY LIME BRAND CONTEXT (v' + B.version + ') ===');
  l.push('');
  l.push('IDENTITY: "' + B.philosophy.identity_contract + '"');
  l.push('MISSION: ' + B.philosophy.mission);
  l.push('TAGLINES: ' + B.taglines.join(' | '));
  l.push('');
  l.push('VALUES: ' + B.values.map(v => v.name + ' (' + v.description.split('.')[0] + ')').join('; '));
  l.push('');
  l.push('BRAND ARCHETYPE STACK (running simultaneously):');
  l.push('- Outlaw [Primary · Positioning]: "' + B.archetypes.primary.essence + '"');
  l.push('- Magician [Secondary · Product]: "' + B.archetypes.secondary.essence + '"');
  l.push('- Everyperson [Tertiary · Tone]: "' + B.archetypes.tertiary.essence + '"');
  l.push('COMBINATION: ' + B.archetypes.combination);
  l.push('');
  l.push('BUYER STACK (' + B.buyer_archetypes.weight + '): ' + B.buyer_archetypes.four_moves.map(m => m.name + ' [' + m.archetype + ']').join(' → '));
  l.push('BUYER SEQUENCE: ' + B.buyer_archetypes.persuasion_sequence);
  l.push('SELLER STACK (' + B.seller_archetypes.weight + '): ' + B.seller_archetypes.four_moves.map(m => m.name + ' [' + m.archetype + ']').join(' → '));
  l.push('SELLER SEQUENCE: ' + B.seller_archetypes.persuasion_sequence);
  l.push('NORTH STAR: ' + B.north_star.unifying_moment);
  l.push('');

  if (B.both_sides_negotiation) {
    const bs = B.both_sides_negotiation;
    l.push('BOTH-SIDES NEGOTIATION (category pillar):');
    l.push('THESIS: ' + bs.thesis);
    l.push('FRAME AS: ' + bs.frame_as + ' — not "' + bs.never_frame_as + '"');
    l.push('DO SAY: ' + bs.do_say.slice(0, 3).map(s => '"' + s + '"').join(' | '));
    l.push('NEVER SAY: ' + bs.avoid_saying.join(', '));
    l.push('GUARDRAILS: ' + bs.guardrails.slice(0, 3).join(' | '));
    l.push('');
  }
  l.push('VOICE: ' + B.voice.persona + ' — ' + B.voice.description.split('.').slice(0, 2).join('.') + '.');
  l.push('AI = "' + B.voice.ai_personification + '"');
  l.push('USE: ' + B.voice.use.join(', '));
  l.push('AVOID: ' + B.voice.avoid.join(', '));
  l.push('');
  l.push('COLORS:');
  B.visual_identity.colors.forEach(c => l.push('- ' + c.name + ' ' + c.hex + ': ' + c.usage));
  l.push('PIE RULE: ' + B.visual_identity.pie_rule);
  l.push('');
  l.push('TYPOGRAPHY: ' + B.visual_identity.typography.primary.family + ' (headlines) + ' + B.visual_identity.typography.secondary.family + ' (body)');
  l.push('');
  l.push('IMAGE DO: ' + B.image_generation_guidance.subject_matter.do.join('; '));
  l.push('IMAGE AVOID: ' + B.image_generation_guidance.subject_matter.avoid.join('; '));
  l.push('IMAGE COLOR: ' + B.image_generation_guidance.color_application);
  l.push('');
  l.push('GUARDRAILS MUST: ' + B.guardrails.must_haves.join('; '));
  l.push('GUARDRAILS MUST NOT: ' + B.guardrails.must_nots.join('; '));

  if (assetManifest && assetManifest.assets && assetManifest.assets.length > 0) {
    l.push('');
    l.push('REFERENCE ASSETS (' + assetManifest.assets.length + '):');
    assetManifest.assets.slice(0, 10).forEach(a => {
      l.push('- [' + a.category + '] ' + a.title + ': ' + (a.caption || 'No caption'));
    });
  }

  l.push('');
  l.push('=== END BRAND CONTEXT ===');
  return l.join('\n');
}

module.exports = { toJSON, toMarkdown, toPromptPack };
