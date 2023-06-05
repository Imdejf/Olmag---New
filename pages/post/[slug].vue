<script lang="ts" setup>
import axios from "axios";
import { BlogCategoryDTO } from "~/types/Blog/BlogTypes";

definePageMeta({
  layout: "page",
});

const config = useRuntimeConfig().public;
const route = useRoute();

const { data: post } = await useAsyncData<BlogCategoryDTO>(
  route.params.slug.toString(),
  () =>
    $fetch(config.apiBaseURL + "product/blogItem/" + route.params.slug, {
      method: "GET",
      params: {
        languageId: config.languageId,
      },
    })
);
</script>

<template>
  <Head>
    <Title>{{ post?.metaTitle }}</Title>
    <Meta name="description" :content="post?.metaDescription" />
  </Head>
  <PageHeader>
    <PageTitle
      :textNav="[
        { text: 'Blog', slug: '/blog' },
        {
          text: `${post?.name}`,
          slug: `${post?.slug}`,
        },
      ]"
    ></PageTitle>
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
