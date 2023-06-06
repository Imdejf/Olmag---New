import { GlobalSettings } from "./environmentsettings"
import axios from "axios";
import { fetchCategories, fetchBlogs, fetchProducts } from "./static/api/getData"
import { config } from "process";

// https://nuxt.com/docs/api/configuration/nuxt-config
const appEnv = process.env.ENV || 'development'

export default defineNuxtConfig({
  ssr: true,
  nitro: {
      prerender: {
          crawlLinks:true
      },
  },
  experimental: {
    payloadExtraction: false
  },

  hooks: {
    async 'nitro:config'(nitroConfig) {
        // if (nitroConfig.dev) {
        //     return
        // }
        await saveDataToFile();
        const blogSlugs = await getBlogRoutes();
        const postSlugs = await getPostRoutes();
        const categorySlugs = await getCategory();
        nitroConfig.prerender.routes.push(...blogSlugs, ...postSlugs, ...categorySlugs)
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
      hostURL: GlobalSettings[appEnv].hostURL,
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

const getCategory = async () => {
  const categoryList = await axios.get(GlobalSettings[appEnv].apiBaseURL + 'product/category/slugs', {
    params: {
      storeId: GlobalSettings[appEnv].storeId
    }
  })
  // return the array of routes
  return categoryList.data.map((category) => `/category/${category}`);
};

const saveDataToFile = async () => {
  await fetchCategories(GlobalSettings[appEnv].storeId, GlobalSettings[appEnv].languageId, GlobalSettings[appEnv].apiBaseURL);
  await fetchBlogs(GlobalSettings[appEnv].storeId, GlobalSettings[appEnv].languageId, GlobalSettings[appEnv].apiBaseURL);
  await fetchProducts(GlobalSettings[appEnv].storeId, GlobalSettings[appEnv].languageId, GlobalSettings[appEnv].apiBaseURL);
}

//https://github.com/Smef/nuxt-ssg-issue-demo/tree/main