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
//@ts-ignore
  return useFetch<T>(request, {
    baseURL: config.apiBaseURL,
    headers: {
      dsStore: config.storeId,
      dsLanguage: config.languageId,
    },
    credentials: 'include',
    ...opts,
  })
}