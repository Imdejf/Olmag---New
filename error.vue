<script setup>
const props = defineProps({
  error: Object,
  required: true,
});

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <div>Error {{ error.statusCode }}</div>
  <div><button @click="handleError">Go to the home page</button></div>
</template>
