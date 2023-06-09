import axios from "axios"; 

export function $axios(endpoint:string, opts?) {
   const config = useRuntimeConfig().public

   const axiosInstance = axios.create({ 
      baseURL: useRuntimeConfig().public.apiBaseURL, 
      headers: { 
       dsstore: useRuntimeConfig().public.storeId,
       dslanguage: useRuntimeConfig().public.languageId,
       "X-Static-Generation": process.client.toString()
      }, 
      withCredentials: true,
      ...opts
   }); 
   return axiosInstance.get(endpoint)
} 