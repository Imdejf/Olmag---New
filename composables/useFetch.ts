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
  console.log("WYWOŁAJ API")
  console.log(config.apiBaseURL)
//@ts-ignore
  return useFetch<T>(request, {
    baseURL: config.apiBaseURL,
    credentials: 'include',
    ...opts,
  })
}