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

onMounted(() => {
  console.log("jdkwoa");
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      console.log("This page was restored from the bfcache.");
    } else {
      console.log("This page was loaded normally.");
    }
  });
});
</script>

<template>
  <PageWrapper>
    <PageBody>
      <PageSection class="section__welcome">
        <div
          class="bg-cover bg-no-repeat bg-center h-full"
          style="
            background-size: 100% 100%;
            background-image: url('assets/tlo.webp');
          "
        >
          <h1 class="font-base text-center text-md">
            Olmag.pl - wyposażenie magazynu
          </h1>
          <div class="container mx-auto py-12 md:py-24">
            <h2
              class="text-2xl md:text-6xl text-center font-medium mb-4 capitalize"
            >
              Sprawdź Naszą Ofertę Na Pojemniki Magazynowe I Drabiny Aluminiowe
            </h2>
            <div class="mt-12 flex">
              <div class="mx-auto md:flex text-center md:w-auto gap-10">
                <NuxtLink
                  to="/category/pojemniki-magazynowe"
                  class="bg-blue-900 block md:mt-0 hover:bg-opacity-80 text-orange-500 font-bold py-4 px-4 rounded-full"
                >
                  POJEMNIKI MAGAZYNOWE
                </NuxtLink>
                <NuxtLink
                  to="/category/drabiny-aluminiowe"
                  class="bg-blue-900 block mt-5 md:mt-0 hover:bg-opacity-80 text-orange-500 font-bold py-4 px-4 rounded-full"
                >
                  DRABINY ALUMINIOWE
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>
