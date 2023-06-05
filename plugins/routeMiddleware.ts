import axios from "axios"
export default defineNuxtPlugin(() => {
    addRouteMiddleware('global-middleware',async (to, from) => {
      const cookieStore = useCookie('dsStore', {
        sameSite: 'none',
        path: '/',
        secure: true,
        httpOnly: false,
        maxAge: 60 * 60 * 24 * 7
      })

      const cookieLanguage = useCookie('dsLanguage', {
        sameSite: 'none',
        path: '/',
        secure: true,
        httpOnly: false,
        maxAge: 60 * 60 * 24 * 7
      })

      const cookieUser = useCookie('dsCustomer')

      const config = useRuntimeConfig().public

      //@ts-ignore
      if(cookieStore !== config.storeId) {
        cookieStore.value = config.storeId
      }

      //@ts-ignore
      if(cookieLanguage !== config.languageId) {
        cookieLanguage.value = config.languageId
      }
      
      //@ts-ignore
      if(!cookieUser.value) {
        axios.get(config.apiBaseURL + 'checkSession',{
          headers: {
            dsstore: config.storeId,
            dslanguage: config.languageId,
            "X-Static-Generation": process.client
          },
         withCredentials: true
        })
      }
      },
      { global: true }
    )
  })