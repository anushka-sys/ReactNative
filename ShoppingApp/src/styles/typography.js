// ─── Typography Design Tokens ─────────────────────────────────────────────────
// Font-weight constants and ready-made text-style presets.
// Import { typography } and spread into your StyleSheet for consistent type.

export const fontWeights = {
  regular:   '400',
  medium:    '500',
  semiBold:  '600',
  bold:      '700',
};

// Prebuilt text style objects – spread these into StyleSheet entries.
// They intentionally omit color so screens can override freely.
import { fontSizes } from './fontSizes';

export const typography = {
  screenTitle: {
    fontSize:   fontSizes.screenTitle,
    fontWeight: fontWeights.bold,
  },
  sectionTitle: {
    fontSize:   fontSizes.sectionTitle,
    fontWeight: fontWeights.bold,
  },
  cardTitle: {
    fontSize:   fontSizes['2xl'],
    fontWeight: fontWeights.bold,
  },
  cardSubtitle: {
    fontSize:   fontSizes.cardSubtitle,
  },
  cardMeta: {
    fontSize:   fontSizes.cardMeta,
  },
  buttonLabel: {
    fontSize:   fontSizes.buttonPrimary,
    fontWeight: fontWeights.semiBold,
  },
  buttonLabelLarge: {
    fontSize:   fontSizes.buttonLarge,
    fontWeight: fontWeights.semiBold,
  },
  inputText: {
    fontSize:   fontSizes.inputText,
  },
  label: {
    fontSize:   fontSizes.label,
    fontWeight: fontWeights.medium,
  },
  caption: {
    fontSize:   fontSizes.caption,
  },
};
