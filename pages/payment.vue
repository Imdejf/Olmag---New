<script lang="ts" setup>
definePageMeta({
  layout: 'page',
})
</script>

<template>
  <PageWrapper>
    <PageHeader>
      <PageTitle> <h1>Ciasteczka</h1> </PageTitle>
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
              <h2 class="text-24px">Regulamin</h2>
              <div>
                <p class="text-20px my-10">
                  Regulamin zakupów dokonywanych w ramach sklepu internetowego
                  olmag.pl oraz świadczenia usług drogą elektroniczną
                  obowiązujący od 01.01.2023 r.
                </p>
              </div>
              <div>
                <p>dsa</p>
              </div>
            </div>
          </div>
        </PageSection>
      </div>
    </PageBody>
  </PageWrapper>
</template>
