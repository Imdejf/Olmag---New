<script lang="ts" setup>
// compiler macro
definePageMeta({
  layout: "page",
});
</script>

<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle :textNav="[{ text: 'Blog', slug: 'blog' }]"> </PageTitle>
    </PageHeader>
    <PageBody>
      <PageSection>
        <div class="pb-5">
          <LazyGridBlogCard />
        </div>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>
