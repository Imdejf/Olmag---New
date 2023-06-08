import { VueReCaptcha, useReCaptcha } from 'vue-recaptcha-v3';
import { useNuxtApp } from '#app';

export const useVueRecaptcha = async () => {
  const { vueApp } = useNuxtApp();
  vueApp.use(VueReCaptcha, {
    siteKey: '6LcpsCAmAAAAABLfC-2FLzWRKy3tTEDmj4jEx8BV',
    loaderOptions: {
      autoHideBadge: true,
    },
  });
  const { executeRecaptcha, recaptchaLoaded } = useReCaptcha();
  await recaptchaLoaded();
  return await executeRecaptcha('login');
};
