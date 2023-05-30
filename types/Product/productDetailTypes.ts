export interface ProductDetailDTO {
    id: string;
    name: string;
    shortDescription: string;
    metaTitle: string;
    metaKeywords: string;
    metaDescription: string;
    description: string;
    price: number;
    priceGross: number;
    oldPrice?: number;
    productAvailability: ProductAvailability;
    specialPrice?: number;    
    specification: string;
    isCallForPricing: boolean;
    isAllowToOrder: boolean;
    isBestseller: boolean;
    isNew: boolean;
    isSales: boolean;
    thumbnailImage: string;
    stockTrackingIsEnabled: boolean;
    stockQuantity: number;
    reviewsCount: number;
    ratingAverage?: number;
    hasVariation: boolean;
    availableOptions: ProductDetailOptionDTO[];
    optionDisplayValues: { [key: string]: ProductOptionDisplayDTO };
    images: MediaViewDTO[];
    variations: ProductDetailVariationDTO[];
    attributes: ProductDetailAttributeDTO[];
    categories: ProductDetailCategoryDTO[];
    relatedProducts: ProductDTO[];
    crossSellProducts: ProductDTO[];
    brand: BrandDTO;
  }

  export enum ProductAvailability {
    Available = 0,
    SellerConfirmation = 1,
    ThreeToSevenDays = 2,
    ThreeToTenDays = 3,
    TwoWeeks = 4,
    ThreeWeeks = 5,
    ThreeToFiveWeeks = 6,
    TemporarilyUnavailable = 7,
    ToOrder = 8,
  }

  interface ProductDTO {
    id: string;
    name: string;
    brandName: string;
    slug: string;
    shortDescription: string;
    productAvailability: ProductAvailability;
    price: number;
    oldPrice?: number;
    specialPrice?: number;
    isCallForPricing: boolean;
    isAllowToOrder: boolean;
    isBestseller: boolean;
    isHomePage: boolean;
    isNew: boolean;
    isSales: boolean;
    stockQuantity?: number;
    specialPriceStart?: Date;
    specialPriceEnd?: Date;
    thumbnailImage: MediaDTO;
    thumbnailUrl: string;
    reviewsCount: number;
    ratingAverage?: number;
    productLangs: ProductLangDTO[];
}

interface ProductLangDTO {
    languageId: string;
    productId: string;
    name?: string;
    normalizedName?: string;
    shortDescription?: string;
    description?: string;
    specification?: string;
    metaKeywords?: string;
    metaDescription?: string;
}
  
  interface ProductDetailOptionDTO {
    optionId: string;
    optionName: string;
    values: string[];
  }
  
  interface ProductOptionDisplayDTO {
    value: string;
    displayType: DisplayType;
  }
  
  enum DisplayType {
    Text,
    Color,
  }
  
  interface MediaViewDTO {
    url: string;
    thumbnailUrl: string;
  }
  
  interface ProductDetailVariationDTO {
    id: string;
    name: string;
    normalizedName: string;
    isCallForPricing: boolean;
    price: number;
    productAvailability: ProductAvailability;
    oldPrice: number;
    isAllowToOrder: boolean;
    stockQuantity: number;
    stockTrackingIsEnabled: boolean;
    images: MediaDTO[];
    options: ProductDetailVariationOptionDTO[];
  }
  
  interface ProductDetailVariationOptionDTO {
    optionId: string;
    optionName: string;
    value: string;
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
  
  interface ProductDetailAttributeDTO {
    name: string;
    value: string;
  }
  
  interface ProductDetailCategoryDTO {
    id: string;
    name: string;
    slug: string;
  }
  

interface BrandDTO {
    id: string;
    storeId: string;
    name: string;
    slug: string;
    description: string;
    isPublished: boolean;
    isDeleted: boolean;
  }