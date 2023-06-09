import { UseFetchOptions } from '#app'
import { NitroFetchRequest } from 'nitropack'
import { KeyOfRes } from 'nuxt/dist/app/composables/asyncData'

export function Fetch<T>(
  request: NitroFetchRequest,
  opts?:
    | UseFetchOptions<
        T extends void ? unknown : T,
        (res: T extends void ? unknown : T) => T extends void ? unknown : T,
       //@ts-ignore
        KeyOfRes<
          (res: T extends void ? unknown : T) => T extends void ? unknown : T
        >
      >
    | undefined
) {
  const config = useRuntimeConfig().public

  const dsStore = useCookie('dsStore', {
    sameSite: 'none',
    path: '/',
    secure: true,
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 7
  })

  const dsLanguage = useCookie('dsLanguage', {
    sameSite: 'none',
    path: '/',
    secure: true,
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 7
  })

  if(!dsStore.value) {
    dsStore.value = config.storeId
  }

  if(!dsLanguage.value) {
    dsLanguage.value = config.languageId
  }

//@ts-ignore
  return useFetch<T>(request, {
    baseURL: config.apiBaseURL,
    headers: {
      dsstore: config.storeId,
      dslanguage: config.languageId,
      "X-Static-Generation": process.client.toString()
    },
    credentials: 'include',
    ...opts,
  })
}