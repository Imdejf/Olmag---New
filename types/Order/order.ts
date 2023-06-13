export interface Order {
  userId: string;
  shippingAddressId: string;
  billingAddressId: string;
  shippingMethod: string;
  newAddress: Address;
  useShippingAddressAsBillingAddress: boolean;
  newBillingAddress?: Address;
  makeInvoiceVAT: boolean;
  acceptRegulations: boolean;
  acceptMarketing: boolean;
  orderNote: string;
  payment: Payment;
  deliveryMethod: DeliveryMethodType;
}

export interface Address {
    isCompany: boolean;
    firstName: string;
    email: string;
    lastName: string;
    companyName?: string;
    nip?: string;
    phone: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    zipCode: string;
    stateOrProvinceId: string;
    countryId: string;
    acceptRegulations: boolean
    acceptMarketing: boolean
  }

  export enum Payment {
    przelew24 = 0,
    cashOnDelivery = 1,
    standardTransfer = 2,
  }

  export enum DeliveryMethodType
  {
      courier,
      pickUpOwn
  }