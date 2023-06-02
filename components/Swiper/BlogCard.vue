<script lang="ts" setup>
const props = defineProps({
  blogs: {
    type: Object,
    default: null,
  },
});
</script>
<template>
  <Swiper
    :modules="[SwiperNavigation, SwiperPagination]"
    :breakpoints="{
      '640': {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      '1024': {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    }"
    :pagination="{
      clickable: true,
    }"
    :navigation="true"
  >
    <SwiperSlide v-for="blog in blogs" :key="blog.id">
      <div class="mx-auto max-w-screen-xl">
        <div class="mt-8 h-sm">
          <article
            class="overflow-hidden rounded-lg border border-gray-100 shadow-sm"
          >
            <img
              :data-src="
                blog.thumbnailImage.mediaLangs[0].filePath
                  ? blog.thumbnailImage.mediaLangs[0].filePath
                  : blog.thumbnailImage.filePath
              "
              class="lazyload w-full h-[220px]"
              :alt="
                blog.thumbnailImage.mediaLangs[0].altAttribute
                  ? blog.thumbnailImage.mediaLangs[0].altAttribute
                  : blog.thumbnailImage.altAttribute
              "
            />

            <div class="md:p-4 p-6 bg-slate-300">
              <NuxtLink :to="'/post/' + blog.slug">
                <h3 class="text-lg font-medium text-gray-900">
                  {{ blog.name }}
                </h3>
              </NuxtLink>

              <div
                class="mt-2 card-text text-sm leading-relaxed text-gray-600 line-clamp-3"
                v-html="blog.shortDescription"
              ></div>

              <NuxtLink
                :to="'/post/' + blog.slug"
                class="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-900 text_line section_text"
              >
                Czytaj więcej...

                <span
                  aria-hidden="true"
                  class="block transition group-hover:translate-x-0.5"
                >
                  &rarr;
                </span>
              </NuxtLink>
            </div>
          </article>
        </div>
      </div>
    </SwiperSlide>
  </Swiper>
</template>
