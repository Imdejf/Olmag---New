<script lang="ts" setup>
// compiler macro
definePageMeta({
  layout: "page",
});
</script>

<template>
  <Head>
    <Title>Blog - Porady i wskazówki dla klientów - Olmag.pl</Title>
    <Meta
      name="description"
      content="Witamy w sekcji blogów olmag.pl. Zobacz jakie pomocne artykuły i wskazówki zawierają nasze poradniki dla klientów. Dowiedz się więcej."
    />
  </Head>
  <PageWrapper>
    <PageHeader>
      <PageTitle :textNav="[{ text: 'Blog', slug: 'blog' }]"> </PageTitle>
    </PageHeader>
    <PageBody>
      <PageSection>
        <div class="pb-5">
          <GridBlogCard />
        </div>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>
