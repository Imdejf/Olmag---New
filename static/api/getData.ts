import fs from 'fs';
import axios from 'axios';
import { BlogCategoryDTO } from '~/types/Blog/BlogTypes';

export async function fetchCategories(storeId: string, languageId: string, apiBaseURL: string) {
  try {
    const { data:categories } = await axios.get(apiBaseURL + "product/category/CategoryWithDetails", {
      params: {
        storeId: storeId,
        languageId: languageId,
      }
    })

    const categoriesJSON = JSON.stringify(categories);
    fs.writeFile('public/data/category/categories.json', categoriesJSON, (err) => {
      if (err) {
        console.error('Błąd zapisu do pliku:', err);
      } else {
        console.log('Kategorie zostały zapisane do pliku categories.json');
      }
    });
  } catch (error) {
    console.error('Błąd pobierania kategorii:', error);
  }
}

export async function fetchBlogs(storeId: string, languageId: string, apiBaseURL: string) {
  try {

    const { data:blogs } = await axios.get(apiBaseURL + "product/blogCategory/GetAllBlogWithDetail", {
      params: {
        storeId: storeId,
        languageId: languageId,
      }
    })

    const blogsJSON = JSON.stringify(blogs);
    fs.writeFile('public/data/blog/blogs.json', blogsJSON, (err) => {
      if (err) {
        console.error('Błąd zapisu do pliku:', err);
      } else {
        console.log('Blogi zostały zapisane do pliku categories.json');
      }
    });
  } catch (error) {
    console.error('Błąd pobierania blogów:', error);
  }
}

export async function fetchProducts(storeId: string, languageId: string, apiBaseURL: string) {
  try {

    const { data:products } = await axios.get(apiBaseURL + "product/ProductWithDetail", {
      params: {
        storeId: storeId,
        languageId: languageId,
      }
    })

    const productsJSON = JSON.stringify(products);
    fs.writeFile('public/data/product/products.json', productsJSON, (err) => {
      if (err) {
        console.error('Błąd zapisu do pliku:', err);
      } else {
        console.log('Produkty zostały zapisane do pliku product.json');
      }
    });
  } catch (error) {
    console.error('Błąd pobierania produktów:', error);
  }
}