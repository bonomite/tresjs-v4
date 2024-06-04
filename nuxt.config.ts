// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@tresjs/nuxt"],
  ssr: false,
  tres: {
    devtools: true,
    //glsl: true,
  },
})