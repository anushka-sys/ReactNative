// ─── Layout Design Tokens ─────────────────────────────────────────────────────
// Reusable flex/alignment patterns and fixed dimension constants.

export const layout = {
  // ── Flex Helpers ──────────────────────────────────────────────────────────────
  row: {
    flexDirection: 'row',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fill: {
    flex: 1,
  },

  // ── Fixed Dimensions ──────────────────────────────────────────────────────────
  // Buttons
  primaryButtonWidth:   290,
  primaryButtonHeight:   40,
  largePrimaryButtonHeight: 50,
  cartCheckoutButtonWidth:  219,
  cartCheckoutButtonHeight:  48,
  addToCartButtonWidth:  130,
  addToCartButtonHeight:  35,

  // Inputs
  inputHeight:  45,
  inputWidth:  310,

  // Header / icons
  headerIconSize: 28,
  logoWidth:     110,
  logoHeight:     30,

  // Product images
  productCardImageHeight: 150,
  cartProductImageWidth:  123,
  cartProductImageHeight: 153,
  productDetailImageHeight: 180,

  // Category icons (home screen)
  categoryIconSize: 50,

  // Auth social icons
  socialIconSizeLarge: 55,
  socialIconSizeSmall: 45,

  // Coupon image
  couponImageWidth:  31,
  couponImageHeight: 20,

  // Tab bar
  tabBarHeight: 50,
};
