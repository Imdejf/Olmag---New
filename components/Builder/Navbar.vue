<script lang="ts" setup>
import { useApplication } from "~/stores/application";
const application = useApplication();
</script>
<template>
  <section id="navbar-banner" class="header__banner">
    <slot name="banner" />
  </section>
  <div class="header__search sticky bg-white top-0" style="z-index: 99">
    <header
      id="navbar__middle"
      class="header__search sticky bg-white top-0"
      style="z-index: 99"
    >
      <slot name="search" />
    </header>
    <div class="flex absolute w-full items-center justify-center">
      <div
        class="w-full h-0 duration-300 ease-out transition-all bg-white px-5"
        :class="application.topMenuIsOpen ? '!h-[100vh] md:!h-80' : 'invisible'"
      >
        <button
          class="ml-[95%] text-gray-600"
          @click="application.changeTopMenu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 12L7 7m5 5l5 5m-5-5l5-5m-5 5l-5 5"
            />
          </svg>
        </button>
        <div class="inline">
          <DropDownNavbar
            class="duration-200 ease-out transition-all md:!h-64 overflow-auto"
            :class="application.topMenuIsOpen ? '' : 'opacity-0'"
          />
        </div>
      </div>
    </div>
  </div>
  <!-- <div id="navbar__bottom" class="header__menu">
    <slot name="menu" />
  </div> -->
</template>
