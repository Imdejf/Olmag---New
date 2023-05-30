<script lang="ts" setup>
import { useCategories } from "~/stores/category";

const categories = useCategories();

// async function fetchData() {
//   categories.fetchCategories();
// }

// // if (useCookie("dsStore")) {
//   fetchData();
// // }

const testValue = ref([]);
useFetch("https://olmagpl.azurewebsites.net/api/product/category", {
  method: "GET",
}).then((response) => {
  console.log(response.data.value.data);
  testValue.value = response.data.value.data;
});

const allCategories = computed((): any => {
  console.log(testValue.value);
  return testValue.value;
});
</script>

<template>
  <div class="h-full w-full">
    <div>
      <div
        class="md:p-10 grid grid-cols-1 text-[10px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-5"
      >
        <div
          v-for="category in allCategories"
          :key="category.name"
          class="flex self-center h-full border-b-2 border-solid border-emerald-100 transform hover:scale-101 hover:shadow-md transition duration-400 ease-in-out"
        >
          <router-link
            :to="'/category' + category.slug"
            class="w-full h-full flex items-center hover:text-green-500"
          >
            <img
              :data-src="
                category.thumbnailImage.mediaLangs[0].filePath
                  ? category.thumbnailImage.mediaLangs[0].filePath
                  : category.thumbnailImage.filePath
              "
              :alt="
                category.thumbnailImage.mediaLangs[0].altAttribute
                  ? category.thumbnailImage.mediaLangs[0].altAttribute
                  : category.thumbnailImage.altAttribute
              "
              class="w-12"
            />
            <p class="w-full md:text-sm break-normal ml-5">
              {{
                category.categoriesLang[0].name
                  ? category.categoriesLang[0].name
                  : category.name
              }}
            </p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
