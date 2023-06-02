<script lang="ts" setup>
import axios from "axios";

definePageMeta({
  layout: "page",
});

const config = useRuntimeConfig().public;

const allBlogs = ref(null);

const instance = axios.create({
  withCredentials: true,
  params: {
    storeId: useCookie("dsStore").value,
    languageId: useCookie("dsLanguage").value,
  },
});

const { data } = await useAsyncData("data", async () => {
  const res = await instance.get(config.apiBaseURL + "/product/blogCategory");
  console.log(res.data);
  allBlogs.value = res.data.data;
  return res.data;
});

watch(data, (newData) => {
  console.log(newData);
});
</script>

<template>
  <div class="rounded-xl border border-gray-100 bg-white p-4 w-full shadow-xl">
    <div class="p-5 font-600 text-blue-900">
      <ul>
        <li v-for="blog in allBlogs" :key="blog.blogCategoryId">
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
