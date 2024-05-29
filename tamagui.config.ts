import { createTamagui } from '@tamagui/core'

const config = createTamagui({
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
  }
})

type AppConfig = typeof config

declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config
