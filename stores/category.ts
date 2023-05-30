import { defineStore } from 'pinia'
import { Category } from '~/types/Category/categoryTypes'
import { Fetch } from '~/composables/useFetch'

export const useCategories = defineStore({
  id: 'categories',
  state: () => ({
    categories: [] as Category[]
  }),
  getters: {
    allCategories: state => state.categories
  },
  actions: {
      fetchCategories() {
      try {
        const { data } =  Fetch('/product/category', { method: 'get' });
        //@ts-ignore
        const categories: Category[] = data.value.data.map((category: any) => ({
          categoryId: category.categoryId,
          slug: category.slug,
          parentCategoryId: category.parentCategoryId,
          productCategoryCount: category.productCategoryCount,
          name: category.name,
          metaTitle: category.metaTitle,
          metaKeywords: category.metaKeywords,
          metaDescription: category.metaDescription,
          description: category.description,
          displayOrder: category.displayOrder,
          mostVisited: category.mostVisited,
          highlight: category.highlight,
          isPublished: category.isPublished,
          includeInMenu: category.includeInMenu,
          deleted: category.deleted,
          thumbnailImageId: category.thumbnailImageId,
          thumbnailImage: category.thumbnailImage,
          storeId: category.storeId,
          childCategories: category.childCategories,
          categoriesLang: category.categoriesLang,
        }));
        
        this.SET_CATEGORIES(categories);
        
      } catch (error) {
        console.error(error);
      }
    },
    SET_CATEGORIES(categories: Category[]) {
      this.categories = categories;
    },
  },
});