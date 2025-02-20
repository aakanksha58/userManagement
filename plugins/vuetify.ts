import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css' // ✅ Import MDI icons
import { aliases, mdi } from 'vuetify/iconsets/mdi' // ✅ Use MDI icon set

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: 'mdi', // ✅ Set MDI as default
      aliases,
      sets: { mdi },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
