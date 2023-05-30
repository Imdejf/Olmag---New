<script lang="ts" setup>
import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
import { useApplication } from "./stores/application";

const application = useApplication();
</script>

<template>
  <Html lang="pl">
    <Body
      class="text-blue-900 font-nunito bg-gray-50"
      :class="`${application.topMenuIsOpen ? 'overflow-hidden' : ''}`"
    >
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>
