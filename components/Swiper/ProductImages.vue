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
  <div class="flex h-sm <sm:h-50 <sm:w-full flex-row-reverse">
    <Swiper
      :loop="true"
      :spaceBetween="10"
      :navigation="true"
      :thumbs="{ swiper: thumbsSwiper }"
      :modules="[
        SwiperPagination,
        SwiperThumbs,
        SwiperNavigation,
        SwiperFreeMode,
      ]"
      class="mySwiper2 swiper-product w-full"
    >
      <SwiperSlide v-for="image in images" :key="image"
        ><img :data-src="image.url" class="lazyload" alt="Skrzynia"
      /></SwiperSlide>
    </Swiper>
    <swiper
      @swiper="setThumbsSwiper"
      :loop="images.length >= 4 ? true : false"
      :spaceBetween="10"
      :slidesPerView="4"
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
      :freeMode="true"
      :direction="'vertical'"
      :watchSlidesProgress="true"
      :modules="[
        SwiperPagination,
        SwiperNavigation,
        SwiperThumbs,
        SwiperFreeMode,
      ]"
      class="mySwiper"
    >
      <SwiperSlide v-for="image in images" :key="image">
        <div class="slider__image">
          <img :data-src="image.url" class="lazyload !h-full" alt="Skrzynia" />
        </div>
      </SwiperSlide>
      <SwiperSlide v-for="image in images" :key="image">
        <div class="slider__image">
          <img :data-src="image.url" class="lazyload !h-full" alt="Skrzynia" />
        </div>
      </SwiperSlide>
      <SwiperSlide v-for="image in images" :key="image">
        <div class="slider__image">
          <img :data-src="image.url" class="lazyload !h-full" alt="Skrzynia" />
        </div>
      </SwiperSlide>
      <SwiperSlide v-for="image in images" :key="image">
        <div class="slider__image">
          <img :data-src="image.url" class="lazyload !h-full" alt="Skrzynia" />
        </div>
      </SwiperSlide>
      <SwiperSlide v-for="image in images" :key="image">
        <div class="slider__image">
          <img :data-src="image.url" class="lazyload !h-full" alt="Skrzynia" />
        </div>
      </SwiperSlide>
    </swiper>
  </div>
</template>
