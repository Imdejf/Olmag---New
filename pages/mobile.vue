<script lang="ts" setup>
console.log("dkwoakdawo");
const testValue = ref(null);
useFetch("https://olmagpl.azurewebsites.net/api/product/category", {
  method: "GET",
}).then((response) => {
  console.log(response.data.value.data);
  testValue.value = response.data.value.data;
});
</script>

<template>
  <div>dsadsa</div>
  <div>{{ testValue }}</div>
</template>
