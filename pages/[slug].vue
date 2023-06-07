<script lang="ts" setup>
import { ProductDetailDTO } from "~/types/Product/productDetailTypes";
import { ProductAvailability } from "~/types/Product/productTypes";
import { useCart } from "~/stores/cart";
import { useApplication } from "~/stores/application";
import axios from "axios";

definePageMeta({
  layout: "page",
});
const route = useRoute();
const config = useRuntimeConfig().public;

const { data: product } = await useAsyncData(
  route.params.slug.toString(),
  async () => {
    const products = await axios.get(
      config.hostURL + "data/product/products.json"
    );

    console.log(products);

    const getProduct = products.data.find(
      (item) => item.slug === route.params.slug.toString()
    );

    console.log(getProduct);
    return getProduct;
  }
);

console.log(product);

const selectedValue = ref([]);
const cart = useCart();
const productQuantity = ref(1);
const application = useApplication();

function getProductAvailabilityDescription(
  availability: ProductAvailability
): string {
  switch (availability) {
    case ProductAvailability.Available:
      return "Dostępny";
    case ProductAvailability.SellerConfirmation:
      return "Potwierdzenie sprzedawcy";
    case ProductAvailability.ThreeToSevenDays:
      return "3-7 dni";
    case ProductAvailability.ThreeToTenDays:
      return "3-10 dni";
    case ProductAvailability.TwoWeeks:
      return "2 tygodnie";
    case ProductAvailability.ThreeWeeks:
      return "3 tygodnie";
    case ProductAvailability.ThreeToFiveWeeks:
      return "3-5 tygodni";
    case ProductAvailability.TemporarilyUnavailable:
      return "Tymczasowo niedostępny";
    case ProductAvailability.ToOrder:
      return "Do zamówienia";
    default:
      throw new Error(`Potwierdzenie sprzedawcy`);
  }
}
const unselectedOptions = ref([]);

function findVariant() {
  return product.value.variations.find((variant) => {
    const matchingOptions = selectedValue.value.every((selectedOption) => {
      const option = variant.options.find(
        (option) => option.optionId === selectedOption.optionId
      );
      return option && option.value === selectedOption.value;
    });
    return matchingOptions;
  });
}

const currentProduct = ref(null);

const handleButtonClick = () => {
  if (
    product.value.availableOptions != null &&
    product.value.availableOptions.length != 0
  ) {
    const selectedOptionIds = selectedValue.value.map(
      (option) => option.optionId
    );
    const availableOptionIds = product.value.availableOptions.map(
      (option) => option.optionId
    );
    const isOptionSelected = availableOptionIds.every((id) =>
      selectedOptionIds.includes(id)
    );

    if (isOptionSelected) {
      currentProduct.value = findVariant();
      addToCart();
    } else {
      unselectedOptions.value = product.value.availableOptions.filter(
        (option) => {
          return !selectedValue.value.some(
            (selectedOption) => selectedOption.optionId === option.optionId
          );
        }
      );
    }
  } else {
    currentProduct.value = product.value;
    addToCart();
  }
};

const setUpdateValue = (value) => {
  console.log(product);
  const index = selectedValue.value.findIndex(
    (item) => item.optionId === value.optionId
  );

  if (index !== -1) {
    selectedValue.value[index] = value;
  } else {
    if (
      unselectedOptions.value.some(
        (unselectedOption) => unselectedOption.optionId === value.optionId
      )
    ) {
      unselectedOptions.value = unselectedOptions.value.filter(
        (unselectedOption) => unselectedOption.optionId !== value.optionId
      );
    }
    selectedValue.value.push(value);
  }

  if (
    product.value.availableOptions != null &&
    product.value.availableOptions.length != 0
  ) {
    const selectedOptionIds = selectedValue.value.map(
      (option) => option.optionId
    );
    const availableOptionIds = product.value.availableOptions.map(
      (option) => option.optionId
    );
    const isOptionSelected = availableOptionIds.every((id) =>
      selectedOptionIds.includes(id)
    );

    if (isOptionSelected) {
      currentProduct.value = findVariant();
      product.value.price = currentProduct.value.price;
      product.value.oldPrice = currentProduct.value.oldPrice;
      product.value.productAvailability =
        currentProduct.value.productAvailability;
      product.value.priceGross = currentProduct.value.priceGross;
    }
  }
};

const addToCart = () => {
  cart.addToCart({
    id: currentProduct.value.id,
    name: currentProduct.value.name,
    price: currentProduct.price,
    quantity: productQuantity.value,
    filePath: currentProduct.value.thumbnailImage,
  });
};
</script>

<template>
  <Head>
    <Title>{{ product?.productLang[0]?.metaTitle }}</Title>
    <Meta
      name="description"
      :content="product?.productLang[0]?.metaDescription"
    />
  </Head>
  <PageHeader>
    <PageTitle></PageTitle>
  </PageHeader>
  <PageBody>
    <PageWrapper class="flex flex-col mx-5">
      <PageSection class="product__section__title">
        <div v-if="product">
          <div
            class="mx-auto w-full h-full block mb-2 rounded-md <md:px-2 self-center h-full bg-white"
          >
            <div class="border-b-3 border-dashed <lg:border-b-2">
              <BannerUS />
              <h1 class="text-xl py-4 mx-8 font-bold leading-none sm:text-2xl">
                {{ product?.name }}
              </h1>
            </div>
            <div class="mx-auto">
              <div class="flex flex-wrap <sm:block">
                <div class="pt-4 md:w-4/6">
                  <SwiperProductImages :images="product.images" />
                </div>
                <div
                  class="lg:sticky top-31 block border-l-3 <md:mt-13 <md:border-t-2 <md:border-b-2 <md:border-r-2 flex-1 md:w-2/6 <lg:border-l-2 border-dashed h-full"
                >
                  <div class="flex justify-end gap-2 mt-2">
                    <BannerBestseller v-show="product.isBestseller" />
                    <BannerNew v-show="product.isNew" />
                    <BannerSales v-show="product.isSales" />
                  </div>
                  <form class="space-y-2 pt-2">
                    <div class="rounded px-5 pb-6 border-b-3 border-dashed">
                      <p class="text-sm">
                        <span class="block font-600 text-xl">
                          Twoja cena:
                        </span>
                      </p>
                      <p class="text-sm relative pt-4 w-65">
                        <span
                          class="absolute -top-1 right-26 line-through decoration-red-700 font-600 text-lg text-red-500"
                        >
                          {{ product?.oldPrice?.toFixed(2) }} zł
                        </span>
                        <strong class="font-600 text-3xl text-blue-600">
                          {{ product?.price?.toFixed(2) }} zł
                        </strong>
                        <span class="font-600 text-md text-gray-400">
                          {{ product?.priceGross?.toFixed(2) }} zł (brutto)
                        </span>
                      </p>
                    </div>

                    <div class="px-5">
                      <div class="flex pt-3">
                        <p class="text-lg w-5/12 font-600 text-gray-400">
                          Dostępność:
                        </p>
                        <p class="text-lg w-3/12 font-800 text-emerald-400">
                          {{
                            getProductAvailabilityDescription(
                              product?.productAvailability
                            )
                          }}
                        </p>
                      </div>
                      <div class="flex">
                        <p class="text-lg w-5/12 font-600 text-gray-400">
                          Jednostka:
                        </p>
                        <p class="text-lg w-3/12 font-800 text-gray-600">
                          szt.
                        </p>
                      </div>
                      <div
                        v-if="product.variations && product.optionDisplayValues"
                      >
                        <p
                          class="font-600 text-lg mt-8 w-full pb-4 border-b border-gray-300"
                        >
                          Wybierz wariant
                        </p>
                        <div
                          v-for="(
                            values, optionName
                          ) in product.availableOptions"
                          :key="optionName"
                        >
                          <FormDropdownProduct
                            :optionId="values.optionId"
                            :name="values.optionName"
                            :values="values.values"
                            :displayValues="product.optionDisplayValues"
                            @updateValue="setUpdateValue"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <span
                        class="block text-red-600"
                        v-for="unselectedOption in unselectedOptions"
                        :key="unselectedOption.optionId"
                      >
                        Musisz wybrać wariant: {{ unselectedOption.optionName }}
                      </span>
                    </div>
                    <div class="flex">
                      <FormQuantityInput
                        class=""
                        @update:value="productQuantity = $event"
                      />
                      <a
                        class="w-full block text-center rounded bg-emerald-400 hover:bg-emerald-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white"
                        @click="handleButtonClick()"
                      >
                        Dodaj do koszyka
                      </a>
                    </div>
                    <div class="flex gap-2 text-orange-400">
                      <button
                        @click="application.changeQuestionProduct"
                        type="button"
                        class="w-full rounded border border-blue-900 bg-blue-900 py-3 text-0.75rem font-bold uppercase tracking-wide"
                      >
                        <Icon name="ic:round-question-mark" class="w-5 h-5" />
                        Zapytaj o produkt
                      </button>
                    </div>
                  </form>
                </div>
                <div class="md:w-4/6 relative">
                  <div class="pt-4">
                    <div class="px-4">
                      <p class="font-600 text-lg">Opis produktu:</p>
                      <p
                        class="mt-4"
                        v-html="product.productLang[0].description"
                      ></p>
                    </div>
                    <div class="mt-5 flex w-full gap-5 px-4">
                      <div class="w-2/3">
                        <div>
                          <p
                            class="font-600 text-lg border-b pb-3 border-gray-300"
                          >
                            Szczegóły:
                          </p>
                          <ul class="list_details">
                            <li
                              class="details"
                              v-for="attribute in product.attributes"
                              :key="attribute.name"
                            >
                              <span class="justify-start">{{
                                attribute.name
                              }}</span>
                              <span class="justify-end">{{
                                attribute.value
                              }}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="h-90" v-if="product.relatedProducts.length > 0">
              <GridSwiperCheckAlos />
            </div> -->
            <!-- <div class="!-mb-10">
              <GridRecommendedForYou />
            </div> -->
          </div>
        </div>
      </PageSection>
    </PageWrapper>
  </PageBody>
</template>

<style>
.details {
  border-bottom: 1px solid #cbd5e1;
  padding: 8px;
  justify-content: space-between;
  display: flex;
}

.characteristics {
  border-bottom: 1px solid #cbd5e1;
  padding: 8px;
}
</style>
