/**
 * EXPOZIA Perfect Premium Dark Color System
 * Balanced slate intelligence platform palette
 */

export const COLORS = {
  // Backgrounds - Sophisticated Slate
  bg: {
    primary: '#0A0E14',      // Deep slate
    secondary: '#0F1419',    // Secondary depth
    tertiary: '#12171F',     // Tertiary layer
  },
  
  // Surfaces (Cards) - Blue-Gray Tones
  surface: {
    primary: '#151B23',      // Elevated card
    secondary: '#1E252E',    // Nested surface
    elevated: '#252D38',     // Hover/elevated
  },
  
  // Accents - Electric Blue System
  accent: {
    primary: '#00D9FF',      // Electric cyan
    secondary: '#0EA5E9',    // Sky blue
    tertiary: '#3B82F6',     // Deep blue
    emerald: '#10B981',      // Emerald green
  },
  
  // Text - Pure White High Contrast
  text: {
    primary: '#FFFFFF',                    // Pure white
    secondary: 'rgba(255, 255, 255, 0.70)', // 70% white
    tertiary: 'rgba(255, 255, 255, 0.50)',  // 50% white
  },
  
  // Status
  status: {
    alert: '#F87171',        // Coral red
    success: '#10B981',      // Emerald green
    warning: '#FBBF24',      // Amber
  },
  
  // Borders
  border: {
    primary: 'rgba(0, 217, 255, 0.15)',
    secondary: 'rgba(255, 255, 255, 0.10)',
    subtle: 'rgba(255, 255, 255, 0.08)',
  },
  
  // Effects
  glow: {
    cyan: '0 0 24px rgba(0, 217, 255, 0.3)',
    emerald: '0 0 24px rgba(16, 185, 129, 0.3)',
    strong: '0 0 32px rgba(0, 217, 255, 0.5)',
  },
  
  shadow: {
    card: '0 8px 32px rgba(0, 0, 0, 0.6)',
    elevated: '0 16px 48px rgba(0, 0, 0, 0.7)',
  },
} as const;

// Gradient backgrounds
export const GRADIENTS = {
  radialGlow: 'radial-gradient(circle at 50% 30%, rgba(0, 217, 255, 0.06) 0%, transparent 60%)',
  cardHighlight: 'linear-gradient(90deg, transparent, rgba(0, 217, 255, 0.25), transparent)',
  shimmer: 'linear-gradient(90deg, transparent, rgba(0, 217, 255, 0.15), transparent)',
} as const;