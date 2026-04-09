// ─── styles/index.js ─────────────────────────────────────────────────────────
// Central barrel – import everything from here.
//
//   import { colors, spacing, fontSizes, fontWeights, typography,
//            radius, shadows, layout } from '../styles';

export * from './colors';
export * from './fontSizes';
export * from './spacing';
export * from './typography';
export * from './radius';
export * from './shadows';
export * from './layout';

// ── Legacy name aliases (keeps old imports working during migration) ───────────
export { fontSizes as fontsizes } from './fontSizes';
export { colors as Color } from './colors';
