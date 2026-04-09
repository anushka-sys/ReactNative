// ─── Font-Size Design Tokens ─────────────────────────────────────────────────
// T-shirt scale (xs → xxl) + semantic aliases.
// Use semantic names in components where the intent is clear.

export const fontSizes = {
  // ── Scale ──────────────────────────────────────────────────────────────────
  xs:   10,   // product rating
  sm:   11,   // small inputs, fine-print
  base: 12,   // body text, captions
  md:   13,   // search input, product desc
  lg:   14,   // subtitles, ratings, button labels (secondary)
  xl:   15,   // coupon text, button labels (primary)
  '2xl': 16,  // card titles, payment section
  '3xl': 18,  // section headers, get-started button
  '4xl': 20,  // product detail title, back text
  '5xl': 34,  // screen hero titles (Welcome Back, Create Account, etc.)
  '6xl': 36,  // largest heading (reserved)

  // ── Semantic Aliases ───────────────────────────────────────────────────────
  screenTitle:   34,   // login / signup / forgot-password hero
  sectionTitle:  18,   // "All Featured"
  cardTitle:     16,   // product card title
  cardSubtitle:  11,   // product card description
  cardMeta:      10,   // product card rating
  inputText:     11,   // text inside TextInput fields
  buttonPrimary: 15,   // main CTA button label
  buttonLarge:   18,   // get-started button label
  label:         12,   // secondary text / OR separators
  caption:       12,   // fine print
};
