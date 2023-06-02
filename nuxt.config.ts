import { GlobalSettings } from "./environmentsettings"
import axios from "axios";
import { useApplication } from "./stores/application";

// https://nuxt.com/docs/api/configuration/nuxt-config
const appEnv = process.env.ENV || 'development'

export default defineNuxtConfig({
  ssr:true,
  nitro: {
      prerender: {
          crawlLinks:true
      }
  },

  hooks: {
    async 'nitro:config'(nitroConfig) {
        // if (nitroConfig.dev) {
        //     return
        // }
        const blogSlugs = await getBlogRoutes();
        const postSlugs = await getPostRoutes()
        nitroConfig.prerender.routes.push(...blogSlugs, ...postSlugs)
        return
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

const getBlogRoutes = async () => {
  const blogsList = await axios.get(GlobalSettings[appEnv].apiBaseURL + 'product/blogCategory/slugs', {
    params: {
      storeId: GlobalSettings[appEnv].storeId
    }
  })

  useApplication.blogs = blogsList

  // return the array of routes
  return blogsList.data.map((category) => `/blog/${category}`);
};

const getPostRoutes = async () => {
  const postList = await axios.get(GlobalSettings[appEnv].apiBaseURL + 'product/blogItem/slugs', {
    params: {
      storeId: GlobalSettings[appEnv].storeId
    }
  })
  // return the array of routes
  return postList.data.map((post) => `/post/${post}`);
};


//https://github.com/Smef/nuxt-ssg-issue-demo/tree/main