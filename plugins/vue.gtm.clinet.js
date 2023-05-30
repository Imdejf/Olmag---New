import { createGtm } from "@gtm-support/vue-gtm";

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig().public;
  if (runtimeConfig.siteEnvironment === "production") return;
  nuxtApp.vueApp.use(
    createGtm({
      id: runtimeConfig.gtm_id,
      defer: false,
      compatibility: false,
      enabled: runtimeConfig.gtm_enabled,
      debug: runtimeConfig.gtm_debug,
      loadScript: true,
      vueRouter: useRouter(),
      trackOnNextTick: false,
    })
  );
});
