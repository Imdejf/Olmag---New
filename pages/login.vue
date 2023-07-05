<script lang="ts" setup>
import { object, string, ref as yupRef } from "yup";
import { configure } from "vee-validate";
import jwt_decode from "jwt-decode";

// compiler macro
definePageMeta({
  middleware: ["is-authorized"],
  layout: "page",
});

const rememberMe = ref("");
const errorLogin = ref(false);

const handleLogin = (values, actions) => {
  const config = useRuntimeConfig().public;
  $fetch(config.baseURL + "Connect/Token", {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `client_id=ro.client&client_secret=secret&grant_type=password&username=${values.email}&password=${values.password}`,
  })
    .then((response) => {
      const decode = jwt_decode(response.access_token);
      const customer = useCookie("dsCustomer");
      customer.value = decode.sub;
      SetTokenCookie(response.access_token);
      window.location.reload();
    })
    .catch((error) => {
      errorLogin.value = true;
    });
};

const SetTokenCookie = (token: string) => {
  var rememberMeMilliseconds = 0;
  if (rememberMe) {
    rememberMeMilliseconds = 365 * 24 * 60 * 60 * 1000;
  } else {
    rememberMeMilliseconds = 24 * 60 * 60 * 1000;
  }
  const tokenCookie = useCookie("Authorization", {
    expires: new Date(Date.now() + rememberMeMilliseconds),
    path: "/",
  });
  tokenCookie.value = token;
};

configure({
  validateOnBlur: true, // controls if `blur` events should trigger validation with `handleChange` handler
  validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
  validateOnInput: false, // controls if `input` events should trigger validation with `handleChange` handler
  validateOnModelUpdate: true, // controls if `update:modelValue` events should trigger validation with `handleChange` handler
});
const schema = object({
  email: string().required("Musisz podać email lub login"),
  password: string().required("Musisz podać hasło"),
});
const initialValues = { email: "", password: "" };
const route = useRoute();
</script>

<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle :textNav="[{ text: 'Logowanie', slug: '/login' }]"></PageTitle>
    </PageHeader>
    <PageBody>
      <div class="bg-white">
        <PageSection>
          <div
            class="login__section m-0 bg-white shadow sm:rounded-lg flex justify-center flex-1"
          >
            <div class="lg:w-1/2 p-6 sm:p-6">
              <div class="flex flex-col items-center">
                <h1 class="text-2xl xl:text-3xl font-extrabold text-green-400">
                  Zaloguj się
                </h1>
                <div class="w-full flex-1 mt-8">
                  <div class="my-6 border-b text-center">
                    <div
                      class="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2"
                    >
                      Lub zaloguj się mailem
                    </div>
                  </div>
                  <VForm
                    class="mx-auto max-w-xs"
                    :validation-schema="schema"
                    :initial-values="initialValues"
                    v-slot="{ meta: formMeta, errors: formErrors }"
                    @submit="handleLogin"
                  >
                    <FormVTextInput
                      type="text"
                      name="email"
                      label="Email"
                      placeholder="Email"
                      leftIcon="material-symbols:mail"
                    />
                    <FormVTextInput
                      type="password"
                      name="password"
                      label="Hasło"
                      placeholder="Hasło"
                      leftIcon="ic:sharp-lock-person"
                    />
                    <span v-show="errorLogin" class="text-red-400"
                      >Nieprawidłowy login lub hasło</span
                    >
                    <button
                      class="mt-5 tracking-wide font-semibold bg-green-400 text-gray-100 w-full py-4 rounded-lg hover:bg-green-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    >
                      <svg
                        class="w-6 h-6 -ml-2"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                      <span class="ml-3"> Zaloguj się </span>
                    </button>
                    <div class="debug" v-if="debug">
                      <pre>{{ formMeta }}</pre>
                    </div>
                    <div class="form-group form-check text-center mt-4">
                      <input
                        type="checkbox"
                        class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-green-600 checked:border-green-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                      />
                      <label
                        class="form-check-label inline-block text-gray-800 cursor-pointer"
                        >Zapamiętaj mnie</label
                      >
                    </div>
                    <div class="flex justify-center mt-3 sm:hidden">
                      <span>Nie masz konta?</span>
                      <NuxtLink href="/register" class="ml-2 text-blue-400"
                        >Zarejestruj się</NuxtLink
                      >
                    </div>
                  </VForm>
                </div>
              </div>
            </div>
            <div class="flex-1 text-center hidden lg:flex">
              <div
                class="xl:m-16 w-full bg-contain bg-center bg-no-repeat p-6 sm:p-6"
              >
                <h1 class="text-2xl xl:text-3xl font-extrabold text-blue-900">
                  Nie masz konta?
                </h1>
                <ol class="relative border-l ml-10 border-gray-400 mt-8">
                  <li class="mb-10 ml-6">
                    <span
                      class="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-900 rounded-full ring-8 ring-white dark:ring-gray-900"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-3 h-3 text-emerald-300"
                        viewBox="0 0 24 24"
                      >
                        <g fill="none" fill-rule="evenodd">
                          <path
                            d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"
                          />
                          <path
                            fill="currentColor"
                            d="M9.405 2.897a4 4 0 0 1 5.02-.136l.17.136l.376.32a2 2 0 0 0 .96.45l.178.022l.493.04a4 4 0 0 1 3.648 3.468l.021.2l.04.494a2 2 0 0 0 .36.996l.11.142l.322.376a4 4 0 0 1 .136 5.02l-.136.17l-.321.376a2 2 0 0 0-.45.96l-.022.178l-.039.493a4 4 0 0 1-3.468 3.648l-.201.021l-.493.04a2 2 0 0 0-.996.36l-.142.111l-.377.32a4 4 0 0 1-5.02.137l-.169-.136l-.376-.321a2 2 0 0 0-.96-.45l-.178-.021l-.493-.04a4 4 0 0 1-3.648-3.468l-.021-.2l-.04-.494a2 2 0 0 0-.36-.996l-.111-.142l-.321-.377a4 4 0 0 1-.136-5.02l.136-.169l.32-.376a2 2 0 0 0 .45-.96l.022-.178l.04-.493A4 4 0 0 1 7.197 3.75l.2-.021l.494-.04a2 2 0 0 0 .996-.36l.142-.111l.376-.32ZM14.5 13a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3Zm-.207-4.707l-6 6a1 1 0 1 0 1.414 1.414l6-6a1 1 0 0 0-1.414-1.414ZM9.5 8a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3Z"
                          />
                        </g>
                      </svg>
                    </span>
                    <h3
                      class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white"
                    >
                      Rabat
                    </h3>
                    <p
                      class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400"
                    >
                      5% rabatu na transport przy pierwszych zakupach
                    </p>
                  </li>
                  <li class="mb-10 ml-6">
                    <span
                      class="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-900 rounded-full ring-8 ring-white dark:ring-gray-900"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-3 h-3 text-emerald-300"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="m21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58c.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41c0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4S7 4.67 7 5.5S6.33 7 5.5 7zm11.77 8.27L13 19.54l-4.27-4.27A2.5 2.5 0 0 1 10.5 11c.69 0 1.32.28 1.77.74l.73.72l.73-.73a2.5 2.5 0 0 1 3.54 3.54z"
                        />
                      </svg>
                    </span>
                    <h3
                      class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white"
                    >
                      System lojalnościowy
                    </h3>
                    <p
                      class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400"
                    >
                      Posiadamy atrakcyjny system lojalnościowy.
                    </p>
                  </li>
                  <li class="mb-10 ml-6">
                    <span
                      class="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-900 rounded-full ring-8 ring-white dark:ring-gray-900"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-3 h-3 text-emerald-300"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="m10.95 13.7l-1.425-1.425q-.3-.3-.7-.3t-.7.3q-.3.3-.3.713t.3.712l2.125 2.15q.3.3.7.3t.7-.3l4.25-4.25q.3-.3.3-.712t-.3-.713q-.3-.3-.713-.3t-.712.3L10.95 13.7ZM12 22q-1.875 0-3.512-.713t-2.85-1.924q-1.213-1.213-1.925-2.85T3 13q0-1.875.713-3.513t1.924-2.85q1.213-1.212 2.85-1.924T12 4q1.875 0 3.513.713t2.85 1.925q1.212 1.212 1.925 2.85T21 13q0 1.875-.713 3.513t-1.924 2.85q-1.213 1.212-2.85 1.925T12 22Zm0-9ZM2.05 7.3q-.275-.275-.275-.7t.275-.7L4.9 3.05q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7L3.45 7.3q-.275.275-.7.275t-.7-.275Zm19.9 0q-.275.275-.7.275t-.7-.275L17.7 4.45q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l2.85 2.85q.275.275.275.7t-.275.7ZM12 20q2.925 0 4.963-2.038T19 13q0-2.925-2.038-4.963T12 6Q9.075 6 7.037 8.038T5 13q0 2.925 2.038 4.963T12 20Z"
                        />
                      </svg>
                    </span>
                    <h3
                      class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white"
                    >
                      Oszczędność czasu przy zamówieniu
                    </h3>
                    <p
                      class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400"
                    >
                      Automatycznie wypełniamy dane w formularzu płatniczym.
                    </p>
                  </li>
                  <li class="mb-10 ml-6">
                    <span
                      class="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-900 rounded-full ring-8 ring-white dark:ring-gray-900"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-3 h-3 text-emerald-300"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M12 .64L8.23 3H5v2L2.97 6.29C2.39 6.64 2 7.27 2 8v10a2 2 0 0 0 2 2h16c1.11 0 2-.89 2-2V8c0-.73-.39-1.36-.97-1.71L19 5V3h-3.23M7 5h10v4.88L12 13L7 9.88M8 6v1.5h8V6M5 7.38v1.25L4 8m15-.62L20 8l-1 .63M8 8.5V10h8V8.5Z"
                        />
                      </svg>
                    </span>
                    <h3
                      class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white"
                    >
                      Newsletter
                    </h3>
                    <p
                      class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400"
                    >
                      Poinformujemy Cię o nowych produktach i ofertach.
                    </p>
                  </li>
                </ol>
                <NuxtLink
                  href="/register"
                  class="mt-5 tracking-wide font-semibold bg-blue-900 text-orange-400 w-full py-4 rounded-lg hover:bg-blue-800 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <span class="ml-3"> Załóż konto </span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </PageSection>
      </div>
    </PageBody>
  </PageWrapper>
</template>

<style>
@media only screen and (min-width: 1024px) {
  .login__section::before {
    display: block;
    position: relative;
    left: 50%;
    transform: translate(-50%);
    content: "";
    margin: 50px 0;
    width: 1px;
    background-color: #e5e7eb;
  }
}
</style>
