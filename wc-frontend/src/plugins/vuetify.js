import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createVuetify } from 'vuetify'

const myCustomTheme = {
    dark: false,
    colors: {
      background: '#FFFFFF', // #eeeff2
      surface: '#FFFFFF',
      primary: '#6C63FF', // 
      'primary-darken-1': '#3700B3', // sidebar - #101827
      secondary: '#03DAC6', // zelena - #12B981
      'secondary-darken-1': '#018786', // siva - #9CA3AF
      error: '#B00020',
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FB8C00',
    },
  }
  
  export default createVuetify({
    theme: {
      defaultTheme: 'myCustomTheme',
      themes: {
        myCustomTheme,
      },
    },
    components,
    directives,
  })