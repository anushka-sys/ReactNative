// ─── Spacing Design Tokens ───────────────────────────────────────────────────
// Base-4 scale covers the vast majority of padding/margin/gap values found
// in this codebase.  Semantic aliases capture domain-specific intents.

export const spacing = {
  // ── Base Scale ───────────────────────────────────────────────────────────────
  none:  0,
  xxs:   2,
  xs:    4,
  sm:    5,
  md:    8,
  lg:   10,
  xl:   12,
  '2xl': 14,
  '3xl': 15,
  '4xl': 16,
  '5xl': 20,
  '6xl': 25,
  '7xl': 30,

  // ── Semantic Aliases ──────────────────────────────────────────────────────────
  screenPadding:      10,  // outer padding of screen containers
  screenPaddingTop:   17,  // extra top padding on home screen
  sectionPaddingH:    20,  // horizontal padding for section headers
  cardPadding:        14,  // internal padding of product cards
  cardPaddingTop:     10,  // top padding for product card image area
  cardPaddingInfo:    10,  // padding inside product info area
  cardMargin:          5,  // outer margin between cards
  cardSpacing:        14,  // vertical gap between cart cards
  inputPaddingH:      10,  // horizontal padding inside TextInput containers
  inputMarginLeft:    25,  // left margin for auth screen inputs
  inputMarginBottom:  20,  // gap between stacked input fields
  buttonPaddingV:      8,  // vertical padding inside button text
  buttonPaddingLeft: 120,  // text alignment inside fixed-width buttons
  iconMarginRight:    20,  // gap between leading icon and input
  iconPadding:        10,  // padding around delete icon in cart
  authTitleLeft:      32,  // left offset of hero titles on auth screens
  authTitleTop:       63,  // top offset of hero titles on auth screens
  paymentPadding:     16,  // padding inside payment summary card
  couponPaddingLeft:  20,  // left padding inside coupon row
  couponGap:          15,  // gap between coupon icon, label, link
  qtyBtnPaddingH:      8,  // horizontal padding around +/- buttons
  qtyBtnPaddingV:      2,  // vertical padding on qty selector
  tabBarPaddingBottom: 5,  // bottom padding of tab bar
};
