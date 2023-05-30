<script lang="ts" setup>
const products = ref([]);

Fetch("/product/HeighlightProduct", {
  method: "GET",
  params: {
    languageId: useCookie("dsLanguage"),
    storeId: useCookie("dsStore"),
  },
}).then((response) => {
  products.value = response.data.value.data;
});

const allProducts = computed((): any => {
  return products.value.filter((c) => c.isBestseller === true);
});
</script>

<template>
  <ul class="grid md:grid-cols-4 grid-cols-2 gap-7 py-8">
    <li v-for="product in allProducts" :key="product.productId">
      <div
        class="max-w-2xl mx-auto relative transform hover:scale-102 hover:shadow-2xl transition duration-400 ease-in-out rounded-lg"
      >
        <div class="bg-white py-2 shadow-md rounded-lg max-w-sm">
          <a>
            <img
              :data-src="
                product.thumbnailImage.mediaLangs[0].filePath
                  ? product.thumbnailImage.mediaLangs[0].filePath
                  : product.thumbnailImage.filePath
              "
              :alt="
                product.thumbnailImage.mediaLangs[0].altAttribute
                  ? product.thumbnailImage.mediaLangs[0].altAttribute
                  : product.thumbnailImage.altAttribute
              "
              class="lazyload mx-auto w-[150px] h-[70px]"
            />
          </a>
          <div class="px-2 pb-5">
            <a href="#">
              <h3
                class="content card-text mb-3 text-center text-blue-900 font-600 text-sm tracking-tight"
              >
                {{ product.name }}
              </h3>
            </a>
            <div class="flex items-center justify-between">
              <p class="text-xl font-bold text-blue-400">
                {{ product.price.toFixed(2) }} zł
              </p>
            </div>
            <div class="pt-3">
              <router-link
                :to="'/' + product.slug"
                class="block w-full text-center text-white rounded-xl font-600 bg-emerald-500 hover:bg-emerald-400/90 py-4 text-sm md:text-14px font-medium"
              >
                Sprawdź produkt!
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<style>
.truncate {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
