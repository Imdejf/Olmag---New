<script lang="ts" setup>
import axios from "axios";

definePageMeta({
  layout: "page",
});

const config = useRuntimeConfig().public;
const route = useRoute();

const post = ref(null);

const instance = axios.create({
  withCredentials: true,
  params: {
    storeId: useCookie("dsStore").value,
    languageId: useCookie("dsLanguage").value,
  },
});

const { data } = await useAsyncData("data", async () => {
  const res = await instance.get(
    config.apiBaseURL + "/product/blogItem/" + route.params.slug
  );
  post.value = data.data;
  return res.data;
});

// const { data } = await Fetch("/product/blogItem/" + route.params.slug, {
//   method: "GET",
//   params: {
//     languageId: useCookie("dsLanguage"),
//     storeId: useCookie("dsStore"),
//   },
// });

// watch(data, (postDetail) => {
//   post.value = postDetail.data;
// });
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
