// ─── Shadow / Elevation Design Tokens ────────────────────────────────────────
// Android uses `elevation`; iOS uses the shadow* props.
// Export ready-made shadow style objects to spread into StyleSheet entries.

import { colors } from './colors';

export const shadows = {
  // ── Android Elevation Levels ──────────────────────────────────────────────
  elevation: {
    none: 0,
    sm:   2,   // product cards
    md:   3,   // search bar
    lg:   5,
  },

  // ── Cross-platform Shadow Presets ─────────────────────────────────────────
  // Spread these into your StyleSheet entry alongside `elevation`.

  card: {
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  searchBar: {
    elevation: 3,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
};
