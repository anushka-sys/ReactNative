// ─── Color Design Tokens ──────────────────────────────────────────────────────
// Semantic color palette for the entire app.
// Never use raw hex values in screens/components – import from here.

export const colors = {
  // ── Brand / Primary ──────────────────────────────────────────────────────────
  primary: '#F83758',          // main CTA, buttons, links, active accents
  primaryBorder: '#F83758',    // border that matches primary (e.g. button border)

  // ── Backgrounds ──────────────────────────────────────────────────────────────
  backgroundPrimary: '#FFFFFF',    // default screen / card background
  backgroundSecondary: '#F2F2F2', // page/screen bg, list separators
  backgroundInput: '#e4e4e4',     // text-input field fill
  backgroundMuted: '#F3F3F3',     // subtle surface (unused input variant)

  // ── Text ─────────────────────────────────────────────────────────────────────
  textPrimary: '#000000',     // headings, body, prices
  textSecondary: '#575757',   // sub-labels, "OR continue" text
  textMuted: '#777777',       // captions, cart subtitles
  textPlaceholder: '#626262', // TextInput placeholder
  textDisabled: '#BBBBBB',    // search bar placeholder / icons
  textLight: '#828282',       // rating text
  textOnPrimary: '#FFFFFF',   // text/icons placed on primary-colored surfaces

  // ── Semantic / Feedback ───────────────────────────────────────────────────────
  success: '#3F92FF',          // add-to-cart button
  danger: '#FF0000',           // delete icon
  free: '#F83758',             // "Free" delivery label (reuses primary)

  // ── UI Chrome ─────────────────────────────────────────────────────────────────
  border: '#A8A8A9',           // input borders
  borderLight: '#dddddd',      // qty-selector border
  borderMuted: '#eeeeee',      // divider / chip border
  divider: '#eeeeee',          // horizontal rule
  shadow: '#000000',           // shadow color (use with opacity)
  iconMuted: '#323232',        // back-arrow icon color

  // ── Tab Bar ────────────────────────────────────────────────────────────────
  tabActive: '#F83758',
  tabInactive: '#000000',
};
