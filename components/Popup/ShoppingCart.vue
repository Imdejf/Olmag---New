<script lang="ts" setup>
import { useApplication } from "~/stores/application";
import { useCart } from "~/stores/cart";

const application = useApplication();
const cart = useCart();
const toggleShoppingCart = () => {
  application.changeShoppingCart();
};

const getCartDetail = () => {
  cart.getCartDetail(false);
};

onMounted(() => {
  getCartDetail();
});
</script>

<template>
  <div
    class="relative z-10 font-nunito"
    aria-labelledby="slide-over-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      @click="toggleShoppingCart()"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity ease-in-out duration-400"
      :class="
        application.shoppingCartOpen ? 'opacity-100' : 'opacity-0 invisible'
      "
    ></div>

    <div class="fixed overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 <sm:p-0"
        >
          <div
            class="pointer-events-auto w-screen max-w-md transform transition ease-in-out duration-400 sm:duration-700"
            :class="
              application.shoppingCartOpen
                ? 'translate-x-0'
                : 'translate-x-full'
            "
          >
            <div
              class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl !overflow-hidden"
            >
              <div class="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                <div class="flex items-start justify-between">
                  <h2
                    class="text-lg font-medium text-gray-900"
                    id="slide-over-title"
                  >
                    Twój koszyk
                  </h2>
                  <div class="ml-3 flex h-7 items-center">
                    <button
                      type="button"
                      @click="toggleShoppingCart()"
                      class="-m-2 p-2 text-gray-400 hover:text-gray-500"
                    >
                      <span class="sr-only">Close panel</span>
                      <!-- Heroicon name: outline/x-mark -->
                      <svg
                        class="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div class="mt-8">
                  <div class="flow-root">
                    <ul
                      role="list"
                      class="-my-6 divide-y-2 divide-dashed divide-gray-200"
                    >
                      <li
                        v-for="product in cart.cart?.items"
                        :key="product.id"
                        class="flex py-6"
                      >
                        <div
                          class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
                        >
                          <img
                            :src="product.productImage"
                            :alt="product.productName"
                            class="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div class="ml-4 flex flex-1 flex-col">
                          <div>
                            <div
                              class="flex justify-between text-base font-medium text-gray-900"
                            >
                              <h3>
                                <a href="#">{{ product.productName }}</a>
                              </h3>
                              <p class="ml-4 font-extrabold text-blue-900">
                                {{ product.productPrice }} zł
                              </p>
                            </div>
                            <p
                              v-for="variationOption in product.variationOptions"
                              :key="variationOption.optionName"
                              class="mt-1 text-sm text-gray-500"
                            >
                              {{ variationOption.optionName }}:
                              {{ variationOption.value }}
                            </p>
                          </div>
                          <div
                            class="flex flex-1 items-end justify-between text-sm"
                          >
                            <p class="text-gray-500">
                              Ilość: {{ product.quantity }}
                            </p>

                            <div class="flex divide-x">
                              <button
                                type="button"
                                class="font-medium text-red-400 hover:text-red-700 pl-2 py-1 space-x-1"
                                @click="removeItemFromCart(product.id)"
                              >
                                <Icon name="octicon:trash-24" class="w-4 h-4" />
                                Usuń
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div
                class="border-t border-t-2 border-spacing-t-100 border-dashed gray-200 py-6 px-4 sm:px-6"
              >
                <div
                  class="flex justify-between text-base font-extrabold text-green-400"
                >
                  <p>Razem(netto)</p>
                  <p class="font-extrabold">
                    {{ cart.cart?.subTotal?.toFixed(2) }} PLN
                  </p>
                </div>
                <div
                  class="flex mt-1 justify-between text-12px font-medium text-gray-400"
                >
                  <p>Razem (brutto)</p>
                  <p class="font-semibold">
                    {{ cart.cart?.subTotalGross?.toFixed(2) }} PLN
                  </p>
                </div>
                <p class="mt-5 text-sm text-gray-500">
                  Koszt transportu zostanie naliczony w koszyku.
                </p>
                <NuxtLink to="/checkout/cart" class="mt-4">
                  <div
                    @click="toggleShoppingCart()"
                    class="!block items-center !px-0 text-center justify-center rounded-md border border-transparent bg-green-400 py-3 text-base font-medium text-white shadow-sm hover:text-blue-900 hover:bg-emerald-400"
                  >
                    Koszyk
                  </div>
                </NuxtLink>
                <div
                  class="mt-6 flex justify-center text-center text-sm text-gray-500"
                >
                  <p>
                    or
                    <button
                      @click="toggleShoppingCart()"
                      type="button"
                      class="font-medium text-indigo-600 hover:text-blue-900"
                    >
                      Kontynuuj zakupy
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
