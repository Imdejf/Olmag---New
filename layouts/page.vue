<script lang="ts" setup>
import { useApplication } from "~/stores/application";

const nuxtApp = useNuxtApp();
const application = useApplication();

const cookie = ref(useCookie("cookies"));
const isLoading = ref(false);

const show = ref(false);

onMounted(() => {
  setTimeout(() => {
    show.value = true;
  }, 3000);
});

function acceptCookie(value: boolean) {
  const newCookie = useCookie("cookies", {
    path: "/",
  });
  newCookie.value = "true";
  cookie.value = "true";
}

nuxtApp.hook("page:finish", () => {
  isLoading.value = true;
});
</script>
<template>
  <div>
    <div class="flex flex-col min-h-screen">
      <slot name="header">
        <PageNavbar ref="navbar" />
      </slot>
      <div
        id="slideover-bg"
        @click="application.changeTopMenu"
        class="w-full h-full duration-500 ease-out fixed transition-all inset-0 z-10 bg-gray-900"
        :class="
          application.topMenuIsOpen ? 'opacity-60' : 'opacity-0 invisible'
        "
      ></div>
      <div>
        <slot></slot>
      </div>
      <slot name="footer">
        <PageFooter />
      </slot>
    </div>
    <div
      v-show="cookie == null"
      class="transition duration-300 ease-in-out"
      :class="`${show === true ? 'opacity-1' : 'opacity-0'}`"
    >
      <AlertCookieBanner @acceptCookie="acceptCookie" />
    </div>
  </div>
</template>
