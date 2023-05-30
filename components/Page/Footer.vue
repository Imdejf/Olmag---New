<template>
  <footer aria-label="Site Footer" class="bg-blue-900 text-emerald-400">
    <div class="mx-auto px-4 pt-16 pb-8 sm:px-6 lg:px-8">
      <strong
        class="block text-center text-xl font-medium text-white sm:text-3xl"
      >
        Chcesz otrzymywać informacje o najnowyszych ofertach?
      </strong>
      <div class="mx-auto max-w-md">
        <form class="mt-6">
          <div class="relative max-w-lg">
            <label class="sr-only" for="email"> Email </label>
            <input
              class="w-full rounded-full p-4 pr-32 text-sm font-medium border-gray-700 bg-gray-800 text-white"
              id="email"
              type="email"
              placeholder="newsletter@olmag.pl"
            />

            <button
              class="absolute mt-1 right-1 rounded-full bg-emerald-700 px-5 py-3 text-sm font-600 text-white transition hover:bg-emerald-500"
              type="button"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
      <div
        class="mt-16 grid grid-cols-1 text-emerald-400 gap-8 lg:grid-cols-2 lg:gap-32"
      >
        <div class="mx-auto max-w-sm lg:max-w-none">
          <div
            class="grid grid-cols-1 gap-8 text-center lg:grid-cols-3 lg:text-left"
          >
            <div>
              <strong class="font-semibold text-red-400"> Firma </strong>
              <nav
                aria-label="Footer About Nav"
                class="mt-6 flex flex-col space-y-1"
              >
                <NuxtLink to="/" class="transition">
                  <span class="section_text text_line">O nas</span>
                </NuxtLink>
                <a class="transition" href="#">
                  <span class="section_text text_line">Jak kupować?</span>
                </a>
                <a class="transition" href="#">
                  <span class="section_text text_line">Oferta sklepu</span>
                </a>
                <NuxtLink to="/help/privacy-policy" class="transition">
                  <span class="section_text text_line"
                    >Polityka prywatności</span
                  >
                </NuxtLink>
                <NuxtLink to="/" class="transition" href="#">
                  <span class="section_text text_line">Regulamin</span>
                </NuxtLink>
              </nav>
            </div>
            <div>
              <strong class="font-medium font-700"> Usługi </strong>

              <nav
                aria-label="Footer Services Nav"
                class="mt-6 flex flex-col space-y-1"
              >
                <a class="transition" href="#">
                  <span class="section_text text_line"> Dostawa produktu</span>
                </a>
                <a class="transition" href="#">
                  <span class="section_text text_line">Zwrot produktu</span>
                </a>
                <NuxtLink to="/" class="transition">
                  <span class="section_text text_line">Płatności</span>
                </NuxtLink>
                <a class="transition" href="#">
                  <span class="section_text text_line">Gwarancja</span>
                </a>
              </nav>
            </div>
            <div>
              <strong class="font-medium font-700"> Wspracie </strong>
              <nav
                aria-label="Footer Support Nav"
                class="mt-6 flex flex-col space-y-1"
              >
                <NuxtLink class="transition" href="#">
                  <span class="section_text text_line">Blog</span>
                </NuxtLink>

                <NuxtLink class="transition" to="/contact">
                  <span class="section_text text_line">Kontakt</span>
                </NuxtLink>
              </nav>
            </div>
          </div>
          <div class="mt-6 flex justify-center gap-4 lg:justify-start">
            <a
              class="transition text-emerald-300 hover:text-emerald-400"
              href="#"
              target="_blank"
              rel="noreferrer"
            >
              <span class="sr-only"> Facebook </span>

              <Icon name="simple-icons:facebook" class="h-6 w-6" />
            </a>

            <a
              class="transition text-emerald-300 hover:text-emerald-400"
              href="#"
              target="_blank"
              rel="noreferrer"
            >
              <span class="sr-only"> Linkedin </span>

              <Icon name="akar-icons:linkedin-v1-fill" class="w-6 h-6" />
            </a>
          </div>
        </div>
        <div
          class="grid grid-cols-1 gap-8 text-center lg:grid-cols-2 lg:text-left"
        >
          <div>
            <strong class="font-medium font-700"> olmag.pl </strong>

            <div
              aria-label="Footer About Nav"
              class="mt-6 flex flex-col space-y-1"
            >
              <a class="transition" href="mailto:sklep@olmag.com">
                <span class="section_text text_line">sklep@olmag.pl</span>
              </a>
              <a class="transition" href="tel:+48698304621">
                <span class="section_text text_line"
                  >tel.kom.: +48 698 304 621</span
                >
              </a>
            </div>
          </div>
          <div>
            <strong class="font-medium font-700"> Operator sklepu </strong>

            <div
              aria-label="Footer Support Nav"
              class="mt-6 flex flex-col space-y-1"
            >
              <img
                data-src="assets/DS-min.png"
                alt="logo Data Sharp"
                class="m-auto md:m-0"
              />
              <p>
                Data Sharp<br />Polna 6 66-340 Przytoczna <br />
                NIP: 523999467
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style>
.text_line {
  position: relative;
  text-decoration: none;
  transition: all 0.35s ease;
}

.text_line::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #72efdd;
  visibility: hidden;
  -webkit-transform: scaleX(0);
  transform: scaleX(0);
  -webkit-transition: all 0.3s ease-in-out 0s;
  transition: all 0.3s ease-in-out 0s;
}

.section_text:hover {
  color: #72efdd;
}
.section_text:hover::before {
  visibility: visible;
  -webkit-transform: scaleX(1);
  transform: scaleX(1);
}
</style>
