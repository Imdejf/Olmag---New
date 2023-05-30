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
                                <Icon
                                  name="fa6-solid:headset"
                                  class="text-white w-4 h-4"
                                />
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
                                <Icon
                                  name="material-symbols:mail"
                                  class="text-white text-base w-4 h-4"
                                />
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
                          name="username"
                          label="Temat*"
                          placeholder="Temat*"
                        ></FormVTextInput>
                      </div>
                      <div class="form-group mb-6">
                        <FormVTextInput
                          type="text"
                          textarea="true"
                          name="username"
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
                    title="olmag"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d752.8212919687434!2d15.680698657802472!3d52.57281524967542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa06193f6f5541f1%3A0x8cf7b91b48c27247!2seMagazynowo%20-%20wyposa%C5%BCenie%20do%20magazynu!5e0!3m2!1spl!2spl!4v1672257120771!5m2!1spl!2spl"
                    class="h-full w-full absolute rounded-lg"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageSection>
      <PageSection>
        <div class="section__selected_product">
          <div class="container py-5 mx-auto block <md:px-2">
            <h2 class="uppercase tracking-3px font-600 text-lg">
              Zobacz również
            </h2>
            <GridCategory />
          </div>
        </div>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>
