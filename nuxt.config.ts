import Lara from '@primevue/themes/lara';
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
      //unstyled: true,
      theme: {
        preset: Lara,
        options: {
          darkModeSelector: 'light',
        }
      }
    },

  },

  css: [
    'primeflex/primeflex.css',
  ],
  ssr: false,
  tres: {
    devtools: true,
    //glsl: true,
  },
})