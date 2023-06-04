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
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7
  })

  const dsLanguage = useCookie('dsLanguage', {
    sameSite: 'none',
    path: '/',
    secure: true,
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7
  })

  if(!dsStore.value) {
    dsStore.value = config.storeId
  }

  if(!dsLanguage.value) {
    dsLanguage.value = config.languageId
  }
  const cookies = [
    'dsStore=' + config.storeId,
    'dsLanguage=' + config.languageId,
  ];
//@ts-ignore
  return useFetch<T>(request, {
    baseURL: config.apiBaseURL,
    headers: {
      "Access-Control-Allow-Origin": "*",
      Cookie: "cookie1=value; cookie2=value; cookie3=value;",
    },
    credentials: 'include',
    ...opts,
  })
}