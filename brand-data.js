/**
 * brand-data.js — Single Source of Truth for Key Lime Brand Spec
 *
 * Every endpoint (/brand.json, /brand.md, /brand/prompt-pack) derives from this.
 * Update this file to update ALL representations.
 */

const BRAND = {
  brand: "Key Lime",
  version: "1.0",
  updated: "2026-04-16",

  philosophy: {
    identity_contract:
      "I see through unnecessary complexity. I don't pay for things that don't deliver value. I take control of the biggest decisions in my life. And I expect the process to be easy.",
    mission:
      "Key Lime makes buying and selling a home as easy as it should have always been — without agents, without unnecessary fees, and without the complexity the industry built to justify itself.",
    vision:
      "Key Lime will make real estate agencies obsolete. Not by attacking them, but by building something so obviously better that the old way stops making sense.",
    core_belief:
      "A brand is a bridge between a product and the person it's built for. Every decision — name, color, tone, persona, messaging — serves one purpose: making the bridge between Key Lime and the person it's built for as short, clear, and inevitable as possible.",
    trajectory: [
      { phase: "MVP (Now)", market: "FSBO buyers and sellers who already question the agent model", posture: "The platform for people who see a better way" },
      { phase: "Growth", market: "All first-time and repeat buyers/sellers in target markets", posture: "The modern way to buy and sell a home" },
      { phase: "Scale", market: "National — every real estate transaction", posture: "Home, made simple" },
    ],
  },

  values: [
    {
      name: "Simplicity",
      description: "Key Lime takes something needlessly complicated and makes it easy. Not dumbed-down — clarified.",
      test: "Every feature, every screen, every interaction should feel like: 'Why wasn't it always this way?'",
    },
    {
      name: "Empowerment",
      description: "Key Lime doesn't do things for you — it equips you to do them yourself, with confidence. The user is never a passenger.",
      test: "The user should feel more capable after using Key Lime, not dependent on it. The feeling at closing is: 'I did this.'",
    },
    {
      name: "Transparency",
      description: "No hidden fees, no opaque negotiations, no fine print designed to confuse. Key Lime shows the math.",
      test: "If it can't be explained in one sentence, it needs to be redesigned.",
    },
    {
      name: "Fairness",
      description: "1%, not 6%. The value proposition is structural. Key Lime charges for what it delivers and nothing more.",
      test: "Never position savings as a 'discount' — position it as what the service actually costs when you remove the middleman markup.",
    },
    {
      name: "Intelligence",
      description: "Key Lime's technology is smarter than any individual agent. It processes more data, negotiates without emotional bias, and is available 24/7. But it's never cold.",
      test: "AI is personified, not labeled. The user talks to 'your advisor,' not 'our AI.' The technology feels human, warm, and on your side.",
    },
  ],

  archetypes: {
    // Brand-wide stack — three archetypes running simultaneously. The combination is the signature.
    // Any one alone would fail. Operational shorthand: "Confident inevitability."
    primary: {
      name: "Outlaw",
      role: "Positioning",
      essence: "The rules are broken. Here's what's actually possible.",
      core_desire: "Disrupt what isn't working",
      core_fear: "Being powerless, being exploited by the system",
      shadow_to_avoid: "Cynicism, anger, anti-establishment for its own sake",
      application: [
        "Expose what the system is hiding — curious tone, not combative",
        "The enemy is the broken commission system, not agents as individuals",
        "'Confident inevitability' over attack messaging",
        "Campaign moments: NAR-settlement content, hidden-cost reveals, comparison pages",
      ],
      reference_brands: ["Tesla (early)", "Uber (early)", "Robinhood", "Liquid Death"],
    },
    secondary: {
      name: "Magician",
      role: "Product",
      essence: "What seemed impossible is now effortless.",
      core_desire: "Make dreams reality, understand how things work",
      core_fear: "Unintended consequences, shallow trickery",
      shadow_to_avoid: "Manipulation, 'too good to be true' distrust",
      application: [
        "Transformation through demonstration — the Apple Keynote move",
        "Show the comp analysis, negotiation rationale, document logic — never 'trust me'",
        "Product demos, savings calculator, case studies with named outcomes",
        "Magician ≠ mystical — it's competence made visible",
      ],
      reference_brands: ["Apple", "Tesla (current)", "Stripe", "Airbnb"],
    },
    tertiary: {
      name: "Everyperson",
      role: "Tone",
      essence: "Normal people are already doing this. You belong.",
      core_desire: "Belonging, accessibility, not being excluded",
      core_fear: "Being out of their depth, joining a cult of disruptors",
      shadow_to_avoid: "Blandness, loss of distinctiveness",
      application: [
        "Peer proof — real customers, documentary-style, not heroes",
        "Neutralizes 'am I smart enough to do this alone?' objection",
        "Testimonial format: specific person, specific Tampa neighborhood, specific savings number",
        "Warm, never cold; approachable, never flat",
      ],
      reference_brands: ["Lemonade (warmth)", "Early Airbnb (accessibility)"],
    },
    combination:
      "Outlaw positioning (the system is broken), delivered with Magician composure (here's the tool that makes it irrelevant), in an Everyperson tone (anyone can use it). Operational shorthand: 'Confident inevitability.'",
  },

  // Audience-specific archetype stacks. Buyer and seller psychology diverge.
  // Buyers carry 80% of brand weight; sellers carry 20% but need more reassurance stages.
  buyer_archetypes: {
    weight: "80% of brand weight",
    problem_frame: "The Revelation Problem — buyers don't think they're choosing an agent; they think 'that's just how you buy a house.' The agent is invisible infrastructure. Make it visible and it becomes self-evidently overpriced.",
    four_moves: [
      { name: "Hidden Cost Reveal", archetype: "Outlaw", move: "Expose what the system is hiding. Curious, not angry." },
      { name: "Peer Proof",         archetype: "Everyperson", move: "Real customers, documentary-style. Not heroes — normal people in their situation." },
      { name: "Magician Demonstration", archetype: "Magician", move: "Show the impossible becoming easy. The demonstration IS the argument." },
      { name: "Identity Flip",      archetype: "Deep Layer", move: "From 'homebuyer who needs an agent' to 'capable adult who buys their own home.'" },
    ],
    persuasion_sequence: "Feel, then think, then act — Outlaw (feel) → Magician (think) → Everyperson (act). Every buyer-side piece hits all three beats in order.",
  },

  seller_archetypes: {
    weight: "20% of brand weight",
    problem_frame: "The Risk Problem — sellers aren't uninformed; they're scared to get it wrong. The agent (even a bad one) represents someone to blame. Key Lime must provide the same psychological safety without the agent.",
    four_moves: [
      {
        name: "Caregiver Stabilizer",
        archetype: "Caregiver",
        move: "The advisor is the psychological replacement for the agent — not in function, but in the feeling of being held.",
        examples: ["Your advisor is with you through every step.", "Never do this alone."],
      },
      {
        name: "Sovereign Elevation",
        archetype: "Sovereign",
        move: "Reframe: agents don't serve you, they work at you. Key Lime serves you, period.",
        examples: ["Your home. Your price. Your terms.", "This is your asset. You decide."],
      },
      {
        name: "Informed Frustration",
        archetype: "Mature Outlaw",
        move: "Not angry — knowing. Validate what they already suspected. Friend confirming their instinct, not activist recruiting.",
        examples: ["You already knew they weren't earning 3%. Now you don't have to pay it."],
      },
      {
        name: "Mechanism Reveal",
        archetype: "Concrete Magician",
        move: "Sellers need the math shown. Long-form case studies, detailed process videos, real numbers. Buyers convert on vibe; sellers need proof of mechanism.",
        examples: ["Here's exactly what happened when Sarah sold her house with Key Lime in 23 days."],
      },
    ],
    persuasion_sequence: "Validate, protect, prove, empower — Mature Outlaw → Caregiver → Concrete Magician → Sovereign. Sellers need all four stages.",
  },

  north_star: {
    unifying_moment: "Buyer and seller diverge in approach, converge on one feeling at closing: 'I did this.'",
    archetype: "Sovereign (at its healthy expression — owning the process, not delegating agency)",
    note: "Everything upstream (Outlaw revelation, Magician demonstration, Caregiver protection) serves this final moment.",
  },

  // ── Both-Sides Negotiation — category-defining product pillar ──
  // Key Lime runs an AI advisor on BOTH buyer and seller sides of a transaction.
  // This is a structural advantage no competitor has and the single biggest
  // category-ownership opportunity in the launch. But the framing determines
  // whether it reads as "category-defining fairness" or "dystopian machine
  // combat." This section is the canonical framing.
  both_sides_negotiation: {
    thesis:
      "Both buyer and seller get the same advisor. Both see the same logic. The deal reflects the actual market — not whose agent was tougher.",
    frame_as: "Fairness leveling",
    never_frame_as: "AI combat, AI vs AI, machines handling it",
    rationale:
      "The old market's hidden unfairness: outcomes hinge on whose agent is more aggressive. Experienced sellers win on price, naive buyers overpay. That's a system problem. Key Lime's AI-on-both-sides doesn't amplify negotiation — it removes negotiation-skill asymmetry as a variable. The deal reflects actual market conditions.",
    do_say: [
      "Both sides get the same advisor.",
      "Both of you have the data. Both of you have the math. The price is the price.",
      "For the first time, neither side gets fleeced by a better-negotiator agent.",
      "No more 'my agent vs your agent.' The deal is the deal.",
      "The negotiation reflects the market, not whose agent was louder.",
    ],
    avoid_saying: [
      "AI fights AI",
      "AI vs AI negotiation",
      "Let the machines handle it",
      "Our AI beats their agent",
      "AI-powered negotiation", // too tech-led, buries the outcome
      "Bot-to-bot",
      "Algorithmic negotiation",
    ],
    archetype_mapping: {
      outlaw: "Exposes the hidden unfairness — outcomes shouldn't hinge on whose agent is tougher.",
      magician: "Makes the impossible (a genuinely fair negotiation) effortless and visible to both parties.",
      sovereign: "You still own the decision. The advisor informs; you approve every move.",
    },
    proof_formats: [
      "Split-screen demo video — buyer's advisor left, seller's advisor right, offer→counter→close in real-time with visible logic on both sides",
      "Case-study storytelling with real numbers — 'Sarah's advisor opened at $449K. Mike's advisor countered at $437K citing 3 comps. Final: $443K. 6 days. Both sides saw the math.'",
      "Press angle — 'What happens when AI negotiates AI? A Tampa Bay startup is running the experiment' → Tampa Bay Business Journal, Inman, HousingWire",
      "Comparison page — old-world table: hidden agent negotiation + emotional overrides vs Key Lime table: visible comp-based logic on both sides",
    ],
    category_ownership:
      "Coin and own the term 'Both-sides negotiation.' No competitor has this configuration. It's the single biggest GEO/SEO play because the phrase has zero established meaning today.",
    guardrails: [
      "Never call it 'AI' in user-facing copy — it's 'your advisor' for the user, and 'the other side's advisor' for the counterparty.",
      "Never suggest the user loses control. The advisor proposes; the user approves every move.",
      "Never frame this as automation of the negotiation. Frame it as leveling the informational playing field.",
      "Avoid 'robot,' 'algorithm,' 'bot' language entirely.",
      "When the AI nature must be disclosed (legal/compliance), use the term 'AI-assisted' rather than 'AI-powered' or 'AI-driven.'",
    ],
  },

  voice: {
    persona: "Alex",
    description:
      "A 35-year-old Tampa Bay resident who has completed multiple real estate transactions personally. Works in tech or finance. Got tired of watching money leave at closings for unclear reasons. Not a salesperson — a knowledgeable friend who explains things clearly and pulls no punches.",
    traits: [
      "Speaks in complete, confident sentences — not bullet lists of jargon",
      "Says 'Here's what that actually costs you' and 'Let me show you the math'",
      "Never says 'It's complicated' or 'Trust the process' or 'Our team of experts...'",
    ],
    examples: [
      { context: "Blog post opening", text: "The 2024 NAR settlement changed one thing: sellers finally found out what they'd been paying for decades. Most weren't happy about it." },
      { context: "Savings calculator intro", text: "Type in your home value. We'll tell you exactly how much you're leaving on the table with a traditional agent." },
      { context: "FAQ answer", text: "Yes, everything we do is fully licensed under Florida real estate law. We're not a workaround — we're a better version of the process." },
      { context: "Email subject line", text: "You paid $23,000 at your last closing. We charge $4,300." },
    ],
    use: [
      "Book a showing",
      "1% closing fee",
      "Keep the difference",
      "Your advisor",
      "See the math",
      "Own your transaction",
      "Licensed professionals, AI precision",
      "Sell smarter, not cheaper",
    ],
    avoid: [
      "Cheap",
      "Discount",
      "Robot",
      "Algorithm",
      "Experimental",
      "Disrupting",
      "Easy (undermines perceived thoroughness)",
      "No agent needed (sounds isolated/risky)",
      "Cut out the middleman (too aggressive)",
      "FSBO (must not inherit FSBO's discount reputation)",
      "It's complicated",
      "Trust the process",
    ],
    ai_personification: "your advisor",
  },

  visual_identity: {
    colors: [
      {
        name: "Graham Crust",
        hex: "#3E2C1C",
        role: "primary_dark",
        usage: "Nav bar, dark text, headings. Warm grounding anchor.",
        mood_descriptors: ["warm", "grounded", "earthy", "confident"],
      },
      {
        name: "Crust Mid",
        hex: "#55402F",
        role: "secondary_dark",
        usage: "Table headers, hover states, depth layers.",
        mood_descriptors: ["depth", "warmth", "supporting"],
      },
      {
        name: "Cream",
        hex: "#FFF8ED",
        role: "background",
        usage: "Page backgrounds, breathing space. Warm white — never pure #FFF.",
        mood_descriptors: ["warm", "open", "inviting", "calm"],
      },
      {
        name: "White",
        hex: "#FFFFFF",
        role: "surface",
        usage: "Card surfaces, content containers. Contrast against cream background.",
        mood_descriptors: ["clean", "crisp", "readable"],
      },
      {
        name: "Key Lime",
        hex: "#A8C856",
        role: "accent",
        usage: "Accent buttons, CTAs, brand mark only. Hero color — use sparingly.",
        mood_descriptors: ["fresh", "alive", "distinctive", "punchy"],
      },
      {
        name: "Key Lime Dark",
        hex: "#8BAF3E",
        role: "accent_hover",
        usage: "Hover states, text-on-cream for green labels. Accessible contrast.",
        mood_descriptors: ["mature", "accessible", "active"],
      },
      {
        name: "Savings Gold",
        hex: "#E8A317",
        role: "semantic_savings",
        usage: "Dollar savings figures ONLY. Never decorative. Reserved for money.",
        mood_descriptors: ["achievement", "reward", "financial"],
      },
      {
        name: "Concierge Teal",
        hex: "#5BB5A2",
        role: "semantic_concierge",
        usage: "Concierge audience accent. Secondary to green in hierarchy.",
        mood_descriptors: ["trust", "service", "professionalism"],
      },
    ],
    pie_rule:
      "Graham Crust is the grounding base. Cream is the body. White is the surface. Key Lime Green is the filling — use where you want the eye to go. If the green is diluted across the page, it loses its punch.",
    typography: {
      primary: {
        family: "Manrope",
        classification: "Geometric humanist sans-serif",
        weights: [500, 600, 700, 800],
        usage: "Headlines, savings numbers, labels, CTAs. Anything that needs to punch.",
        why: "Simultaneously modern and warm — geometric structure signals precision and trust; humanist proportions signal approachability.",
      },
      secondary: {
        family: "DM Sans",
        classification: "Geometric sans-serif, humanist-leaning",
        weights: [400, 500],
        usage: "Body copy, quotes, descriptions, long-form content. Generous line-height, never dense.",
      },
      rules: [
        "Never use serif — this is not a heritage real estate brand",
        "Never use ultra-thin weights — this is a major financial transaction",
        "Manrope for headlines, savings numbers, labels. DM Sans for body copy, quotes, supporting text.",
        "Hierarchy rule: weight variation creates hierarchy, not font swapping",
      ],
    },
  },

  image_generation_guidance: {
    subject_matter: {
      do: [
        "Real Tampa Bay homeowners — diverse, authentic, genuine expressions",
        "Real savings numbers, not approximations",
        "Chaperones opening doors in warm light",
        "Hands with keys — the universal moment of homeownership",
        "Well-lit, styled-but-liveable home interiors",
        "Phone screens showing the Key Lime app in context",
        "Casual, real moments — unpacking boxes, exploring a new neighborhood",
      ],
      avoid: [
        "Stock photo families with watermarks or obviously staged scenes",
        "Corporate handshakes, suits, agent headshots",
        "'SOLD' signs (that's the old world)",
        "Mansions or ultra-luxury (aspirational but attainable)",
        "Empty, sterile homes with no personality",
        "Generic house exteriors without context",
        "Agents in suits or business attire",
      ],
    },
    composition: {
      principles: [
        "Generous negative space — let the subject breathe",
        "Warm natural light — golden hour, soft indoor light",
        "Single focal point per image",
        "Key Lime green as a single accent element, not a wash or filter",
      ],
      avoid: [
        "Cluttered frames with too many subjects",
        "Cold corporate or fluorescent lighting",
        "Blue-toned color grading",
        "Tight crops that feel claustrophobic",
      ],
    },
    color_application:
      "Images should feel grounded in Graham Crust and Cream tones. Use Key Lime green as accent only — a single green element in frame, not washes or filters. Gold reserved for savings/money contexts.",
    aesthetic_reference_brands: ["Tesla", "Lemonade", "Warby Parker", "Airbnb"],
  },

  guardrails: {
    must_haves: [
      "Never feel niche — brand must feel inevitable at scale",
      "Never feel budget — this is premium service at a fair price",
      "Always feel warm and human — never cold, robotic, or algorithmic",
      "Every touchpoint reinforces the identity contract",
      "The customer is the hero — Key Lime is the guide",
    ],
    must_nots: [
      "Never box into FSBO — Key Lime is explicitly NOT FSBO",
      "Never lead with technology — lead with the outcome",
      "Never attack agents as individuals — the system is the enemy",
      "Never use 'discount' or 'cheap' framing",
      "Never feel like a startup experiment — feel like the future arrived",
      "Never use serif fonts, thin weights, or cold blue palettes",
    ],
  },

  taglines: [
    "No agents. Just keys.",
    "No agents. Easy as pie.",
    "Forget the agent.",
  ],

  competitive_landscape: {
    positioning:
      "AI-powered full transaction with human chaperone for showings. 1% closing fee. First-mover on AI-negotiation + human chaperone hybrid.",
    competitors: [
      { name: "Traditional Agent", fee: "5.44% combined", weakness: "Fee opacity, misaligned incentives, limited AI" },
      { name: "Redfin", fee: "1.5% listing", weakness: "Still agent-dependent; buyer still needs their own agent" },
      { name: "Opendoor", fee: "5–8% service fee", weakness: "Lower net proceeds; not market-rate pricing" },
      { name: "Houzeo / Flat Fee MLS", fee: "$300–$1,000 flat", weakness: "No AI, no negotiation, pure DIY with price gap risk" },
      { name: "FSBO (no platform)", fee: "0% but sell for 29% less", weakness: "Catastrophic execution risk" },
    ],
    visual_differentiation:
      "Every major real estate brand is either corporate-blue, agent-red, or tech-cold. Nobody owns warm, fresh, green. Key Lime has an open visual lane.",
  },

  market_context: {
    geography: "Tampa Bay, FL",
    median_home_price: "$430,000",
    traditional_commission: "$23,400 (5.44%)",
    keylime_fee: "$4,300 (1%)",
    savings: "$19,100",
    key_stats: [
      { stat: "67% of sellers believe agents value profits over client interests", source: "Clever Real Estate 2024" },
      { stat: "94% of sellers support commission changes", source: "Clever Real Estate 2024" },
      { stat: "36.3% increase in Tampa Bay inventory (2025 vs. 2024)", source: "Selling Sunsets of Florida" },
      { stat: "43% of Gen Z use AI tools for homebuying research", source: "National MI NextGen Report" },
    ],
  },
};

module.exports = BRAND;
