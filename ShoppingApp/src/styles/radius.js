// ─── Border-Radius Design Tokens ─────────────────────────────────────────────

export const radius = {
  none:   0,
  xs:     4,   // buttons, small inputs
  sm:     5,   // input containers, auth buttons
  md:     6,   // qty selector
  lg:     8,   // cart product image
  xl:    10,   // add-to-cart button
  '2xl': 12,   // product cards in list

  // ── Semantic Aliases ─────────────────────────────────────────────────────────
  button:     4,   // primary CTA buttons
  input:      5,   // text input containers
  card:      12,   // product listing cards
  image:      8,   // rounded product images in cart
  chip:       8,   // filter/sort chips
  qtySelector: 6,  // quantity selector box
  cartButton: 5,   // proceed to payment button
  addToCart:  10,  // add-to-cart button on product detail
};
