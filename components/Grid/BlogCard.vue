<script lang="ts" setup>
import { BlogCategoryDTO } from "~/types/Blog/BlogTypes";

const config = useRuntimeConfig().public;

const { data: blogs } = await useAsyncData<BlogCategoryDTO>("blogs", () =>
  $fetch(config.apiBaseURL + "product/blogCategory", {
    method: "get",
    params: {
      languageId: config.languageId,
      storeId: config.storeId,
    },
  })
);
</script>

<template>
  <div class="py-section container mx-auto">
    <div>
      <h1 class="sr-only">Blog</h1>
    </div>
    <div>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-x-[30px] gap-y-[40px]">
        <div
          v-for="blog in blogs"
          :key="blog.blogCategoryId"
          class="max-w-2xl mx-auto w-full h-full"
        >
          <div
            class="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mx-auto"
          >
            <NuxtLink :to="'/blog/' + blog.slug">
              <img
                class="rounded-t-lg w-full h-60"
                :src="
                  blog.thumbnailImage.mediaLangs[0].filePath
                    ? blog.thumbnailImage?.mediaLangs[0].filePath
                    : blog.thumbnailImage.filePath
                "
                :alt="
                  blog.thumbnailImage.mediaLangs[0].altAttribute
                    ? blog.thumbnailImage?.mediaLangs[0].altAttribute
                    : blog.thumbnailImage?.altAttribute
                "
              />
            </NuxtLink>
            <div class="p-5">
              <NuxtLink :to="'/blog/' + blog.slug">
                <h4
                  class="text-emerald-500 font-bold text-2xl tracking-tight mb-2 dark:text-white"
                >
                  {{ blog.name }}
                </h4>
              </NuxtLink>
              <p
                class="font-normal text-gray-700 mb-3 dark:text-gray-400 h-20"
                v-html="blog.shortDescription"
              ></p>
              <NuxtLink
                :to="'/blog/' + blog.slug"
                class="text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Więcej...
                <svg
                  class="-mr-1 ml-2 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
