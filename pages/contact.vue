<script lang="ts" setup>
// compiler macro
definePageMeta({
  layout: "page",
});
</script>
<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle></PageTitle>
    </PageHeader>
    <PageBody>
      <PageSection>
        <div class="px-6 <sm:py-2 py-12 text-center">
          <div class="mx-auto xl:px-32">
            <div class="grid lg:grid-cols-2 flex items-center">
              <div class="md:mt-12 lg:mt-0 mb-12 lg:mb-0 px-2">
                <div
                  class="block rounded-lg shadow-lg"
                  style="
                    background: hsla(0, 0%, 100%, 0.55);
                    backdrop-filter: blur(30px);
                  "
                >
                  <div class="grow-0 shrink-0 basis-auto w-full">
                    <div class="flex flex-wrap pt-10 px-2">
                      <div
                        class="mb-12 grow-0 shrink-0 basis-auto w-full lg:w-6/12"
                      >
                        <div class="flex items-center h-20 <sm:justify-center">
                          <div class="flex mx-auto items-center">
                            <div class="shrink-0">
                              <div
                                class="bg-green-400 rounded-md shadow-md w-9 h-9 xl:w-12 xl:h-12 flex items-center justify-center"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="text-white w-4 h-4"
                                  viewBox="0 0 512 512"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M256 48C141.1 48 48 141.1 48 256v40c0 13.3-10.7 24-24 24S0 309.3 0 296v-40C0 114.6 114.6 0 256 0s256 114.6 256 256v144.1c0 48.6-39.4 88-88.1 88l-110.3-.1c-8.3 14.3-23.8 24-41.6 24h-32c-26.5 0-48-21.5-48-48s21.5-48 48-48h32c17.8 0 33.3 9.7 41.6 24l110.4.1c22.1 0 40-17.9 40-40V256c0-114.9-93.1-208-208-208zM144 208h16c17.7 0 32 14.3 32 32v112c0 17.7-14.3 32-32 32h-16c-35.3 0-64-28.7-64-64v-48c0-35.3 28.7-64 64-64zm224 0c35.3 0 64 28.7 64 64v48c0 35.3-28.7 64-64 64h-16c-17.7 0-32-14.3-32-32V240c0-17.7 14.3-32 32-32h16z"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div class="grow ml-2">
                              <p class="font-bold mb-1">Pomoc</p>
                              <p class="text-gray-500">biuro@olmag.com</p>
                              <p class="text-gray-500">698 304 621</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="mb-12 grow-0 shrink-0 basis-auto w-full lg:w-6/12"
                      >
                        <div class="flex items-center h-20 <sm:justify-center">
                          <div class="flex mx-auto items-center">
                            <div class="shrink-0">
                              <div
                                class="bg-green-400 rounded-md shadow-md w-9 h-9 xl:w-12 xl:h-12 flex items-center justify-center"
                              >
                                <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  data-prefix="fas"
                                  data-icon="dollar-sign"
                                  class="text-white text-base w-4 h-4"
                                  role="img"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 288 512"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M209.2 233.4l-108-31.6C88.7 198.2 80 186.5 80 173.5c0-16.3 13.2-29.5 29.5-29.5h66.3c12.2 0 24.2 3.7 34.2 10.5 6.1 4.1 14.3 3.1 19.5-2l34.8-34c7.1-6.9 6.1-18.4-1.8-24.5C238 74.8 207.4 64.1 176 64V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48h-2.5C45.8 64-5.4 118.7.5 183.6c4.2 46.1 39.4 83.6 83.8 96.6l102.5 30c12.5 3.7 21.2 15.3 21.2 28.3 0 16.3-13.2 29.5-29.5 29.5h-66.3C100 368 88 364.3 78 357.5c-6.1-4.1-14.3-3.1-19.5 2l-34.8 34c-7.1 6.9-6.1 18.4 1.8 24.5 24.5 19.2 55.1 29.9 86.5 30v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-48.2c46.6-.9 90.3-28.6 105.7-72.7 21.5-61.6-14.6-124.8-72.5-141.7z"
                                  ></path>
                                </svg>
                              </div>
                            </div>
                            <div class="grow ml-2">
                              <p class="font-bold mb-1">Sprzedaż</p>
                              <p class="text-gray-500">sklep@olmag.com</p>
                              <p class="text-gray-500">698 304 621</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="mb-12 grow-0 shrink-0 basis-auto w-full lg:w-6/12"
                      >
                        <div
                          class="flex align-start items-center h-20 <sm:justify-center"
                        >
                          <div class="flex mx-auto items-center">
                            <div class="shrink-0">
                              <div
                                class="bg-green-400 rounded-md shadow-md w-9 h-9 xl:w-12 xl:h-12 flex items-center justify-center"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="text-white w-4 h-4"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M4 20q-.825 0-1.413-.588T2 18V6q0-.825.588-1.413T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.588 1.413T20 20H4Zm8-7l8-5V6l-8 5l-8-5v2l8 5Z"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div class="grow ml-2">
                              <p class="font-bold mb-1">Wiadomość</p>
                              <p class="text-gray-500">biuro@olmag.com</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="px-6 py-12 md:px-12">
                    <h3 class="text-3xl font-bold mb-12">Kontakt</h3>
                    <VForm>
                      <div class="form-group mb-6">
                        <FormVTextInput
                          type="text"
                          name="username"
                          label="Imię*"
                          placeholder="Imię*"
                        ></FormVTextInput>
                      </div>
                      <div class="form-group mb-6">
                        <FormVTextInput
                          type="text"
                          name="phone"
                          label="Telefon*"
                          placeholder="Telefon*"
                        ></FormVTextInput>
                      </div>
                      <div class="form-group mb-6">
                        <FormVTextInput
                          type="text"
                          name="email"
                          label="Email*"
                          placeholder="Email*"
                        ></FormVTextInput>
                      </div>
                      <div class="form-group mb-6">
                        <FormVTextInput
                          type="text"
                          name="topic"
                          label="Temat*"
                          placeholder="Temat*"
                        ></FormVTextInput>
                      </div>
                      <div class="form-group mb-6">
                        <FormVTextInput
                          type="text"
                          :textarea="true"
                          name="description"
                          label="Treść wiadomości*"
                          placeholder="Treść wiadomości*"
                          class="font-bold"
                        ></FormVTextInput>
                      </div>
                      <div class="form-group form-check text-center mb-6">
                        <input
                          type="checkbox"
                          class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:border-green-400 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                          id="exampleCheck87"
                        />
                        <label
                          class="form-check-label inline-block text-gray-800 cursor-pointer"
                          for="exampleCheck87"
                          >Wyślij do mnie kopie wiadomości</label
                        >
                      </div>
                      <button
                        type="submit"
                        class="w-full px-6 py-2.5 bg-green-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-500 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                      >
                        Wyślij
                      </button>
                    </VForm>
                  </div>
                </div>
              </div>
              <div class="h-full md:mb-12 lg:mb-0 px-2">
                <div class="h-full relative shadow-lg rounded-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2424.8192678198643!2d15.678654212026439!3d52.57287957195864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4706ed9ffdc54efb%3A0x532cf79278532f9e!2sOlmag.pl%20-%20wyposa%C5%BCenie%20magazynowe!5e0!3m2!1spl!2spl!4v1685552149372!5m2!1spl!2spl"
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    class="h-full w-full absolute rounded-lg"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>
