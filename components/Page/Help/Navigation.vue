<template>
  <div class="rounded-xl border border-gray-100 bg-white p-4 w-full shadow-xl">
    <div class="p-5 font-600 text-blue-900">
      <ul>
        <li>
          <div>Regulamin sklepu</div>
          <ul class="font-400 text-15px my-2">
            <li class="mb-2 cursor-pointer hover:text-emerald-300">
              <NuxtLink to="/terms-of-use" title="Regulamin sklepu"
                >Regulamin</NuxtLink
              >
            </li>
          </ul>
        </li>
        <li class="mt-7">
          <div>Informajce przed zakupem</div>
          <ul class="font-400 text-15px my-2">
            <li class="mb-2 cursor-pointer hover:text-emerald-300">
              <NuxtLink to="/about-cookies" title="Informacja o cookies"
                >Informacja o cookies</NuxtLink
              >
            </li>
            <li class="mb-2 cursor-pointer hover:text-emerald-300">
              <NuxtLink to="/privacy-policy" title="Polityka prywatności"
                >Polityka prywatności</NuxtLink
              >
            </li>
            <li class="cursor-pointer hover:text-emerald-300">
              <a title="Jak działają opinie w naszym sklepie?"
                >Jak działają opinie w naszym sklepie?</a
              >
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
