import Aura from '@primevue/themes/aura';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    '@primevue/nuxt-module',
    '@tresjs/nuxt'
  ],
  primevue: {
    usePrimeVue: true,
    /* Configuration */
    // components: {
    //   include: ['Button', 'RadioButton']
    // }
    options: {
      unstyled: true
    }
  },
  ssr: false,
  tres: {
    devtools: true,
    //glsl: true,
  },
})