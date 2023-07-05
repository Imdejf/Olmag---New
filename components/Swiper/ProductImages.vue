<script lang="ts" setup>
const thumbsSwiper = ref(null);
const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
});

const setThumbsSwiper = (swiper: Swiper) => {
  thumbsSwiper.value = swiper;
};
</script>
>

<template>
  <div class="md:flex md:flex-row-reverse">
    <Swiper
      :loop="true"
      :navigation="true"
      :thumbs="{ swiper: thumbsSwiper }"
      :centeredSlides="true"
      :slidesPerView="'auto'"
      :modules="[
        SwiperPagination,
        SwiperThumbs,
        SwiperNavigation,
        SwiperFreeMode,
      ]"
      class="h-[200px] md:h-[300px]"
    >
      <SwiperSlide v-for="image in images" :key="image"
        ><img :data-src="image.url" class="lazyload w-[50%]" alt="Skrzynia"
      /></SwiperSlide>
    </Swiper>
    <Swiper
      @swiper="setThumbsSwiper"
      :spaceBetween="10"
      :slidesPerView="4"
      :loop="images.length >= 4 ? true : false"
      :freeMode="false"
      :direction="'vertical'"
      :breakpoints="{
        '640': {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        '1024': {
          slidesPerView: 5,
          spaceBetween: 10,
        },
      }"
      :modules="[
        SwiperPagination,
        SwiperNavigation,
        SwiperThumbs,
        SwiperFreeMode,
      ]"
      class="swiper_image_vertical h-[150px] md:h-[300px] w-[250px] !hidden md:!block"
    >
      <SwiperSlide v-for="image in images" :key="image"
        ><img :data-src="image.url" class="lazyload" alt="Skrzynia"
      /></SwiperSlide>
    </Swiper>
    <Swiper
      @swiper="setThumbsSwiper"
      :spaceBetween="10"
      :slidesPerView="4"
      :loop="images.length >= 4 ? true : false"
      :freeMode="false"
      :direction="'horizontal'"
      :breakpoints="{
        '640': {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        '1024': {
          slidesPerView: 5,
          spaceBetween: 10,
        },
      }"
      :modules="[
        SwiperPagination,
        SwiperNavigation,
        SwiperThumbs,
        SwiperFreeMode,
      ]"
      class="swiper_image_vertical my-5 h-[80px] w-[300px] md:!hidden"
    >
      <SwiperSlide v-for="image in images" :key="image"
        ><img :data-src="image.url" class="lazyload" alt="Skrzynia"
      /></SwiperSlide>
    </Swiper>
  </div>
</template>

<style>
.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 24px;
}

.swiper_image_vertical .swiper-slide {
  opacity: 0.5;
}

.swiper_image_vertical .swiper-slide-thumb-active {
  opacity: 1;
  border-radius: 10px;
  border: 2px solid #6ee7b7 !important;
}
</style>
