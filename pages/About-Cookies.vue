<script lang="ts" setup>
definePageMeta({
  layout: "page",
});
</script>

<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle
        :textNav="[{ text: 'Polityka cookies', slug: 'about-cookies' }]"
      >
      </PageTitle>
    </PageHeader>
    <PageBody>
      <div class="flex gap-15 container m-auto my-10">
        <PageSection class="min-w-85 max-w-85">
          <PageHelpNavigation />
        </PageSection>

        <PageSection class="w-full">
          <div
            class="rounded-xl border border-gray-100 bg-white p-4 w-full shadow-xl"
          >
            <div class="p-5 font-600 text-blue-900">
              <h2 class="text-24px">Polityka Cookies</h2>
              <div>
                <p>
                  1.Niniejsza Polityka Cookies określa zasady zbierania danych
                  za pośrednictwem plików "cookies" podczas korzystania przez
                  Użytkowników z usług Hē dla witryny www.olmag.pl.
                </p>
                <p>2.Operatorem strony internetowej wskazanej w pkt. 1 jest:</p>
                <div class="text-center">
                  <p>Data Sharp Dawid Jabłoński</p>
                  <p>(ul. Polna 6, 66-340 Przytoczna, NIP: 5961765516)</p>
                  <p>biuro@olmag.pl</p>
                </div>
                <p>
                  3.Poprzez pliki “cookies” należy rozumieć dane informatyczne
                  przechowywane w urządzeniach końcowych Użytkowników,
                  przeznaczone do korzystania ze stron internetowych. W
                  szczególności są to pliki tekstowe, zawierające nazwę strony
                  internetowej, z której pochodzą, czas przechowywania ich na
                  urządzeniu końcowym oraz unikalny numer.
                </p>
                <p>
                  4.Strona internetowa www.olmag.pl nie zbiera w sposób
                  automatyczny żadnych informacji, z wyjątkiem informacji
                  zawartych w plikach "cookies".
                </p>
                <p>
                  5.Pliki "cookies" przeznaczone są do korzystania ze strony
                  internetowej www.olmag.pl. Operator wykorzystuje te pliki do:
                </p>
                <div>
                  <p>
                    a. możliwości logowania i utrzymywania sesji Użytkownika na
                    każdej kolejnej stronie internetowej www.olmag.pl,
                  </p>
                  <p>
                    b. dopasowania zawartości strony internetowej do
                    indywidualnych preferencji Użytkownika, przede wszystkim
                    pliki te rozpoznają jego urządzenie, aby zgodnie z jego
                    preferencjami wyświetlić stronę,
                  </p>
                  <p>
                    c. do tworzenia anonimowych statystyk z wyłączeniem
                    możliwości identyfikacji Użytkownika.
                  </p>
                </div>
                <p>
                  6. Pliki "cookies" wykorzystywane przez partnerów operatora
                  strony internetowej, w tym w szczególności Użytkowników strony
                  internetowej, podlegają ich własnej polityce prywatności.
                </p>
                <p>
                  7. W trosce o bezpieczeństwo powierzonych nam przez
                  Użytkowników danych Hē oświadcza, iż opracował wewnętrzne
                  procedury i zalecenia, które mają zapobiec udostępnieniu
                  danych osobom nieupoważnionym. Hē kontroluje ich wykonywanie i
                  stale sprawdza ich zgodność z odpowiednimi aktami prawnymi, w
                  tym w szczególności z ustawą o ochronie danych osobowych,
                  ustawą o świadczeniu usług drogą elektroniczną, w tym również
                  w aktach wykonawczych do tych ustaw oraz w aktach prawa
                  wspólnotowego.
                </p>
                <p>
                  8. Standardowo oprogramowanie służące do przeglądania stron
                  internetowych domyślnie dopuszcza umieszczanie plików
                  "cookies" na urządzeniu końcowym Użytkownika. Ustawienia te
                  mogą zostać zmienione przez Użytkownika w taki sposób, aby
                  blokować automatyczną obsługę “cookies” w ustawieniach
                  przeglądarki internetowej bądź informować o ich każdorazowym
                  przesłaniu na urządzenia użytkownika.
                </p>
                <p>
                  9. Użytkownicy strony internetowej www.hemanpower.com mogą
                  dokonać w każdym czasie zmiany ustawień dotyczących plików
                  "cookies". Szczegółowe informacje o możliwości i sposobach
                  obsługi plików "cookies" dostępne są w ustawieniach
                  oprogramowania (przeglądarki internetowej). Przykładowe opcje
                  edytowania w popularnych przeglądarkach:
                </p>
                <div>
                  <p>
                    Mozilla Firefox: www.support.mozilla.org/pl/kb/ciasteczka
                  </p>
                  <p>
                    Internet Explorer: www.support.microsoft.com/kb/278835/pl
                  </p>
                  <p>
                    Google Chrome:
                    www.support.google.com/chrome/bin/answer.py?hl=pl&answer=95647
                  </p>
                  <p>
                    Safari:
                    www.safari.helpmax.net/pl/oszczedzanie-czasu/blokowanie-zawartosci/
                  </p>
                </div>
                <p>
                  10.Olmag.pl informuje, że zmiany ustawień w przeglądarce
                  internetowej Użytkownika mogą uniemożliwić poprawne działanie
                  strony internetowej www.olmag.pl.
                </p>
              </div>
            </div>
          </div>
        </PageSection>
      </div>
    </PageBody>
  </PageWrapper>
</template>
