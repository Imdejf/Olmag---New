import { GlobalSettings } from "./environmentsettings"
import axios from "axios";
import { fetchCategories, fetchBlogs, fetchProducts } from "./static/api/getData"
import { config } from "process";

// https://nuxt.com/docs/api/configuration/nuxt-config
const appEnv = process.env.ENV || 'development'

export default defineNuxtConfig({
  ssr: true,
  nitro: {
      preset: "azure",
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
        const productSlugs = await getProduct();
        nitroConfig.prerender.routes.push(...blogSlugs, ...postSlugs, ...categorySlugs, ...productSlugs)
        return
    }
},

  css: [
    '@/assets/css/main.css',
  ],

  build: {
    transpile: ['@headlessui/vue', '@vee-validate/rules'],
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
        },
        {
          name: "format-detection",
          content: "telephone=no"
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
  },
})

const getBlogRoutes = async () => {
  const blogsList = await axios.get(GlobalSettings[appEnv].apiBaseURL + 'product/blogCategory/slugs', {
    params: {
      storeId: GlobalSettings[appEnv].storeId
    }
  })

  return blogsList.data.map((category) => `/blog/${category}`);
};

const getPostRoutes = async () => {
  const postList = await axios.get(GlobalSettings[appEnv].apiBaseURL + 'product/blogItem/slugs', {
    params: {
      storeId: GlobalSettings[appEnv].storeId
    }
  })
  return postList.data.map((post) => `/post/${post}`);
};

const getCategory = async () => {
  const categoryList = await axios.get(GlobalSettings[appEnv].apiBaseURL + 'product/category/slugs', {
    params: {
      storeId: GlobalSettings[appEnv].storeId
    }
  })
  return categoryList.data.map((category) => `/category/${category}`);
};

const getProduct = async () => {
  const productList = await axios.get(GlobalSettings[appEnv].apiBaseURL + 'product/slugs', {
    params: {
      storeId: GlobalSettings[appEnv].storeId
    }
  })

  return productList.data.map((product) => `/${product}`);
};


const saveDataToFile = async () => {
  await fetchCategories(GlobalSettings[appEnv].storeId, GlobalSettings[appEnv].languageId, GlobalSettings[appEnv].apiBaseURL);
  await fetchBlogs(GlobalSettings[appEnv].storeId, GlobalSettings[appEnv].languageId, GlobalSettings[appEnv].apiBaseURL);
  await fetchProducts(GlobalSettings[appEnv].storeId, GlobalSettings[appEnv].languageId, GlobalSettings[appEnv].apiBaseURL);
}

//https://github.com/Smef/nuxt-ssg-issue-demo/tree/main