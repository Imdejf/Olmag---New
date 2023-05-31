import { GlobalSettings } from "./environmentsettings"

// https://nuxt.com/docs/api/configuration/nuxt-config
const appEnv = process.env.ENV || 'development'

export default defineNuxtConfig({
  ssr:true,
  nitro: {
      prerender: {
          crawlLinks:true
      }
  },

  css: [
    '@/assets/css/main.css',
  ],

  // build
  build: {
    transpile: ['@vee-validate/rules'],
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },


  app: {
    head: {
      title: "Wyposażenie magazynów - Olmag.pl",
      meta: [
        {
          name: "description",
          content: "Olmag.pl to sklep oferujący wyposażenie magazynowe od najlepszych producentów - 📦 pojemniki magazynowe, 📦 drabiny aluminiowe, 📦 regały magazynowe oraz inne."
        }
      ],
      link: [
        {
          rel: "preconnect",
          href: "https://www.googletagmanager.com"
        }
      ]
    }
  },

  runtimeConfig: {
    public: {
      siteEnvironment: GlobalSettings[appEnv].siteEnvironment,
      baseURL: GlobalSettings[appEnv].baseURL,
      apiBaseURL: GlobalSettings[appEnv].apiBaseURL,
      gtm_id: GlobalSettings[appEnv].googleTagManagerKey,
      gtm_enabled: GlobalSettings[appEnv].googleTagManagerEnabled,
      gtm_debug: GlobalSettings[appEnv].googleTagManagerDebug,
      storeId: GlobalSettings[appEnv].storeId,
      languageId: GlobalSettings[appEnv].languageId,
    }
  },

  modules: [
    '@pinia/nuxt',
    'nuxt-swiper',
    ['nuxt-gtag', {
      id: GlobalSettings[appEnv].google_analytics_id,
      initialConsent: true,
    }],
    ['@nuxtjs/robots', { configPath: "~/config/robots.config" }]
  ],
    
  //swiper options
  swiper: {
    styleLang: 'css',
    modules: ['navigation', 'pagination', 'free-mode', 'thumbs', 'mousewheel'],
  }
})
