export interface BlogCategoryDTO {
    blogCategoryId: string;
    storeId: string;
    name: string;
    slug: string;
    metaTitle: string;
    metaKeywords: string;
    metaDescription: string;
    shortDescription: string;
    description: string;
    displayOrder: number;
    isPublished: boolean;
    isDeleted: boolean;
    thumbnailImageId: string;
    thumbnailImage: MediaDTO;
    blogItems: BlogItemDTO[];
    blogCategoryLangs: BlogCategoryLangDTO[];
  }
  
  interface BlogCategoryLangDTO {
    blogCategoryId: string;
    languageId: string;
    name: string;
    metaTitle: string;
    metaKeywords: string;
    metaDescription: string;
    shortDescription: string;
    description: string;
  }
  
  interface MediaDTO {
    id: string;
    filePath: string | null;
    seoFileName: string | null;
    altAttribute: string | null;
    titleAttribute: string | null;
    mediaLangs: MediaLangDTO[];
  }
  
  interface MediaLangDTO {
    mediaId: string;
    languageId: string;
    filePath: string | null;
    seoFileName: string | null;
    altAttribute: string | null;
    titleAttribute: string | null;
  }

  export interface BlogItemDTO {
    id: string;
    name: string;
    slug: string;
    metaTitle: string;
    metaKeywords: string;
    metaDescription: string;
    shortDescription: string;
    description: string;
    author: string;
    isActive: boolean;
    createdOn: string; // or you can use the Date type if you prefer
    thumbnailImageId: string;
    thumbnailImage: MediaDTO;
    blogItemLangs: BlogItemLangDTO[];
  }
  
  interface BlogItemLangDTO {
    blogItemId: string;
    languageId: string;
    name: string;
    metaTitle: string;
    metaKeywords: string;
    metaDescription: string;
    shortDescription: string;
    description: string;
  }