import { extendTheme } from '@chakra-ui/react'

// Paleta tomada del club: césped, panel de cartelería y león del escudo.
const colors = {
  brand: {
    grass: '#1E7A3C',
    grassLight: '#2E9A4E',
    deep: '#0F3D22',
    night: '#08211A',
    chalk: '#F4F6F1',
    gold: '#E3C24C',
    goldDark: '#B99A2C',
    ink: '#1A1D1B',
    mist: 'rgba(244,246,241,0.72)',
  },
}

const fonts = {
  heading: "'Barlow Condensed', 'Arial Narrow', sans-serif",
  body: "'Barlow', system-ui, sans-serif",
}

const styles = {
  global: {
    'html, body': {
      bg: 'brand.chalk',
      color: 'brand.ink',
      scrollBehavior: 'smooth',
    },
    '::selection': { bg: 'brand.gold', color: 'brand.ink' },
    '@media (prefers-reduced-motion: reduce)': {
      '*': { animationDuration: '0.01ms !important', transitionDuration: '0.01ms !important' },
    },
  },
}

const components = {
  Button: {
    baseStyle: {
      fontFamily: 'heading',
      fontWeight: 600,
      letterSpacing: '0.02em',
      borderRadius: '2px',
    },
    variants: {
      gold: {
        bg: 'brand.gold',
        color: 'brand.ink',
        _hover: { bg: 'brand.goldDark', _disabled: { bg: 'brand.gold' } },
        _active: { bg: 'brand.goldDark' },
        _focusVisible: { boxShadow: '0 0 0 3px rgba(227,194,76,0.55)' },
      },
      chalk: {
        bg: 'brand.chalk',
        color: 'brand.deep',
        _hover: { bg: 'white' },
        _focusVisible: { boxShadow: '0 0 0 3px rgba(227,194,76,0.55)' },
      },
      outlineChalk: {
        border: '1px solid',
        borderColor: 'brand.mist',
        color: 'brand.chalk',
        bg: 'transparent',
        _hover: { bg: 'rgba(244,246,241,0.08)' },
        _focusVisible: { boxShadow: '0 0 0 3px rgba(227,194,76,0.55)' },
      },
      outlineDeep: {
        border: '1px solid',
        borderColor: 'brand.deep',
        color: 'brand.deep',
        bg: 'transparent',
        _hover: { bg: 'brand.deep', color: 'brand.chalk' },
        _focusVisible: { boxShadow: '0 0 0 3px rgba(227,194,76,0.55)' },
      },
    },
  },
  Heading: {
    baseStyle: { fontWeight: 600, lineHeight: 0.95, letterSpacing: '-0.01em' },
  },
}

export default extendTheme({ colors, fonts, styles, components })
