<script lang="ts" setup>
import { Fetch } from '~~/composables/useFetch'
import { ref } from 'vue'

// compiler macro
definePageMeta({
  layout: 'page',
})

const order = ref(null)

onMounted(() => {
  const code = new URLSearchParams(window.location.search).get('orderId')
  if (!code) {
    navigateTo('/')
  }

  Fetch('/product/order/' + code, { method: 'get' }).then((response) => {
    order.value = response.data.value.data
    console.log(order.value)
  })
})
</script>

<template>
  <PageWrapper>
    <PageHeader class="!m-0">
      <PageTitle></PageTitle>
    </PageHeader>
    <div class="bg-white">
      <PageBody>
        <PageSection>
          <FormCheckoutOrderConfirmationPaymentOnline
            :orderNumber="order?.number"
            :paymentMethod="order?.payment"
            v-show="order?.payment == 0 || order?.payment == 2"
          ></FormCheckoutOrderConfirmationPaymentOnline>
          <FormCheckoutOrderConfirmationOnDelivery v-show="order?.payment == 1">
          </FormCheckoutOrderConfirmationOnDelivery>
        </PageSection>
      </PageBody>
    </div>
  </PageWrapper>
</template>
