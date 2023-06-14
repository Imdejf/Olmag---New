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
              class="flex-shrink-0 object-cover w-20 h-20 rounded outline-none sm:w-32 sm:h-32"
              :src="product.productImage"
              :alt="product.productName"
            />
            <div class="flex flex-col justify-between w-full pb-4">
              <div class="flex justify-between w-full pb-2 space-x-2">
                <div class="space-y-1">
                  <h3
                    class="text-sm md:text-lg font-semibold leading-snug sm:pr-8"
                  >
                    {{ product.productName }}
                  </h3>
                  <p class="text-sm">
                    {{ item.brandName ?? "olmag" }}
                  </p>
                </div>
                <div class="text-right">
                  <p
                    v-show="product?.productOldPrice"
                    class="line-through decoration-red-700 font-semibold text-sm md:text-md text-red-500"
                  >
                    {{ product.productOldPrice?.toFixed(2) }} zł
                  </p>
                  <p class="text-md font-semibold">
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
              <div
                class="flex flex-1 justify-end md:justify-between en text-sm mt-5"
              >
                <div class="flex divide-x">
                  <button
                    type="button"
                    class="flex font-medium text-red-400 hover:text-red-700 pl-2 py-1 space-x-1"
                    @click="removeItem(product.id)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-4 h-4"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M16 1.75V3h5.25a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75Zm-6.5 0V3h5V1.75a.25.25 0 0 0-.25-.25h-4.5a.25.25 0 0 0-.25.25ZM4.997 6.178a.75.75 0 1 0-1.493.144L4.916 20.92a1.75 1.75 0 0 0 1.742 1.58h10.684a1.75 1.75 0 0 0 1.742-1.581l1.413-14.597a.75.75 0 0 0-1.494-.144l-1.412 14.596a.25.25 0 0 1-.249.226H6.658a.25.25 0 0 1-.249-.226L4.997 6.178Z"
                      />
                      <path
                        fill="currentColor"
                        d="M9.206 7.501a.75.75 0 0 1 .793.705l.5 8.5A.75.75 0 1 1 9 16.794l-.5-8.5a.75.75 0 0 1 .705-.793Zm6.293.793A.75.75 0 1 0 14 8.206l-.5 8.5a.75.75 0 0 0 1.498.088l.5-8.5Z"
                      />
                    </svg>
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
