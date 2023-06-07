<script lang="ts" setup>
import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
import { useApplication } from "./stores/application";
import { useCart } from "./stores/cart";

const application = useApplication();
const cart = useCart();
</script>

<template>
  <Html lang="pl">
    <Body
      class="text-blue-900 overflow-x-hidden font-nunito bg-gray-50"
      :class="`${
        application.topMenuIsOpen ? 'overflow-hidden wrapper-scroll' : ''
      } ${cart.addCartResult ? 'overflow-hidden wrapper-scroll' : ''}`"
    >
      <div v-if="cart.addCartResult" class="relative" style="z-index: 9999">
        <ModalAddToCartResult />
      </div>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>

<style>
.wrapper-scroll {
  height: 100vh;
  padding-right: 17px; /* Dodaj margines dla paska przewijania, jeśli jest widoczny */
}
</style>
