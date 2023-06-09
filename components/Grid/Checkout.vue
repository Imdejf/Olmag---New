<script lang="ts" setup>
import { useCart } from "~/stores/cart";

const props = defineProps({
  cartId: {
    type: String,
    default: "",
  },
  item: {
    type: Object,
    default: null,
  },
  currentNumberShipment: {
    type: Number,
    default: 1,
  },
  numberShipments: {
    type: Number,
    default: 1,
  },
  productId: {
    type: String,
    default: "",
  },
  removeItemMethod: {
    type: Function,
    default: () => {},
  },
});
const cart = useCart();

function updateProductCount(productId: string, value: number) {
  cart.updateQuantity(props.cartId, productId, value);
}

function removeItem(id: number) {
  props.removeItemMethod(id);
}
</script>

<template>
  <div class="bg-white rounded-xl mb-4">
    <div class="p-1 bg-slate-200 rounded-t-xl pl-4 text-center text-blue-900">
      <Icon name="game-icons:cardboard-box" class="h-5 w-5" />
      <span class="font-600 ml-2"
        >Przesyłka {{ currentNumberShipment }}/{{ numberShipments }}</span
      >
    </div>
    <div class="p-5">
      <ul class="flex flex-col divide-y divide-gray-700">
        <li
          v-for="product in item.items"
          :key="product.id"
          class="flex flex-col py-6 sm:flex-row sm:justify-between border-b-2"
        >
          <div class="flex w-full space-x-2 sm:space-x-4">
            <img
              class="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
              :src="product.productImage"
              :alt="product.productName"
            />
            <div class="flex flex-col justify-between w-full pb-4">
              <div class="flex justify-between w-full pb-2 space-x-2">
                <div class="space-y-1">
                  <h3 class="text-lg font-semibold leading-snug sm:pr-8">
                    {{ product.productName }}
                  </h3>
                  <p class="text-sm dark:text-gray-400">
                    {{ item.brandName ?? "olmag" }}
                  </p>
                </div>
                <div class="text-right">
                  <p
                    v-show="product?.productOldPrice"
                    class="line-through decoration-red-700 font-600 text-md text-red-500"
                  >
                    {{ product.productOldPrice?.toFixed(2) }} zł
                  </p>
                  <p class="text-lg font-semibold">
                    {{ product.productPrice.toFixed(2) }} zł
                  </p>
                </div>
              </div>
              <div class="self-end">
                <FormQuantityPlusMinus
                  :value="product.quantity"
                  :productId="product.productId"
                  @update:value="product.quantity = $event"
                  :updateQuantityProp="updateProductCount"
                />
              </div>
              <div class="flex flex-1 md:justify-betwe en text-sm mt-5">
                <div class="flex divide-x">
                  <button
                    type="button"
                    class="font-medium text-red-400 hover:text-red-700 pl-2 py-1 space-x-1"
                    @click="removeItem(product.id)"
                  >
                    <Icon name="octicon:trash-24" class="w-4 h-4" />
                    Usuń
                  </button>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
