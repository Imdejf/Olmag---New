<script lang="ts" setup></script>

<template>
  <div class="flex container mx-auto w-full">
    <div class="justify-center w-full flex m-auto">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6 md:w-10 md:h-10 text-emerald-400"
        viewBox="0 0 1024 1024"
      >
        <path
          fill="currentColor"
          d="M866.9 169.9L527.1 54.1C523 52.7 517.5 52 512 52s-11 .7-15.1 2.1L157.1 169.9c-8.3 2.8-15.1 12.4-15.1 21.2v482.4c0 8.8 5.7 20.4 12.6 25.9L499.3 968c3.5 2.7 8 4.1 12.6 4.1s9.2-1.4 12.6-4.1l344.7-268.6c6.9-5.4 12.6-17 12.6-25.9V191.1c.2-8.8-6.6-18.3-14.9-21.2zM694.5 340.7L481.9 633.4a16.1 16.1 0 0 1-26 0l-126.4-174c-3.8-5.3 0-12.7 6.5-12.7h55.2c5.1 0 10 2.5 13 6.6l64.7 89l150.9-207.8c3-4.1 7.8-6.6 13-6.6H688c6.5.1 10.3 7.5 6.5 12.8z"
        />
      </svg>
      <span
        class="uppercase font-extrabold text-blue-900 text-[9px] md:text-xl self-center"
        >bezpieczne zakupy</span
      >
    </div>
    <div class="justify-center w-full">
      <NuxtLink to="/">
        <img
          data-src="/assets/logo.webp"
          data-sizes="auto"
          class="lazyload mx-auto hidden md:block md:w-[270px] md:h-[90px]"
          alt="Logo Olmag.pl"
        />
        <img
          data-src="/assets/logo-mobile.webp"
          class="lazyload block md:hidden"
          height="100"
          width="280"
          alt="Logo Olmag.pl"
        />
      </NuxtLink>
    </div>
    <div class="justify-center w-full flex m-auto">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6 md:w-10 md:h-10 text-emerald-400"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M20 2H4v2l5.81 4.36a7.004 7.004 0 0 0-4.46 8.84a6.996 6.996 0 0 0 8.84 4.46a7 7 0 0 0 0-13.3L20 4V2m-5.06 17.5L12 17.78L9.06 19.5l.78-3.33l-2.59-2.24l3.41-.29L12 10.5l1.34 3.14l3.41.29l-2.59 2.24l.78 3.33Z"
        />
      </svg>
      <span
        class="uppercase font-extrabold text-blue-900 text-[9px] md:text-xl self-center"
        >najlepsza obsługa</span
      >
    </div>
  </div>
  <slot></slot>
</template>
