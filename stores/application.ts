import { defineStore } from 'pinia'

export const useApplication = defineStore('application', {
  state: () => ({
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
  }
})
