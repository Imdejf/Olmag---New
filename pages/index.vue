<script lang="ts" setup>
import { productStore } from "~/stores/product";

// compiler macro
definePageMeta({
  layout: "page",
});

const productsStore = productStore();

function fetchProduct() {
  productsStore.fetchProducts();
}

if (useCookie("dsStore")) {
  fetchProduct();
}

// onMounted(() => {
//   window.addEventListener("pageshow", (event) => {
//     if (event.persisted) {
//       console.log("This page was restored from the bfcache.");
//     } else {
//       console.log("This page was loaded normally.");
//     }
//   });
// });
useHead({
  link: [
    {
      rel: "preload",
      href: "/assets/tlo.webp",
      fetchpriority: "high",
      as: "image",
      type: "image/webp",
    },
    {
      rel: "preload",
      href: "/assets/tlo-mobile.webp",
      fetchpriority: "high",
      as: "image",
      type: "image/webp",
    },
  ],
});
</script>

<template>
  <PageWrapper>
    <PageBody>
      <PageSection class="section__welcome">
        <div class="relative bg-cover bg-no-repeat bg-center h-full">
          <img
            data-src="assets/tlo.webp"
            class="lazyload hidden md:block absolute h-full"
          />
          <img
            data-src="assets/tlo-moblie.webp"
            class="lazyload blur-up md:hidden block absolute h-full"
          />
          <div class="relative">
            <h1 class="font-base text-center text-md">
              Olmag.pl - wyposażenie magazynu
            </h1>
            <div class="container mx-auto py-4 md:py-24">
              <h2
                class="text-lg md:text-6xl text-center font-bold md:font-medium mb-4 capitalize"
              >
                Sprawdź Naszą Ofertę Na Pojemniki Magazynowe I Drabiny
                Aluminiowe
              </h2>
              <div class="md:mt-12 flex">
                <div class="mx-auto md:flex text-center md:w-auto gap-10">
                  <NuxtLink
                    to="/category/pojemniki-magazynowe"
                    class="bg-blue-900 block md:mt-0 hover:bg-opacity-80 text-orange-500 font-semibold md:font-bold p-2.5 md:p-4 rounded-full"
                  >
                    POJEMNIKI MAGAZYNOWE
                  </NuxtLink>
                  <NuxtLink
                    to="/category/drabiny-aluminiowe"
                    class="bg-blue-900 block mt-3 md:mt-0 hover:bg-opacity-80 text-orange-500 font-semibold md:font-bold p-2.5 md:p-4 rounded-full"
                  >
                    DRABINY ALUMINIOWE
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>

<style>
.blur-up {
  -webkit-filter: blur(5px);
  filter: blur(5px);
  transition: filter 400ms, -webkit-filter 400ms;
}

.blur-up.lazyloaded {
  -webkit-filter: blur(0);
  filter: blur(0);
}
</style>
