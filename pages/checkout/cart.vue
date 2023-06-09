<script lang="ts" setup>
import { ref } from "vue";
import { useCart } from "~/stores/cart";
import { CartDTO, CartItemDTO } from "~/types/ShoppingCart/Cart";
// compiler macro
definePageMeta({
  layout: "page",
});

const itemsBrandList = ref(null);

const cart = useCart();

const currentCart = computed(() => {
  console.log(cart.cart);
  return cart.cart;
});

const sortItemsByBrand = (cartToSort: CartDTO) => {
  const itemsByBrand = [];
  let index = 0;

  cartToSort.items.forEach((item) => {
    const brandId = item.brandId;
    const brandName = item.brand?.name;
    let brandIndex = -1;

    for (let i = 0; i < itemsByBrand.length; i++) {
      if (itemsByBrand[i].brandId === brandId) {
        brandIndex = i;
        break;
      }
    }

    if (brandIndex === -1) {
      itemsByBrand.push({ brandId, brandName, items: [] });
      brandIndex = index;
      index++;
    }

    itemsByBrand[brandIndex].items.push(item);
  });

  itemsBrandList.value = itemsByBrand;
};

async function removeItem(id: string) {
  await cart.removeFromCart(id);
  sortItemsByBrand(cart.cart);
}

onMounted(async () => {
  await cart.getCartDetail(true);
  sortItemsByBrand(cart.cart);
});
</script>

<template>
  <PageWrapper>
    <PageHeader class="!m-0">
      <PageTitle></PageTitle>
    </PageHeader>
    <PageBody>
      <div v-show="currentCart?.items.length == 0">
        <FormCheckoutEmptyCart />
      </div>
      <div
        v-show="currentCart?.items.length > 0"
        class="container mx-auto py-5 <md:px-2"
      >
        <div>
          <h2 class="text-xl font-semibold">Twój koszyk</h2>
        </div>
        <PageSection>
          <div class="flex <sm:flex-col gap-5 w-full mt-5">
            <div class="md:w-2/3">
              <div v-for="(item, index) in itemsBrandList">
                <GridCheckout
                  :currentNumberShipment="index + 1"
                  :cartId="currentCart.id"
                  :numberShipments="Object.keys(itemsBrandList).length"
                  :item="item"
                  :removeItemMethod="removeItem"
                />
              </div>
            </div>
            <div
              class="md:w-1/3 bg-slate-200 h-min sticky !top-31 rounded-lg border-1 border-slate-300 shadow-xl text-blue-800 p-5"
            >
              <div class="mb-5">
                <span class="text-lg font-600">Twoje zamówienie:</span>
              </div>
              <div>
                <div class="border-b-2 border-gray-300">
                  <div class="flex justify-between">
                    <span>Wartość koszyka (netto):</span>
                    <span>{{ currentCart?.subTotal?.toFixed(2) }} zł</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Wartość koszyka (brutto):</span>
                    <span>{{ currentCart?.subTotalGross?.toFixed(2) }} zł</span>
                  </div>
                  <div class="flex mt-3 justify-between">
                    <span>Dostawa (netto):</span>
                    <span
                      >{{ currentCart?.shippingAmount?.toFixed(2) }} zł</span
                    >
                  </div>
                  <div class="flex mb-3 justify-between">
                    <span>Dostawa (brutto):</span>
                    <span
                      >{{
                        currentCart?.shippingAmountGross?.toFixed(2)
                      }}
                      zł</span
                    >
                  </div>
                </div>
                <div class="flex my-3 justify-between">
                  <span class="self-center text-lg font-500"
                    >Razem do zapłaty</span
                  >
                  <span class="font-600 text-2xl"
                    >{{ currentCart?.orderTotal?.toFixed(2) }} zł</span
                  >
                </div>
              </div>
              <Anchor
                class="!block items-center !px-0 text-center justify-center rounded-md border border-transparent bg-green-400 py-3 text-base font-medium text-white shadow-sm hover:text-white hover:bg-green-500"
                text="Śledź zamówienie"
                to="onestep"
                >Złóż zamówienie</Anchor
              >
              <div class="my-3">
                <span>Skorzystaj z rabatu:</span>
              </div>
              <div class="flex items-center border-b border-teal-500 py-2">
                <input
                  class="appearance-none border-b-2 border-emerald-200 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  style="background: transparent"
                  type="text"
                  placeholder="Kod rabatowy"
                  aria-label="Full name"
                />
                <button
                  class="flex-shrink-0 bg-emerald-400 hover:bg-emerald-500 border-emerald-400 hover:border-emerald-500 text-sm border-4 text-white py-1 px-2 rounded"
                  type="button"
                >
                  Aktywuj
                </button>
              </div>
              <div class="w-full mt-2">
                <span class="block text-center">Masz pytania?</span>
              </div>
              <div class="flex mt-2">
                <NuxtLink
                  class="!block items-center w-full py-4 !px-0 text-center justify-center rounded-md border border-transparent bg-blue-900 text-14px font-800 text-orange-400 shadow-md hover:text-orange-400 hover:bg-blue-800"
                  text="Śledź zamówienie"
                  to="checkout"
                  >Zadzwoń do nas</NuxtLink
                >
              </div>
            </div>
          </div>
        </PageSection>
      </div>
    </PageBody>
  </PageWrapper>
</template>
