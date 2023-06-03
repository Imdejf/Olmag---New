import axios from "axios"
export default defineNuxtPlugin(() => {
    addRouteMiddleware('global-middleware',async (to, from) => {
      const cookieStore = useCookie('dsStore')
      const cookieLanguage = useCookie('dsLanguage')
      const cookieUser = useCookie('dsUser')

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
            dsStore: config.storeId,
            dsLanguage: config.languageId,
          },
         withCredentials: true
        })
      }
      },
      { global: true }
    )
  })