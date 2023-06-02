import { NuxtApp } from '#app';
import { AsyncData } from 'nuxt/dist/app/composables';
import {
  AsyncDataExecuteOptions,
  AsyncDataOptions,
  KeyOfRes,
  PickFrom,
  _Transform,
} from 'nuxt/dist/app/composables/asyncData';
/**
 * Composable for caching data across client requests. Prevents refetching of data when navigating on client side
 * Takes the same arguments as `useAsyncData`, with cacheKey being used to deduplicate requests
 */
export function useCachedAsyncData<Data>(
  cacheKey: string,
  handler: (ctx?: NuxtApp) => Promise<Data>,
  options?: AsyncDataOptions<Data>
): AsyncData<
  PickFrom<ReturnType<_Transform<Data>>, KeyOfRes<_Transform<Data>>>,
  Error | null
> {
  // Used to prevent collisions in nuxt data. Low likelyhood that another property in nuxt data starts with this
  const CACHE_KEY_PRREFIX = 'CACHED_ASYNC_DATA';
  const { data: cachedData } = useNuxtData(cacheKey);
  const cacheKeyAsync = `${CACHE_KEY_PRREFIX}${cacheKey}`;
  const shouldRefresh = ref<boolean>(false);

  // We need to cache transformed value to prevent value from being transformed every time.
  const transform = options?.transform;
  // Remove transform from options, so useAsyncData doesn't transform it again
  const optionsWithoutTransform = { ...options, transform: undefined };

  const asyncData = useAsyncData<Data, Error>(
    cacheKey,
    async () => {
      await refreshNuxtData(cacheKeyAsync);
      // If we already have data, and we're not being forced to refresh, return cached data
      if (cachedData.value && !shouldRefresh.value) {
        return cachedData.value;
      }
      const result = await handler();
      shouldRefresh.value = false;
      if (transform) {
        return transform(result);
      }
      return result;
    },
    optionsWithoutTransform
  );
  const refresh: (opts?: AsyncDataExecuteOptions | undefined) => Promise<void> =
    async (opts?: AsyncDataExecuteOptions) => {
      shouldRefresh.value = true;
      await asyncData.refresh(opts);
      shouldRefresh.value = false;
    };
  return { ...asyncData, refresh };
}
