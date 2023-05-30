import { defineStore } from 'pinia'
import { ProductDTO } from '~/types/Product/productTypes'
import { Fetch } from '~/composables/useFetch'

export const productStore = defineStore({
    id: 'products',
    state: () => ({
        highlightProducts: [] as ProductDTO[]
    }),
    getters: {
        allHighlightProducts: state => state.highlightProducts
    },
    actions: {
        fetchProducts() {
            try {
                const { data } = Fetch('/product/HeighlightProduct', { params:{
                    languageId: useCookie('dsLanguage'),
                    storeId: useCookie('dsStore')
                }})
                console.log(data.value)
                const products: ProductDTO[] = data.value.data

                this.SET_PRODUCTS(products)
            } catch(error) {
                console.log(error)
            }
        },
        SET_PRODUCTS(products: ProductDTO[]) {
            this.highlightProducts = products;
        }
    }
});