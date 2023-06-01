<script lang="ts" setup>
definePageMeta({
  layout: "page",
});
const config = useRuntimeConfig().public;

const allBlogs = ref(null);

const url =
  config.apiBaseURL +
  "product/blogCategory/" +
  "?languageId=" +
  useCookie("dsLanguage").value +
  "&" +
  useCookie("dsLanguage").value;

console.log(url);

const { data: postDetail } = await useAsyncData("slug", () => $fetch(url));

allBlogs.value = postDetail.value.data;
console.log("je");
console.log(allBlogs);
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
