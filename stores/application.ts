import { defineStore } from 'pinia'

export const useApplication = defineStore('application', {
  state: () => ({
    questionProduct:  false,
    shoppingCartOpen: false,
    topMenuIsOpen: false,
    blogs: [],
  }),
  actions: {
    changeQuestionProduct(): void {
      this.questionProduct = !this.questionProduct;
    },
    changeShoppingCart(): void {
      this.shoppingCartOpen = !this.shoppingCartOpen;
    },
    changeTopMenu():void {
      this.topMenuIsOpen = !this.topMenuIsOpen;
    },
  }
})
