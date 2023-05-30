<script lang="ts" setup>
console.log("dkwoakdawo");
const testValuee = ref(null);
Fetch("https://olmagpl.azurewebsites.net/api/product/category", {
  method: "GET",
}).then((response) => {
  console.log(response.data.value.data);
  testValuee.value = response.data.value.data;
});
</script>

<template>
  <div>dsadsa</div>
  <div>{{ testValuee }}</div>
</template>
