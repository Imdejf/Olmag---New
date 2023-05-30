import { defineStore } from 'pinia'
import { Fetch } from '~/composables/useFetch'

interface IResponseData {
  data: {
    data: ILocales[]
  }
}

export interface ILocales {
    [key: string]: {
      nameInternational: string
      nameOrginal: string
      isoCode: string
      flag: string
      id: string
      storeId: string,
      defaultLanguage: Boolean
    }
}

export const useApplication = defineStore('application', {
  state: () => ({
    locales: [] as ILocales[],
    questionProduct: false,
    topMenuIsOpen: false,
  }),
  actions: {
    changeQuestionProduct(): void {
      this.questionProduct = !this.questionProduct;
    },
    changeTopMenu():void {
      this.topMenuIsOpen = !this.topMenuIsOpen;
    },
  //  async fetchLanguage() {
  //   const localesList = []
  //     try {
  //       const response = await Fetch<IResponseData>('Store/Language/ActiveLanguages', { method: 'get' })
  //       const data = response.data.value?.data
  //       if (data && typeof data === 'object') {
  //         const values = Object.values(data)
  //         for (const item of values) {
  //           const mappedItem: ILocales = {
  //             nameInternational: item.nameInternational,
  //             nameOriginal: item.nameOrginal,
  //             isoCode: item.isoCode,
  //             flag: item.flagFilePath,
  //             id: item.id,
  //             storeId: item.storeId,
  //             defaultLanguage: item.defaultLanguage
  //           }
  //           localesList.push(mappedItem)
  //           this.locales = localesList
  //         }
  //       }
  //     } catch (error) {
  //       alert("Blad")
  //       console.error(error)
  //     }
  //   },
  }
})
