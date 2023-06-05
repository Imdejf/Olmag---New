export interface ProductsByCategoryDTO {
    categoryId: string;
    parentCategorId: string | null;
    categoryName: string;
    categorySlug: string;
    categoryMetaTitle: string;
    categoryMetaKeywords: string;
    categoryMetaDescription: string;
    description:string;
    totalProduct: number;
    products: ProductDTO[];
    categoryLangs: CategoryLangDTO[];
    filterOption: FilterOption;
    currentSearchOption: SearchOptions;
}

export interface FilterOption {
    brands: FilterBrand[];
    categories: FilterCategory[];
    price: FilterPrice;
}

export interface FilterPrice {
    maxPrice: number;
    minPrice: number;
}

export interface FilterBrand {
    id: string;
    name: string;
    slug: string;
    count: number;
}
export
 interface FilterCategory {
    id: string;
    name: string;
    slug: string;
    count: number;
    parentId: string | null;
}

export interface CategoryLangDTO {
    name: string;
    description: string;
    metaKeywords: string;
    metaDescription: string;
    metaTitle: string;
    categoryId: string;
    languageId: string;
}

export interface ProductDTO {
    id: string;
    name: string;
    shortDescription: string;
    slug: string;
    price: number;
    oldPrice: number | null;
    specialPrice: number | null;
    isCallForPricing: boolean;
    isAllowToOrder: boolean;
    isBestseller: boolean;
    isNew: boolean;
    isSales: boolean;
    stockQuantity: number;
    specialPriceStart: string | null;
    specialPriceEnd: string | null;
    thumbnailImage: MediaDTO;
    thumbnailUrl: string;
    reviewsCount: number;
    ratingAverage: number | null;
    productLangs: ProductLangDTO[];
}

export interface ProductLangDTO {
    languageId: string;
    productId: string;
    name: string | null;
    normalizedName: string | null;
    shortDescription: string | null;
    description: string | null;
    specification: string | null;
    metaKeywords: string | null;
    metaDescription: string | null;
}

export interface MediaDTO {
    id: string;
    filePath: string | null;
    seoFileName: string | null;
    altAttribute: string;
    titleAttribute: string | null;
    mediaType: MediaType;
    mediaLangs: MediaLangDTO[];
}

export interface MediaLangDTO {
    mediaId: string;
    languageId: string;
    filePath: string | null;
    seoFileName: string | null;
    altAttribute: string;
    titleAttribute: string | null;
}

export interface SearchOptions {
    query: string | null;
    brand: string | null;
    category: string | null;
    page: number;
    pageSize: number;
    sort: string | null;
    minPrice: number | null;
    maxPrice: number | null;
}

enum MediaType {
    Text = 1,
    Color = 1
}