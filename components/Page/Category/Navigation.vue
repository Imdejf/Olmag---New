<script lang="ts" setup>
import { Category } from "~/types/Category/categoryTypes";

const config = useRuntimeConfig().public;

const { data: categories } = await useAsyncData<Category | []>(
  "categories",
  () => $fetch(config.hostURL + "data/category/categories.json")
);
</script>

<template>
  <div class="rounded-xl border border-gray-100 bg-white p-4 w-full shadow-xl">
    <div class="p-5 font-600 text-blue-900">
      <ul>
        <li v-for="category in categories" :key="category.categoryId">
          <NuxtLink :to="category.slug">
            {{ category.name }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>
