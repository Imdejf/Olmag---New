<script lang="ts" setup>
definePageMeta({
  layout: "page",
});
const config = useRuntimeConfig().public;

const allBlogs = ref(null);

const { data: blogsDetail } = await Fetch("/product/blogCategory", {
  method: "GET",
  params: {
    languageId: useCookie("dsLanguage"),
    storeId: useCookie("dsStore"),
  },
});

watch(blogsDetail, (blogs) => {
  allBlogs.value = blogs.data;
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
