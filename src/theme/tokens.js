/**
 * Design tokens — single source of truth for the Xuman design system.
 *
 * Plain CommonJS so both tailwind.config.js (Node) and app code (Metro)
 * can consume the same values. Dark-mode-first palette.
 */

const colors = {
  background: {
    DEFAULT: '#09090B',
    subtle: '#111113',
    elevated: '#18181B',
  },
  foreground: {
    DEFAULT: '#FAFAFA',
    secondary: '#A1A1AA',
    muted: '#71717A',
    inverse: '#09090B',
  },
  border: {
    DEFAULT: '#26262A',
    strong: '#3F3F46',
  },
  accent: {
    DEFAULT: '#7C5CFC',
    pressed: '#6A4BE8',
    soft: 'rgba(124, 92, 252, 0.16)',
  },
  success: '#34D399',
  warning: '#FBBF24',
  danger: '#F87171',
  overlay: 'rgba(0, 0, 0, 0.6)',
};

const spacing = {
  '2xs': '2px',
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
  '3xl': '48px',
};

const borderRadius = {
  xs: '6px',
  sm: '10px',
  md: '14px',
  lg: '18px',
  xl: '24px',
  full: '9999px',
};

const fontSize = {
  display: ['32px', { lineHeight: '38px', fontWeight: '700' }],
  title: ['24px', { lineHeight: '30px', fontWeight: '600' }],
  heading: ['18px', { lineHeight: '24px', fontWeight: '600' }],
  body: ['15px', { lineHeight: '22px', fontWeight: '400' }],
  caption: ['13px', { lineHeight: '18px', fontWeight: '400' }],
  small: ['11px', { lineHeight: '14px', fontWeight: '500' }],
};

const boxShadow = {
  card: '0px 4px 16px rgba(0, 0, 0, 0.35)',
  sheet: '0px -8px 32px rgba(0, 0, 0, 0.5)',
};

module.exports = { colors, spacing, borderRadius, fontSize, boxShadow };
