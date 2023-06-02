<script lang="ts" setup>
definePageMeta({
  layout: "page",
});

const route = useRoute();

const post = ref(null);

const { data } = await Fetch("/product/blogItem/" + route.params.slug, {
  method: "GET",
  params: {
    languageId: useCookie("dsLanguage"),
    storeId: useCookie("dsStore"),
  },
});

watch(data, (postDetail) => {
  post.value = postDetail.data;
});
</script>

<template>
  <Head>
    <Title>{{ post?.metaTitle }}</Title>
    <Meta name="description" :content="post?.metaDescription" />
  </Head>
  <PageHeader>
    <PageTitle></PageTitle>
  </PageHeader>
  <PageBody>
    <div class="container m-auto text-blue-900 my-10">
      <PageWrapper class="container mx-auto flex gap-15">
        <PageSection class="w-1/4">
          <PageBlogNavigation />
        </PageSection>
        <PageSection class="product__section__title w-3/4">
          <h1 class="font-800 text-34px">{{ post?.name }}</h1>
          <div class="mt-10" v-html="post?.description"></div>
        </PageSection>
      </PageWrapper>
    </div>
  </PageBody>
</template>
