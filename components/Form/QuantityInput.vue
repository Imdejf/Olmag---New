<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  value: {
    type: Number,
    default: 1,
  },
});

const emits = defineEmits(["update:value"]);

function updateValue(value: number) {
  emits("update:value", value);
}
</script>

<template>
  <div>
    <label for="Quantity" class="sr-only"> Quantity </label>
    <div class="flex w-full h-full items-center gap-1">
      <input
        type="number"
        id="Quantity"
        :max="10"
        :value="value"
        @input="updateValue($event.target.value)"
        class="bg-gray-200 h-full w-full text-center rounded-l-lg py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:border-gree appearance-none border-3 bordn-400"
      />
    </div>
  </div>
</template>

<style>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
