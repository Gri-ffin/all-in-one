import { createFont, createTamagui } from '@tamagui/core'
import { config as defaultConfig } from '@tamagui/config'

const customFont = createFont({
  family: 'Ubuntu',
  size: {
    1: 36,
    2: 28,
    3: 24,
    4: 18,
    5: 16,
    6: 12
  }
})

const config = createTamagui({
  ...defaultConfig,
  themes: {
    primary: {
      main: '#A2B2FC',
      white: '#FFFFFF',
      black: '#424242'
    },
    secondary: {
      // should be called gradient from A2B2FC to FFF1BE
      gradient: 'linear-gradient(90deg, #A2B2FC 0%, #FFF1BE 100%)',
      gray: '#9D9D9D'
    }
  },
  fonts: {
    heading: customFont,
    body: customFont
  }
})

type AppConfig = typeof config

declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config
