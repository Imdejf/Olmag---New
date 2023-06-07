<script lang="ts" setup>
import axios from "axios";
import { BlogCategoryDTO } from "~/types/Blog/BlogTypes";

definePageMeta({
  layout: "page",
});

const config = useRuntimeConfig().public;

const { data: blogs } = await useAsyncData<BlogCategoryDTO | []>(
  "categories",
  () => $fetch(config.hostURL + "data/blog/blogs.json")
);
</script>

<template>
  <div class="rounded-xl border border-gray-100 bg-white p-4 w-full shadow-xl">
    <div class="p-5 font-600 text-blue-900">
      <ul>
        <li v-for="blog in blogs" :key="blog.blogCategoryId">
          <ul class="font-400 text-15px my-3">
            <li class="mb-2 cursor-pointer hover:text-emerald-300">
              <NuxtLink :to="'/blog/' + blog.slug" :title="blog.metaTitle">{{
                blog.name
              }}</NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
