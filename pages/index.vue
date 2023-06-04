<script lang="ts" setup>
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import axios from "axios";
// compiler macro
definePageMeta({
  layout: "page",
});

const config = useRuntimeConfig().public;
const $gtm = useGTM();

$gtm.enable();

const { data: mountains } = await useAsyncData("mountains", () =>
  $fetch("https://api.nuxtjs.dev/mountains")
);

const { data: mountainsTest } = await useAsyncData("mountainss", () =>
  $fetch(config.apiBaseURL + "product/blogCategory/test", {
    params: {
      storeId: useCookie("dsStore").value,
      languageId: useCookie("dsLanguage").value,
    },
  })
);

console.log(mountainsTest);
console.log(mountains);

// const { data: categories } = await Fetch("product/category", {
//   params: {
//     storeId: useCookie("dsStore").value,
//     languageId: useCookie("dsLanguage").value,
//   },
// });

// const { data: products } = await Fetch("product/HeighlightProduct", {
//   params: {
//     storeId: useCookie("dsStore").value,
//     languageId: useCookie("dsLanguage").value,
//   },
// });

// const { data: blogs } = await Fetch("product/blogCategory", {
//   params: {
//     storeId: useCookie("dsStore").value,
//     languageId: useCookie("dsLanguage").value,
//   },
// });

async function test() {
  // var test = await Fetch("checkSession");
  await axios.get(config.apiBaseURL + "checkSession", {
    headers: {
      "Content-Type": "application/json",
      // Cookie: `dsStore=${config.storeId}; dsLanguage=${config.languageId}`,
    },
    withCredentials: true,
  });
  console.log("test");
  console.log(test);
}

const products = [];
const blogs = [];
const categories = [];

useHead({
  link: [
    {
      rel: "preload",
      href: "/assets/tlo.webp",
      fetchpriority: "high",
      as: "image",
      type: "image/webp",
    },
    {
      rel: "preload",
      href: "/assets/tlo-moblie.webp",
      fetchpriority: "high",
      as: "image",
      type: "image/webp",
    },
  ],
});
</script>

<template>
  <PageWrapper>
    <PageBody>
      <PageSection class="section__welcome">
        <button @click="test">tests</button>
        <div class="relative bg-cover bg-no-repeat bg-center h-full">
          <img
            data-src="assets/tlo.webp"
            class="lazyload hidden md:block absolute w-full h-full"
          />
          <img
            data-src="assets/tlo-moblie.webp"
            class="lazyload blur-up md:hidden block absolute h-full"
          />
          <div class="relative">
            <h1 class="font-base text-center text-md">
              Olmag.pl - wyposażenie magazynu
            </h1>
            <div class="container mx-auto py-4 md:py-24">
              <h2
                class="text-lg md:text-6xl text-center font-bold md:font-medium mb-4 capitalize"
              >
                Sprawdź Naszą Ofertę Na Pojemniki Magazynowe I Drabiny
                Aluminiowe
              </h2>
              <div class="md:mt-12 flex">
                <div class="mx-auto md:flex text-center md:w-auto gap-10">
                  <NuxtLink
                    to="/category/pojemniki-magazynowe"
                    class="bg-blue-900 block md:mt-0 hover:bg-opacity-80 text-orange-500 font-semibold md:font-bold p-2.5 md:p-4 rounded-full"
                  >
                    POJEMNIKI MAGAZYNOWE
                  </NuxtLink>
                  <NuxtLink
                    to="/category/drabiny-aluminiowe"
                    class="bg-blue-900 block mt-3 md:mt-0 hover:bg-opacity-80 text-orange-500 font-semibold md:font-bold p-2.5 md:p-4 rounded-full"
                  >
                    DRABINY ALUMINIOWE
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageSection>
      <PageSection class="section__entry">
        <div class="bg-blue-900">
          <div class="flex">
            <div
              class="hidden md:block md:p-3 md:w-1/4 text-emerald-400 w-1/3 p-1"
            >
              <div class="p-4 px-0 flex">
                <div class="flex mx-auto">
                  <div class="mr-1 md:mr-3 self-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="32"
                      viewBox="0 0 640 512"
                      class="w-6 md:w-7"
                    >
                      <path
                        fill="currentColor"
                        d="M112 0C85.5 0 64 21.5 64 48v48H16c-8.8 0-16 7.2-16 16s7.2 16 16 16h256c8.8 0 16 7.2 16 16s-7.2 16-16 16H48c-8.8 0-16 7.2-16 16s7.2 16 16 16h192c8.8 0 16 7.2 16 16s-7.2 16-16 16H16c-8.8 0-16 7.2-16 16s7.2 16 16 16h192c8.8 0 16 7.2 16 16s-7.2 16-16 16H64v128c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H112zm432 237.3V256H416v-96h50.7l77.3 77.3zM160 368a48 48 0 1 1 0 96a48 48 0 1 1 0-96zm272 48a48 48 0 1 1 96 0a48 48 0 1 1-96 0z"
                      />
                    </svg>
                  </div>
                  <div class="block">
                    <span class="self-center text-[9px] md:text-sm w-full"
                      >Szybkie dostawy</span
                    >
                    <span
                      class="block text-13px text-[9.5px] md:text-xs text-center text-gray-400"
                      >Najlepsi przewoźnicy</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="md:p-3 md:w-1/4 text-emerald-400 w-1/3 p-1">
              <div class="p-4 px-0 flex">
                <div class="flex mx-auto">
                  <div class="mr-1 md:mr-3 self-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 256 256"
                      class="w-6 md:w-7"
                    >
                      <path
                        fill="currentColor"
                        d="M119.76 217.94A8 8 0 0 1 112 224a8.13 8.13 0 0 1-2-.24l-32-8a8 8 0 0 1-2.5-1.11l-24-16a8 8 0 1 1 8.88-13.31l22.84 15.23l30.66 7.67a8 8 0 0 1 5.88 9.7Zm132.69-96.46a15.89 15.89 0 0 1-8 9.25l-23.68 11.84l-15.08 15.09l-40 40a8 8 0 0 1-7.6 2.1l-64-16a8.06 8.06 0 0 1-2.71-1.25l-55.52-39.64l-24.28-12.14a16 16 0 0 1-7.16-21.46l24.85-49.69a16 16 0 0 1 21.46-7.16l22.06 11l53-15.14a8 8 0 0 1 4.4 0l53 15.14l22.06-11a16 16 0 0 1 21.46 7.16l24.85 49.69a15.9 15.9 0 0 1 .89 12.21ZM188 152.66l-27.71-22.19c-19.54 16-44.35 18.11-64.91 5a16 16 0 0 1-2.72-24.82a.6.6 0 0 1 .08-.08l44.86-43.51l-9.6-2.74l-50.42 14.41l-27.37 54.73l49.2 35.15l58.14 14.53Zm18.24-18.24L179.06 80h-31.82L104 122c12.66 8.09 32.51 10.32 50.32-7.63a8 8 0 0 1 10.68-.61l34.41 27.57Z"
                      />
                    </svg>
                  </div>
                  <div class="block">
                    <span class="self-center text-[10px] md:text-sm w-full"
                      >Negocjacje cen</span
                    >
                    <span
                      class="block text-13px text-[9.5px] md:text-xs text-center text-gray-400"
                      >Indywidualna wycena</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="md:p-3 md:w-1/4 text-emerald-400 w-1/3 p-1">
              <div class="p-4 px-0 flex">
                <div class="flex mx-auto">
                  <div class="mr-1 md:mr-3 self-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      class="w-6 md:w-7"
                    >
                      <g fill="none" stroke="currentColor">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          d="M6 9h4"
                          opacity=".5"
                        />
                        <path
                          stroke-width="1.5"
                          d="M20.833 10h-2.602C16.446 10 15 11.343 15 13s1.447 3 3.23 3h2.603c.084 0 .125 0 .16-.002c.54-.033.97-.432 1.005-.933c.002-.032.002-.071.002-.148v-3.834c0-.077 0-.116-.002-.148c-.036-.501-.465-.9-1.005-.933c-.035-.002-.076-.002-.16-.002Z"
                        />
                        <path
                          stroke-width="1.5"
                          d="M20.965 10c-.078-1.872-.328-3.02-1.137-3.828C18.657 5 16.771 5 13 5h-3C6.229 5 4.343 5 3.172 6.172C2 7.343 2 9.229 2 13c0 3.771 0 5.657 1.172 6.828C4.343 21 6.229 21 10 21h3c3.771 0 5.657 0 6.828-1.172c.809-.808 1.06-1.956 1.137-3.828"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-width="1.5"
                          d="m6 5l3.735-2.477a3.237 3.237 0 0 1 3.53 0L17 5"
                          opacity=".5"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17.991 13H18"
                          opacity=".5"
                        />
                      </g>
                    </svg>
                  </div>
                  <div class="block">
                    <span class="self-center text-[11px] md:text-sm w-full"
                      >Duże oszczędności</span
                    >
                    <span
                      class="block text-13px text-[9.5px] md:text-xs text-center text-gray-400"
                      >Niskie ceny</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="md:p-3 md:w-1/4 text-emerald-400 w-1/3 p-1">
              <div class="p-4 px-0 flex">
                <div class="flex mx-auto">
                  <div class="mr-1 md:mr-3 self-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 14 14"
                      class="w-6 md:w-7"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          d="M6 10.08v2a.29.29 0 0 1-.29.28h-2.1a1.45 1.45 0 0 1-.88-.51"
                        />
                        <path
                          d="M2.73 11.86s-1.09-.95 1.44-3.48H5.3L3.61 5.59H.5l.85 1.09s-.57.1-.57.89a10 10 0 0 0 1.95 4.29Zm7.62-5.49l1.48-1a.26.26 0 0 1 .21 0a.26.26 0 0 1 .19.12l1.15 1.72a1 1 0 0 1 0 .89"
                        />
                        <path
                          d="M13.42 8s-.32 1.3-3.63 1v-.87l-1.94 2.54l1.84 2.83l.1-1.33s.37.45 1 0A18.73 18.73 0 0 0 13.42 8ZM4.35 4.28L3 3.66a.3.3 0 0 1-.14-.38L4 1a1 1 0 0 1 .74-.5m0 0s1.23 0 2.79 3l-.81 1h3.36l1.19-3.14l-1.4.43a1.21 1.21 0 0 0-.73-1A5.87 5.87 0 0 0 7 .5Z"
                        />
                      </g>
                    </svg>
                  </div>
                  <div class="block">
                    <span class="self-center text-[11px] md:text-sm w-full"
                      >Łatwe zwroty</span
                    >
                    <span
                      class="block text-13px text-[9.5px] md:text-xs text-center text-gray-400"
                      >Zadzwoń do nas</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageSection>
      <PageSection class="section__most_view_category container mx-auto mt-8">
        <div class="px-2 md:px-0">
          <div class="tracking-1px font-semibold text-2xl">
            <div class="flex">
              <h2 class="distinction__title mx-auto">Najczęściej odwiedzane</h2>
            </div>
            <div>
              {{ mountainsTest }}
              <br />
              ODDZIEL
              <br />
              <!-- {{ mountains }} -->
              <GridCategoryMostView
                :categories="categories.filter((c) => c.mostVisited === true)"
              />
            </div>
          </div>
        </div>
      </PageSection>
      <PageSection>
        <div class="relative bg-slate-300 w-full">
          <div class="grid md:flex">
            <svg
              class="absolute md:relative max-w-md -ml-64"
              viewBox="0 0 423 423"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <defs>
                <linearGradient
                  x1="100%"
                  y1="0%"
                  x2="4.48%"
                  y2="0%"
                  id="linearGradient-1"
                >
                  <stop stop-color="#6ee7b7" offset="0%"></stop>
                  <stop stop-color="#10b981" offset="100%"></stop>
                </linearGradient>
                <filter
                  x="-9.3%"
                  y="-6.7%"
                  width="118.7%"
                  height="118.7%"
                  filterUnits="objectBoundingBox"
                  id="filter-3"
                >
                  <feOffset
                    dy="8"
                    in="SourceAlpha"
                    result="shadowOffsetOuter1"
                  ></feOffset>
                  <feGaussianBlur
                    stdDeviation="8"
                    in="shadowOffsetOuter1"
                    result="shadowBlurOuter1"
                  ></feGaussianBlur>
                  <feColorMatrix
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                    in="shadowBlurOuter1"
                  ></feColorMatrix>
                </filter>
                <rect
                  id="path-2"
                  x="63"
                  y="504"
                  width="300"
                  height="300"
                  rx="40"
                ></rect>
              </defs>
              <g
                id="Page-1"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
                opacity=".9"
              >
                <g id="Desktop-HD" transform="translate(-39 -531)">
                  <g id="Hero" transform="translate(43 83)">
                    <g id="Rectangle-6" transform="rotate(45 213 654)">
                      <use
                        fill="#000"
                        filter="url(#filter-3)"
                        xlink:href="#path-2"
                      ></use>
                      <use
                        fill="url(#linearGradient-1)"
                        xlink:href="#path-2"
                      ></use>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            <div
              class="md:mt-[180px] text-center w-full relative my-10 md:my-0"
            >
              <h1
                class="text-gray-900 z-40 font-black w-full text-3xl sm:text-3xl leading-tight relative mb-4 xl:mb-8"
              >
                Potrzebujesz pomocy lub wyceny?
              </h1>
              <p
                class="text-lg sm:text-xl z-40 w-full xl:text-xl text-gray-600 mb-8 pr-0"
              >
                Skontaktuj się z nami
              </p>
              <NuxtLink
                to="/contact"
                class="hover:cursor-pointer hover:opacity-[0.5] px-8 py-4 bg-blue-900 text-orange-500 rounded-xl font-semibold text-base"
              >
                <span class="uppercase">Kontakt</span>
              </NuxtLink>
            </div>
            <div class="-mr-64 w-full h-36 md:h-auto relative flex">
              <img
                data-src="assets/content/macbook-emagazynowo.webp"
                class="lazyload hidden md:flex float-right w-[380px] h-[240px] md:h-[390px] md:w-[580px] m-auto"
              />
            </div>
          </div>
        </div>
      </PageSection>
      <PageSection class="section__category_awarded container mx-auto mt-8">
        <div class="px-2 md:px-0">
          <div class="tracking-1px font-semibold text-2xl">
            <div class="flex">
              <h2 class="distinction__title mx-auto">Wyróżnione kategorie</h2>
            </div>
            <div>
              <LazyGridCategoryAwarded
                :categories="categories.filter((c) => c.highlight === true)"
              />
            </div>
          </div>
        </div>
      </PageSection>
      <PageSection class="section__category_awarded bg-slate-300 mt-8 py-5">
        <div class="px-2 md:px-0">
          <div class="tracking-1px font-semibold text-2xl">
            <div class="flex">
              <h2 class="distinction__title mx-auto">Bestsellery</h2>
            </div>
            <div class="container mx-auto">
              <LazyGridProductBestseller
                :products="products.filter((c) => c.isBestseller === true)"
              />
            </div>
          </div>
        </div>
      </PageSection>
      <PageSection class="section__category_awarded my-8">
        <div class="px-2 md:px-0">
          <div class="tracking-1px font-semibold text-2xl">
            <div class="flex">
              <h2 class="distinction__title mx-auto">Polecamy</h2>
            </div>
            <div class="container mx-auto">
              <LazyGridProductRecommended
                :products="products.filter((c) => c.isHomePage === true)"
              />
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection class="section__blogs mt-8 pb-8 bg-white">
        <div class="px-2 md:px-0">
          <div class="tracking-1px font-semibold text-2xl">
            <div class="text-center font-bold mt-10">
              <span class="text-sm section-title uppercase text-gray-500">
                Zobacz również...
              </span>
            </div>
            <div class="flex">
              <h2 class="distinction__title mx-auto">Blog magazynowy</h2>
            </div>
            <div class="mx-auto mx-10">
              <SwiperBlogCard :blogs="blogs" />
            </div>
          </div>
        </div>
      </PageSection>
      <PageSection class="section__about-compnay bg-slate-200">
        <div class="container m-auto">
          <FormPageAbout />
        </div>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>

<style>
.blur-up {
  -webkit-filter: blur(5px);
  filter: blur(5px);
  transition: filter 400ms, -webkit-filter 400ms;
}

.blur-up.lazyloaded {
  -webkit-filter: blur(0);
  filter: blur(0);
}

.diagonal-split-background {
  background-color: #013a6b;
  background-image: -webkit-linear-gradient(-55deg, black 50%, #2bd483 50%);
}

.distinction__title {
  position: relative;
  color: #00263a;
  border-bottom: 2px solid rgb(110, 231, 183);
  padding-bottom: 5px;
}
</style>
