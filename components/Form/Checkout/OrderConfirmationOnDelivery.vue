<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
  orderNumber: {
    type: String,
  },
});

const numberOrder = ref("");

onMounted(() => {});
</script>

<template>
  <div class="flex text-blue-900">
    <div class="w-1/2">
      <img src="/assets/content/order-confirmation.jpg" />
    </div>
    <div class="w-1/2 text-center my-auto">
      <div>
        <h1 class="text-2xl font-bold text-emerald-400">
          Dziękujemy za złożenie zamówienia
        </h1>
      </div>
      <div class="text-lg mt-10">
        <span
          >Numer zamówienia:
          <span class="font-bold">{{ orderNumber }}</span></span
        >
      </div>
      <div class="mt-5">
        <span class="font-bold">Co dalej?</span>
      </div>
      <div class="text-left mt-5">
        <ul class="list-disc px-8">
          <li>
            Po zaksięgowaniu wpłaty wyślemy Ci potwierdzenie zamówienia wraz z
            informacjami o postępach na e-mail wskazany w zamówieniu.
          </li>
          <li class="mt-3">
            W celu sprawdzenia postępów zamówienia zachęcamy również do
            skorzystania z opcji
            <NuxtLink :to="'/tracking'" class="font-bold"
              >Śledź Zamówienie</NuxtLink
            >.
          </li>
          <li class="mt-3">
            Jeśli posiadasz jakieś pytania lub pojawiły się problemy z
            płątnością skontaktuj się z nami.
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
