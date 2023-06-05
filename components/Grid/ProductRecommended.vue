<script lang="ts" setup>
import { ProductAvailability } from "~/types/Product/productTypes";

const props = defineProps({
  products: {
    type: Object,
    default: null,
  },
});

function getProductAvailabilityDescription(
  availability: ProductAvailability
): string {
  switch (availability) {
    case ProductAvailability.Available:
      return "Dostępny";
    case ProductAvailability.SellerConfirmation:
      return "Potwierdzenie sprzedawcy";
    case ProductAvailability.ThreeToSevenDays:
      return "3-7 dni";
    case ProductAvailability.ThreeToTenDays:
      return "3-10 dni";
    case ProductAvailability.TwoWeeks:
      return "2 tygodnie";
    case ProductAvailability.ThreeWeeks:
      return "3 tygodnie";
    case ProductAvailability.ThreeToFiveWeeks:
      return "3-5 tygodni";
    case ProductAvailability.TemporarilyUnavailable:
      return "Tymczasowo niedostępny";
    case ProductAvailability.ToOrder:
      return "Do zamówienia";
    default:
      throw new Error(`Potwierdzenie sprzedawcy`);
  }
}
</script>
<template>
  <ul
    class="grid-recommended grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 col-auto tracking-normal mt-8"
  >
    <li v-for="product in products" :key="product.productId">
      <NuxtLink
        :to="'/' + product.slug"
        class="relative transform hover:scale-102 hover:shadow-2xl transition duration-400 ease-in-out rounded-lg bg-white p-4 flex flex-col shadow-sm shadow-gray-200"
      >
        <div class="flex">
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

          <div class="mt-2">
            <div class="flex flex-col">
              <h3></h3>
              <h3 class="sr-only">Name</h3>
              <h3 class="font-medium text-sm md:text-lg">{{ product.name }}</h3>
              <p class="sr-only">Price</p>
              <p class="text-blue-600 my-3 font-bold text-lg">
                {{ product.price.toFixed(2) }} zł
              </p>
            </div>
          </div>
        </div>
        <div class="mt-6 flex items-center gap-8 text-xs">
          <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-gray-500"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M32 456a24 24 0 0 0 24 24h400a24 24 0 0 0 24-24V176H32Zm310.17-244H368v200h-32V256.29l-35.39 26.08l-19-25.76ZM222 335.3c-8.54-8.74-22.75-12.67-30.11-12.67h-16v-32h16c4.85 0 17.41-2.6 25.28-10.65a22 22 0 0 0 6.57-16.08c0-23.23-28.63-23.9-31.89-23.9c-17.34 0-23.8 10.61-24.07 11.06l-8.13 13.78l-27.56-16.27l8.14-13.77c7.64-13 25.22-26.8 51.62-26.8c16.44 0 31.76 4.77 43.13 13.42c13.39 10.2 20.76 25.28 20.76 42.48A54 54 0 0 1 240 302.35c-1.15 1.18-2.36 2.28-3.59 3.35a66.18 66.18 0 0 1 8.42 7.23c10.56 10.8 16.14 25.75 16.14 43.25c0 18.06-7.61 34-21.42 44.92c-12.17 9.61-28.75 14.9-46.7 14.9c-27.87 0-48.48-18.16-57.66-33.7l-8.13-13.78l27.56-16.27l8.16 13.75c1.08 1.84 11.15 18 30.1 18c16.66 0 36.12-7.29 36.12-27.82c0-6.25-1.22-14.95-7-20.88ZM456 64h-55.92V32h-48v32H159.92V32h-48v32H56a23.8 23.8 0 0 0-24 23.77V144h448V87.77A23.8 23.8 0 0 0 456 64Z"
              />
            </svg>

            <div class="mt-1.5 sm:mt-0">
              <p class="text-gray-500">Dostępność</p>

              <p class="font-bold text-emerald-500">
                {{
                  getProductAvailabilityDescription(product.productAvailability)
                }}
              </p>
            </div>
          </div>

          <div
            class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2"
            :class="`${product.brandName !== null ? '' : '!hidden'}`"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-gray-500"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M2 22V9.975L9 7v2l5-2v3h8v12H2Zm9-4h2v-4h-2v4Zm-4 0h2v-4H7v4Zm8 0h2v-4h-2v4Zm6.8-9.5h-4.625l.85-6.5H21l.8 6.5Z"
              />
            </svg>

            <div class="mt-1.5 sm:mt-0">
              <p class="text-gray-500">Producent</p>

              <p class="font-bold text-emerald-500">{{ product.brandName }}</p>
            </div>
          </div>

          <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              viewBox="0 0 36 36"
            >
              <path
                fill="#039"
                d="M32 5H4a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4z"
              />
              <path
                d="M18.539 9.705l.849-.617h-1.049l-.325-.998l-.324.998h-1.049l.849.617l-.325.998l.849-.617l.849.617zm0 17.333l.849-.617h-1.049l-.325-.998l-.324.998h-1.049l.849.617l-.325.998l.849-.617l.849.617zm-8.666-8.667l.849-.617h-1.05l-.324-.998l-.325.998H7.974l.849.617l-.324.998l.849-.617l.849.617zm1.107-4.285l.849-.617h-1.05l-.324-.998l-.324.998h-1.05l.849.617l-.324.998l.849-.617l.849.617zm0 8.619l.849-.617h-1.05l-.324-.998l-.324.998h-1.05l.849.617l-.324.998l.849-.617l.849.617zm3.226-11.839l.849-.617h-1.05l-.324-.998l-.324.998h-1.05l.849.617l-.324.998l.849-.617l.849.617zm0 15.067l.849-.617h-1.05l-.324-.998l-.324.998h-1.05l.849.617l-.324.998l.849-.616l.849.616zm11.921-7.562l-.849-.617h1.05l.324-.998l.325.998h1.049l-.849.617l.324.998l-.849-.617l-.849.617zm-1.107-4.285l-.849-.617h1.05l.324-.998l.324.998h1.05l-.849.617l.324.998l-.849-.617l-.849.617zm0 8.619l-.849-.617h1.05l.324-.998l.324.998h1.05l-.849.617l.324.998l-.849-.617l-.849.617zm-3.226-11.839l-.849-.617h1.05l.324-.998l.324.998h1.05l-.849.617l.324.998l-.849-.617l-.849.617zm0 15.067l-.849-.617h1.05l.324-.998l.324.998h1.05l-.849.617l.324.998l-.849-.616l-.849.616z"
                fill="#FC0"
              />
            </svg>

            <div class="mt-1.5 sm:mt-0">
              <p class="text-gray-500">Wyprodukowano</p>

              <p class="font-bold text-emerald-500">Unia europejska</p>
            </div>
          </div>
        </div>
      </NuxtLink>
    </li>
  </ul>
</template>
