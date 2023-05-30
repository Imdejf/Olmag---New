export interface Category {
    categoryId: string;
    slug: string;
    parentCategoryId?: string;
    productCategoryCount: number;
    name: string;
    metaTitle: string;
    metaKeywords: string;
    metaDescription: string;
    description: string;
    displayOrder: number;
    isPublished: boolean;
    includeInMenu: boolean;
    mostVisited: boolean;
    highlight: boolean;
    deleted: boolean;
    thumbnailImageId: string;
    thumbnailImage: Media;
    storeId: string;
    childCategories: Category[];
    categoriesLang: CategoryLang[];
  }
  
  interface Media {
    id: string;
    filePath?: string;
    seoFileName?: string;
    altAttribute?: string;
    titleAttribute?: string;
    mediaLangs: MediaLang[];
  }
  
  interface MediaLang {
    mediaId: string;
    languageId: string;
    filePath?: string;
    seoFileName?: string;
    altAttribute?: string;
    titleAttribute?: string;
  }
  
  interface CategoryLang {
    name: string;
    description: string;
    metaKeywords: string;
    metaDescription: string;
    metaTitle: string;
    categoryId: string;
    languageId: string;
  }