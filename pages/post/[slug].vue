<script lang="ts" setup>
import axios from "axios";

definePageMeta({
  layout: "page",
});

const config = useRuntimeConfig().public;
const route = useRoute();

const { data: post } = await useAsyncData(
  route.params.slug.toString(),
  async () => {
    const categories = await axios.get(config.hostURL + "data/blog/blogs.json");
    const searchPost = await findSlugInData(
      categories.data,
      route.params.slug.toString()
    );
    return searchPost;
  }
);

function findSlugInData(data, slug) {
  let foundItem = null;
  data.forEach((item) => {
    if (Array.isArray(item.blogItems)) {
      for (let i = 0; i < item.blogItems.length; i++) {
        if (item.blogItems[i].slug === slug) {
          foundItem = item.blogItems[i];
          break;
        }
      }
    }
  });

  return foundItem;
}
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
