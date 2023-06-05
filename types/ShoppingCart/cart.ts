export interface CartDTO {
    id: string;
    lockedOnCheckout: boolean;
    couponCode: string;
    subTotal: number;
    subTotalGross: number;
    saveMoney: number;
    discount: number;
    couponValidationErrorMessage: string;
    isProductPriceIncludeTax: boolean;
    taxAmount?: number;
    orderNote: string;
    shippingAmount?: number;
    shippingAmountGross?: number;
    currentShippingAmountGross?: number;
    subTotalWithDiscount: number;
    subTotalWithDiscountWithoutTax: number;
    orderTotal: number;
    items: CartItemDTO[];
    shippingRule: ShippingRuleDTO[];
    isValid: boolean;
  }
  
  export interface CartItemDTO {
    id: string;
    productId: string;
    productName: string;
    productImage: string;
    productPrice: number;
    productPriceGross: number;
    productOldPrice: number;
    productStockQuantity: number;
    productStockTrackingIsEnabled: boolean;
    isProductAvailableToOrder: boolean;
    quantity: number;
    total: number;
    brandId: string;
    brand: BrandDTO;
    variationOptions: ProductVariationOptionDTO[];
  }
    
    interface BrandDTO {
      id: string;
      storeId: string;
      name: string;
      slug: string;
      description: string;
      isPublished: boolean;
      isDeleted: boolean;
      brandLangs: BrandLangDTO[];
  }
    
  interface BrandLangDTO {
    brandId: string;
    languageId: string;
    description: string;
  }

  interface ProductVariationOptionDTO {
     optionName: string;
     value: string;
  }

  interface ShippingRuleDTO {
    shippingRuleId: string;
    name: string;
    orderValue: number;
    active: boolean;
    combineProducts: boolean;
    shipmentPrice: number;
    partitioningForQuantity: boolean;
    conditionMinQuantity: number;
    conditionMaxQuantity: number;
    stackPallet: boolean;
    shipmentPricePallet: number;
    conditionMinForQuantityPallet: number;
    conditionMaxForQuantityPallet: number;
    cartItems: CartItemDTO[];
  }