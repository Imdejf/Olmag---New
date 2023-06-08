<script lang="ts" setup>
import { object, string, ref as yupRef } from "yup";
import { configure } from "vee-validate";
import { useApplication } from "~/stores/application";

const config = useRuntimeConfig().public;
const application = useApplication();
const token = ref(null);

onMounted(async () => {
  token.value = await useVueRecaptcha();
});

const handleSubmit = async (values, actions) => {
  useFetch("/administration/store/productQuestion", {
    method: "POST",
    body: {
      storeId: config.storeId,
      languageId: config.languageId,
      phoneNumber: values.phone,
      email: values.email,
      question: values.question,
      productName: "pojemnik magazynowy testowy",
      token: token,
    },
  })
    .then((response) => {
      alert("SUKCES");
    })
    .catch((error) => {
      alert();
    });
};

const closeQuestionProduct = () => {
  application.changeQuestionProduct();
};

configure({
  validateOnBlur: true, // controls if `blur` events should trigger validation with `handleChange` handler
  validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
  validateOnInput: false, // controls if `input` events should trigger validation with `handleChange` handler
  validateOnModelUpdate: true, // controls if `update:modelValue` events should trigger validation with `handleChange` handler
});
const schema = object({
  email: string().required().email().label("Email Address"),
  phone: string().required().min(8).label("Phone number"),
  question: string().required().min(8).label("Question"),
});
</script>

<template>
  <div
    class="relative z-100 font-nunito"
    aria-labelledby="slide-over-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      @click="closeQuestionProduct()"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity ease-in-out duration-400"
      :class="
        application.questionProduct ? 'opacity-100' : 'opacity-0 invisible'
      "
    ></div>

    <div class="fixed overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
        >
          <div
            class="pointer-events-auto overflow-y-scroll bg-white w-screen h-auto max-w-md transform transition ease-in-out duration-400 sm:duration-700"
            :class="
              application.questionProduct ? 'translate-x-0' : 'translate-x-full'
            "
          >
            <div class="sticky z-10">
              <div class="flex h-7 items-center bg-white">
                <button
                  type="button"
                  @click="closeQuestionProduct()"
                  class="-m-2 p-5 mt-5 ml-90 text-gray-400 hover:text-gray-500"
                >
                  <span class="sr-only">Close panel</span>
                  <!-- Heroicon name: outline/x-mark -->
                  <svg
                    class="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div
                class="flex h-auto text-blue-900 h-full bg-white border-b-1 border-gray-300 px-10 pt-4"
              >
                <div>
                  <h3 class="text-lg font-400 w-full">
                    Zapytaj o produkt:
                    <span class="font-600"
                      >Pojemnik magazynowy do transportu zywności</span
                    >
                  </h3>
                </div>
              </div>
            </div>
            <div class="">
              <div class="px-10 pt-10 text-blue-900">
                <div class="text-center">
                  <span class="text-26px font-500">Zadzwoń</span>
                  <span class="block mt-5 text-emerald-400 text-24px font-700"
                    >+48 698 304 621</span
                  >
                </div>
                <span class="block my-5 text-center text-26px font-500">
                  albo napisz pytanie
                </span>
                <span class="block mb-5">
                  Nasz dział obsługi klienta skontaktuje się z tobą tak szybko
                  jak to możliwe aby odpowiedzieć na pytnie.
                </span>
              </div>
              <div>
                <VForm
                  class="mx-auto max-w-xs"
                  :validation-schema="schema"
                  :initial-values="initialValues"
                  v-slot="{ meta: formMeta, errors: formErrors }"
                  @submit="handleSubmit"
                  @invalid-submit="invalidHandleLogin"
                >
                  <FormVTextInput
                    type="text"
                    name="email"
                    label="email"
                    placeholder="email"
                    :debug="debug"
                    leftIcon=""
                  />
                  <FormVTextInput
                    type="text"
                    name="phone"
                    label="phone"
                    placeholder="phone"
                    :debug="debug"
                    leftIcon="ic:outline-phone-in-talk"
                  />
                  <FormVTextInput
                    type="text"
                    name="question"
                    label="question"
                    placeholder="question"
                    :textarea="true"
                    :debug="debug"
                  />
                  <button
                    class="w-full px-6 py-2.5 bg-emerald-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-emerald-500 hover:shadow-lg focus:bg-emerald-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-emerald-500 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Wyślij
                  </button>
                </VForm>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
