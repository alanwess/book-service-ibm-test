import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: 'ibmTheme',
    themes: {
      ibmTheme: {
        dark: false,
        colors: {
          primary: '#054ADA',
          secondary: '#E5EFFF',
          surface: '#FFFFFF',
        },
      },
    },
  },
})