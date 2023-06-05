<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  value: {
    type: Number,
    default: 1,
  },
  productId: {
    type: String,
  },
  updateQuantityProp: {
    type: Function,
    default: () => {},
  },
});
const emits = defineEmits(["update:value"]);

function updateValue(value: number) {
  props.updateQuantityProp(props.productId, value);
  emits("update:value", +value);
}

async function incrementValue() {
  updateValue(props.value + +1);
}

function decrementValue() {
  if (props.value > 1) {
    updateValue(props.value - +1);
  }
}
</script>
<template>
  <div>
    <label for="Quantity" class="sr-only"> Quantity </label>

    <div
      class="flex items-center rounded-lg border border-gray-200 divide-x divide-gray-200 rounded"
    >
      <button
        type="button"
        class="w-10 h-10 border-1 hover:bg-gray-100 active:bg-emerald-100 rounded-l-lg leading-10 text-gray-600 transition hover:opacity-75"
        @click="decrementValue"
      >
        &minus;
      </button>

      <span>
        <input
          type="number"
          id="Quantity"
          :value="value"
          class="h-10 w-16 border-transparent outline-0 text-center"
          @change="updateValue($event.target.value)"
        />
      </span>

      <button
        type="button"
        class="w-10 h-10 leading-10 hover:bg-gray-100 border-1 active:bg-emerald-100 rounded-r-lg text-gray-600 transition hover:opacity-75"
        @click="incrementValue"
      >
        &plus;
      </button>
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
