import { create } from 'twrnc';

//#0f756b and #15899B

export default create({
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ECFEFF',
          100: '#CCFBFE',
          200: '#99F0F7',
          300: '#66DCE8',
          400: '#39C2D3',
          500: '#1DA7BC',
          600: '#15899B',
          700: '#116E7E',
          800: '#0E5664',
          900: '#0B434E',
          950: '#072C34',
          DEFAULT: '#15899B',
        },
        accent: {
          50: '#FFF6EF',
          100: '#FFEAD9',
          200: '#FFD1B0',
          300: '#FFB180',
          400: '#FF945A',
          500: '#FF7A3F',
          600: '#F2662D',
          700: '#D45222',
          800: '#A43E1A',
          900: '#7A2E14',
          950: '#4E1E0D',
          DEFAULT: '#FF7A3F',
          foreground: '#FFFFFF',
        },
        primary: { DEFAULT: '#0F756B', foreground: '#FFFFFF' },
        success: { DEFAULT: '#16A34A' },
        warning: { DEFAULT: '#F59E0B' },
        error: { DEFAULT: '#DC2626' },
        muted: {
          50: '#F2F7F8',
          100: '#E6EFF0',
          200: '#D0E0E2',
          300: '#B4C8CB',
          400: '#8EA6AA',
          500: '#6B8589',
          600: '#546A6D',
          700: '#435457',
          800: '#2C383A',
          900: '#1B2426',
          DEFAULT: '#D0E0E2',
          foreground: '#1B2426',
        },
      },
    },
  },
});
