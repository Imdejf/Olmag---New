<script lang="ts" setup>
import { useApplication } from "~/stores/application";

const application = useApplication();
</script>

<template>
  <BuilderNavbar>
    <template #banner>
      <div class="navbar__banner bg-blue-900">
        <div class="container mx-auto <md:px`-2">
          <div class="flex relative justify-between">
            <div class="flex relative w-1/3 h-10">
              <div
                class="h-full absolute w-full top-10 right-0 transform -rotate-45 origin-top-left bg-green-600"
              ></div>
            </div>
            <div
              class="w-2/3 relative self-center md:w-1/3 text-center text-[#78BE20]"
            >
              <div class="w-full text-[9px] md:text-base">
                <span>Witamy w Olmag - wyposażenie do magazynu</span>
              </div>
            </div>
            <div class="flex w-1/3 right-0 justify-end relative">
              <div
                class="h-full absolute w-full top-10 right-0 transform rotate-45 origin-top-right bg-green-600"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #search>
      <nav class="bg-white md:mx-14 xl:mx-auto xl:container my-5">
        <div class="flex items-center justify-between">
          <button @click="application.changeTopMenu" class="hidden md:block">
            <img
              data-src="icons/menu.svg"
              alt="Ikona kategorii"
              data-sizes="auto"
              class="lazyload mx-auto w-[40px] h-[40px]"
            />
            <span class="tracking-1px font-bold uppercase">Kategorie</span>
          </button>
          <a href="/" class="md:block md:mx-8">
            <img
              data-src="assets/logo.webp"
              data-sizes="auto"
              class="lazyload hidden md:block md:w-[240px] md:h-[70px]"
              alt="Logo Olmag.pl"
            />
            <img
              data-src="assets/logo-mobile.webp"
              class="lazyload block md:hidden w-[240px] h-[50px]"
              alt="Logo Olmag.pl"
            />
          </a>

          <div
            class="w-full px-1 h-9 md:h-full max-w-[250px] md:max-w-md xl:max-w-3xl relative flex"
          >
            <span class="absolute left-4 top-3 text-lg text-gray-400">
              <i class="fa-solid fa-magnifying-glass"></i>
            </span>
            <input
              type="text"
              name="search"
              id="search"
              class="w-full border border-primary border-r-0 pl-4 md:pl-12 py-3 pr-3 rounded-l-md focus:outline-none md:flex"
              placeholder="Szukaj..."
            />
            <button
              class="bg-primary border bg-green-200 border-primary text-white px-4 md:px-8 rounded-r-md hover:text-primary transition md:flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                class="m-auto"
              >
                <path
                  fill="currentColor"
                  d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5l-1.5 1.5l-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14S14 12 14 9.5S12 5 9.5 5Z"
                />
              </svg>
            </button>
          </div>

          <div
            class="items-center py-3 md:py-1 font-medium text-sm md:text-[9px] justify-center space-x-4 bottom-0 bg-gray-100 md:bg-white w-full fixed md:relative flex gap-4 md:justify-end md:w-fit"
          >
            <button
              @click="application.changeTopMenu"
              class="md:hidden text-center text-gray-700 hover:text-primary transition relative"
            >
              <img
                data-src="/icons/menu.svg"
                width="23"
                height="23"
                alt="Ikona kategorii"
                class="mx-auto"
              />
              <div class="text-[9.5px] font-semibold leading-3 uppercase">
                Kategorie
              </div>
            </button>
            <a
              href="#"
              class="text-center text-gray-700 hover:text-primary transition relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                class="h-6 mx-auto"
              >
                <path
                  fill="currentColor"
                  d="M15 12h2c0-2.76-2.24-5-5-5v2c1.66 0 3 1.34 3 3zm4 0h2a9 9 0 0 0-9-9v2c3.87 0 7 3.13 7 7zm1 3.5c-1.25 0-2.45-.2-3.57-.57c-.1-.03-.21-.05-.31-.05c-.26 0-.51.1-.71.29l-2.2 2.2a15.045 15.045 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1c0 9.39 7.61 17 17 17c.55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM5.03 5h1.5c.07.88.22 1.75.45 2.58l-1.2 1.21c-.4-1.21-.66-2.47-.75-3.79zM19 18.97c-1.32-.09-2.6-.35-3.8-.76l1.2-1.2c.85.24 1.72.39 2.6.45v1.51z"
                />
              </svg>
              <div class="text-[9.5px] font-semibold leading-3 uppercase">
                Kontakt
              </div>
            </a>
            <a
              href="#"
              class="text-center text-gray-700 hover:text-primary transition relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                class="h-6 mx-auto"
              >
                <path
                  fill="currentColor"
                  d="M8.5 19a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 8.5 19ZM19 16H7a1 1 0 0 1 0-2h8.491a3.013 3.013 0 0 0 2.885-2.176l1.585-5.55A1 1 0 0 0 19 5H6.74a3.007 3.007 0 0 0-2.82-2H3a1 1 0 0 0 0 2h.921a1.005 1.005 0 0 1 .962.725l.155.545v.005l1.641 5.742A3 3 0 0 0 7 18h12a1 1 0 0 0 0-2Zm-1.326-9l-1.22 4.274a1.005 1.005 0 0 1-.963.726H8.754l-.255-.892L7.326 7ZM16.5 19a1.5 1.5 0 1 0 1.5 1.5a1.5 1.5 0 0 0-1.5-1.5Z"
                />
              </svg>
              <div class="text-[9.5px] font-semibold leading-3 uppercase">
                Koszyk
              </div>
              <div
                class="absolute bg-green-400 -right-0 -top-2 w-4 h-4 rounded-full flex items-center justify-center text-white text-xs"
              >
                2
              </div>
            </a>
            <a
              href="#"
              class="text-center text-gray-700 hover:text-primary transition relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                class="h-6 mx-auto"
              >
                <g fill="none" fill-rule="evenodd">
                  <path
                    d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 13c2.396 0 4.575.694 6.178 1.671c.8.49 1.484 1.065 1.978 1.69c.486.616.844 1.352.844 2.139c0 .845-.411 1.511-1.003 1.986c-.56.45-1.299.748-2.084.956c-1.578.417-3.684.558-5.913.558s-4.335-.14-5.913-.558c-.785-.208-1.524-.506-2.084-.956C3.41 20.01 3 19.345 3 18.5c0-.787.358-1.523.844-2.139c.494-.625 1.177-1.2 1.978-1.69C7.425 13.694 9.605 13 12 13Zm0 2c-2.023 0-3.843.59-5.136 1.379c-.647.394-1.135.822-1.45 1.222c-.324.41-.414.72-.414.899c0 .122.037.251.255.426c.249.2.682.407 1.344.582C7.917 19.858 9.811 20 12 20c2.19 0 4.083-.143 5.4-.492c.663-.175 1.096-.382 1.345-.582c.218-.175.255-.304.255-.426c0-.18-.09-.489-.413-.899c-.316-.4-.804-.828-1.451-1.222C15.843 15.589 14.023 15 12 15Zm0-13a5 5 0 1 1 0 10a5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6a3 3 0 0 0 0-6Z"
                  />
                </g>
              </svg>
              <div class="text-[9.5px] font-semibold leading-3 uppercase">
                Zaloguj
              </div>
            </a>
          </div>
        </div>
      </nav>
    </template>
  </BuilderNavbar>
</template>
