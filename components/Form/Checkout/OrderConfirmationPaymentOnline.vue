<script lang="ts" setup>
import { defineProps } from "vue";
import { Fetch } from "~~/composables/useFetch";

const props = defineProps({
  orderNumber: {
    type: String,
  },
  paymentMethod: {
    type: Number,
  },
});

const numberOrder = ref("");

const paymentByP24 = () => {
  Fetch("/v1/PaymentPrzelewy/RegisterTransactionP24", {
    method: "post",
    body: {
      storeId: useCookie("dsStore"),
      userId: useCookie("dsCustomer"),
      orderId: orderId.data.value.data,
    },
  }).then((response) => {
    const externalUrl = response.data.value.data;
    window.location.href = externalUrl;
  });
};

onMounted(() => {});
</script>

<template>
  <div class="flex text-blue-900">
    <div class="w-1/2">
      <img src="/assets/content/order-confirmation.jpg" />
    </div>
    <div class="w-1/2 text-center my-10">
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
        <ul class="text-center" v-show="paymentMethod === 2">
          <li class="mb-2">
            Numer konta do przelewu:
            <span class="font-bold">51 1090 1593 0000 0001 5266 0226</span>
          </li>
          <li>
            Dane operatora sklepu do wykonania przelewu:
            <span class="font-bold"
              >Data Sharp, ul. Polna 7, 66-340 Przytoczna</span
            >
          </li>
          <li class="mt-2">
            Prosimy również o podanie
            <span class="font-bold"> numeru zamówienia/numeru proformy</span> w
            tytule przelewu
          </li>
          <li class="mt-2">
            Numer konta został również wysłany na e-mail wraz z potwierdzeniem
            zamówienia
          </li>
        </ul>
      </div>
      <div class="mt-5">
        <span class="font-bold">Co dalej?</span>
      </div>
      <div class="text-left my-5">
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
