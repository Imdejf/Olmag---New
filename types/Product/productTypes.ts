export interface ProductDTO {
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

interface MediaDTO {
    id: string;
    filePath?: string;
    seoFileName?: string;
    altAttribute?: string;
    titleAttribute?: string;
    mediaLangs: MediaLangDTO[];
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

interface MediaLangDTO {
    languageId: string;
    mediaId: string;
    altAttribute?: string;
    titleAttribute?: string;
}