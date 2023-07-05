<script lang="ts" setup>
// compiler macro
definePageMeta({
  middleware: ["is-authorized"],
  layout: "page",
});

const logOut = () => {
  const authorization = useCookie("Authorization");
  authorization.value = null;

  const customer = useCookie("dsCustomer");
  customer.value = null;
  window.location.reload();
};
</script>

<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle
        :textNav="[{ text: 'Moje konto', slug: '/account' }]"
      ></PageTitle>
    </PageHeader>
    <PageBody>
      <PageSection class="container mx-auto">
        <button
          @click="logOut()"
          class="px-6 py-2.5 bg-blue-900 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-800 hover:shadow-lg focus:bg-emerald-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-emerald-500 active:shadow-lg transition duration-150 ease-in-out"
        >
          Wyloguj
        </button>
      </PageSection>
      <PageSection class="container mx-auto">
        <div class="text-center my-10">
          <span>Lista zamówień</span>
        </div>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>
