<script lang="ts" setup>
import { Field, configure } from "vee-validate";
import { object, array, boolean, string, ref as yupRef } from "yup";
import {
  Combobox,
  Switch,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from "@headlessui/vue";
import { useCart } from "~/stores/cart";
import {
  Order,
  Address,
  DeliveryMethodType,
  Payment,
} from "~/types/Order/order";

export interface ISectionItem {
  id: number;
  section: string;
  name: string;
}

export interface IStateOrProvince {
  id: number;
  name: string;
}

// compiler macro
definePageMeta({
  layout: "cart",
});

const cart = useCart();

const showSpinner = ref(false);
const acceptMarketing = ref(false);
const acceptRegulations = ref(false);
const useShippingAddressAsBillingAddress = ref(true);

const invoiceIsCompany = ref(true);

const paymentMethodId = ref("");
const paymentMethodChecked = ref(false);

const deliveryMethodId = ref("");
const deliveryMethodChecked = ref(false);

const stateOrProvinces = ref([] as IStateOrProvince[]);
const selectAll = ref(false);
let selected = ref(null);
const isSelected = ref(true);
let selectedOnAnotherAddress = ref(null);
let query = ref("");

let filteredProvince = computed(() =>
  query.value === ""
    ? stateOrProvinces.value
    : stateOrProvinces.value.filter((stateOrProvince) =>
        stateOrProvince.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.value.toLowerCase().replace(/\s+/g, ""))
      )
);

const selectAllHandle = () => {
  if (selectAll.value == true) {
    acceptMarketing.value = false;
    acceptRegulations.value = false;
    selectAll.value = false;
  } else {
    acceptMarketing.value = true;
    acceptRegulations.value = true;
    selectAll.value = true;
  }
};

const lastSectionId = ref(1);
const activeSectionId = ref({
  id: 1,
  section: "data",
});

const changeSection = (value: ISectionItem) => {
  lastSectionId.value = activeSectionId.value.id;
  activeSectionId.value = {
    id: value.id,
    section: value.section,
  };
};

const nextSection = () => {
  const nextStep = sections.value.find(
    (c) => c.id == activeSectionId.value.id + 1
  );
  lastSectionId.value = activeSectionId.value.id;
  if (nextStep) {
    activeSectionId.value = {
      id: nextStep.id,
      section: nextStep.section,
    };
  }
  window.scrollTo(0, 150);
};

const sections = computed((): ISectionItem[] => [
  {
    id: 1,
    section: "data",
    name: "Data",
  },
  {
    id: 2,
    section: "delivery",
    name: "Delivery",
  },
  {
    id: 3,
    section: "payment",
    name: "Payment",
  },
  {
    id: 4,
    section: "summary",
    name: "Summary",
  },
]);

const initialValues = {
  invoiceIsCompany: true,
  paymentMethodChecked: paymentMethodChecked.value,
  deliveryMethodChecked: deliveryMethodChecked.value,
  billingAnotherAddress: false,
  billingAnotherAddressIsCompany: true,
  email: "",
  companyName: "",
  nip: "",
  firstName: "",
  lastName: "",
  phone: "",
  addressLine1: "",
  postalCode: "",
  // country: '',
  city: "",
  addresses: [
    {
      company: "",
      firstName: "",
      lastName: "",
      phone: "",
      street: "",
      addressLine1: "",
      postalCode: "",
      // country: '',
      city: "",
    },
  ],
  paymentMethod: "",
  deliveryMethod: "",
  acceptMarketing: false,
  acceptRegulations: false,
};

onMounted(async () => {
  await cart.getCartDetail(true);
  if (cart.cart.items.length === 0) {
    navigateTo("/checkout/cart");
  }
  const dsStore = useCookie("dsStore");
  Fetch("/product/shoppingcart/GetAvilableAddresses", {
    method: "get",
    params: {
      storeId: dsStore,
    },
  }).then((response) => {
    response.data.value.stateOrProvinces.map((stateProvince) => {
      stateOrProvinces.value.push({
        id: stateProvince.value,
        name: stateProvince.text,
      });
    });
  });
});

configure({
  validateOnBlur: true, // controls if `blur` events should trigger validation with `handleChange` handler
  validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
  validateOnInput: false, // controls if `input` events should trigger validation with `handleChange` handler
  validateOnModelUpdate: true, // controls if `update:modelValue` events should trigger validation with `handleChange` handler
});

const acceptRegulationsValid = boolean().test(
  "acceptRegulations",
  "Wartość nie spełnia wymagań",
  (value) => {
    if (value) {
      return true;
    }
    return false;
  }
);

const methodDeliveryType = ref("");
const methodPaymentType = ref("");

const schema = object({
  email: string().required("Uzupełnij adres e-mail").label("Email"),
  companyName: string().when("invoiceIsCompany", {
    is: true,
    then: (schema) => schema.required("Uzupełnij nazwę firmy."),
  }),
  nip: string().when("invoiceIsCompany", {
    is: true,
    then: (schema) => schema.required("Uzupełnij NIP firmy."),
  }),
  paymentMethod: string().when("paymentMethodChecked", {
    is: false,
    then: (schema) => schema.required("Wybierz metodę płatności."),
  }),
  deliveryMethod: string().when("deliveryMethodChecked", {
    is: false,
    then: (schema) => schema.required("Wybierz metodę dostawy."),
  }),
  firstName: string().required("Uzupełnij imię"),
  lastName: string().required("Uzupełnij nazwisko"),
  phone: string().required("Uzupełnij numer telefonu"),
  postalCode: string().required("Uzupełnij kod pocztowy"),
  //country: string().required().label('Country'),
  city: string().required("Uzupełnij miasto"),
  street: string().required("Uzupełnij ulicę"),
  billingAddress: object().when("billingAnotherAddress", {
    is: true,
    then: () =>
      object().shape({
        companyName: string().required("Uzupełnij imię."),
        lastName: string().required("Uzupełnij nazwisko."),
        phone: string().required("Uzupełnij numer telefonu."),
        street: string().required("Uzupełnij ulicę."),
        number: string().required("Uzupełnij numer budynku."),
        postalCode: string().required("Uzupełnij kod pocztowy."),
        // country: string().required('Country is required.'),
        city: string().required("Uzupełnij miasto."),
      }),
  }),
  acceptRegulations: acceptRegulationsValid,
});

const changeInvoceType = (value: boolean) => {
  invoiceIsCompany.value = value;
  initialValues.invoiceIsCompany = value;
};

const onlySelectedHandle = () => {
  selectAll.value = false;
};

const billingAnotherAddress = ref(false);

const billingAnotherAddressHandle = () => {
  billingAnotherAddress.value = !billingAnotherAddress.value;
};

const billingAnotherAddressIsCompany = ref(true);

const billingAnotherAddressIsCompanyHandle = () => {
  billingAnotherAddressIsCompany.value = !billingAnotherAddressIsCompany.value;
};

const changeDeliveryMethod = (value: number) => {
  const dsUser = useCookie("dsCustomer");
  Fetch("/product/shoppingcart/ChangeDeliveryMethod", {
    method: "put",
    body: {
      userId: dsUser,
      deliveryMethod: value,
    },
  }).then(() => {
    cart.getCartDetail(true);
  });
};

const changePaymentMethod = (value: number) => {
  methodPaymentType.value = value.toString();
  const dsUser = useCookie("dsCustomer");
  Fetch("/product/shoppingcart/ChangePaymentMethod", {
    method: "put",
    body: {
      userId: dsUser,
      payment: value,
    },
  }).then(() => {
    cart.getCartDetail(true);
  });
};

const handleOrder = async (values, actions) => {
  if (selected.value == null) {
    isSelected.value = false;
    return;
  }
  isSelected.value = true;

  showSpinner.value = true;
  const dsUser = useCookie("dsCustomer");
  const countryId = "0b64292c-e249-4906-ab48-429441745899";
  const languageId = useCookie("dsLanguage");
  const order: Order = {
    userId: dsUser.value,
    languageId: languageId.value,
    newAddress: {
      companyName: values.companyName,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      nip: values.nip,
      phone: values.phone,
      addressLine1: values.addressLine1,
      addressLine2: "",
      zipCode: values.postalCode,
      city: values.city,
      stateOrProvinceId: selected.value.id,
      countryId: countryId,
    },
    useShippingAddressAsBillingAddress:
      useShippingAddressAsBillingAddress.value,
    makeInvoiceVAT: true,
    acceptRegulations: values.acceptRegulations,
    acceptMarketing: values.acceptMarketing,
    orderNote: values.orderNote,
    orderNote: "",
    deliveryMethod: +values.deliveryMethod,
    payment: +values.paymentMethod,
    shippingMethod: DeliveryMethodType[+values.deliveryMethod],
    ExistingShippingAddresses: [],
  };

  if (useShippingAddressAsBillingAddress.value === false) {
    order.newBillingAddress = {
      companyName: values.billingAddress.companyName,
      firstName: values.billingAddress.firstName,
      lastName: values.billingAddress.lastName,
      email: values.billingAddress.email,
      nip: values.billingAddress.nip,
      phone: values.billingAddress.phone,
      addressLine1: values.billingAddress.addressLine1,
      addressLine2: "",
      zipCode: values.postalCode,
      city: values.billingAddress.city,
      stateOrProvinceId: selected.value.id,
      // stateOrProvinceId: values.billingAddress.stateOrProvinceId,
      countryId: countryId,
    };
  }

  const orderId = await Fetch("/product/checkout/shipping", {
    method: "post",
    body: order,
  });

  if (+values.paymentMethod === 0) {
    await Fetch("/v1/PaymentPrzelewy/RegisterTransactionP24", {
      method: "post",
      body: {
        storeId: useCookie("dsStore"),
        userId: useCookie("dsCustomer"),
        orderId: orderId.data.value.data,
      },
    }).then((response) => {
      const externalUrl = response.data.value.data;
      window.location.href = externalUrl;
    });
  } else {
    navigateTo("/checkout/summary?orderId=" + orderId.data.value.data);
  }
  showSpinner.value = false;
};
</script>
<template>
  <PageWrapper>
    <PageHeader class="container mx-auto block">
      <BannerSteps :value="2" />
    </PageHeader>
    <PageBody>
      <VForm
        ref="form"
        :validation-schema="schema"
        :initial-values="initialValues"
        @submit="handleOrder"
        v-slot="{ setValues, meta: formMeta, errors: formErrors }"
      >
        <PageSection>
          <div class="container items-center mx-auto md:py-8">
            <div class="inline-flex justify-center items-center w-full">
              <hr
                class="my-8 w-full h-px bg-gray-200 border-0.5 border-gray-300"
              />
              <h1
                class="absolute px-5 font-semibold text-2xl text-green-400 bg-light-200"
              >
                Zamówienie
              </h1>
            </div>
            <div class="mb-5">
              <div class="sm:hidden inline-block w-full">
                <div
                  class="container flex justify-between h-13 mx-auto md:justify-center md:space-x-8 border-b-1 border-gray-300 mb-3"
                >
                  <ul class="items-stretch space-x-3 gap-3 flex m-auto">
                    <li v-for="(item, i) in sections" :key="i" class="flex">
                      <a
                        @change="changeSection(item)"
                        rel="noopener noreferrer"
                        href="#"
                        class="flex uppercase font-semibold text-xs items-center"
                        >{{ item.name }}</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <div class="relative overflow-x-hidden md:flex md:gap-10">
                <div
                  class="md:w-1/3 h-max rounded-md md:border-1 top-0 border-gray-300 bg-white"
                >
                  <div
                    class="relative p-3 <sm:transform duration-600 ease-out transition-all"
                    :class="
                      activeSectionId.section == 'data'
                        ? 'opacity-100 !-translate-x-0/2 '
                        : activeSectionId.id >= lastSectionId
                        ? 'opacity-0 sm:opacity-1 !-translate-x-3/2 absolute '
                        : 'opacity-0 sm:opacity-1 !-translate-x-3/2 absolute '
                    "
                  >
                    <div class="bg-white">
                      <div>
                        <h2 class="font-semibold text-xl mb-4">
                          1. Twoje dane
                        </h2>
                      </div>
                      <div class="border-b border-gray-400">
                        <button
                          class="items-center rounded border-2 w-full border-emerald-400 px-8 py-3 text-emerald-400 hover:bg-emerald-400 hover:text-white focus:outline-none focus:ring duration-400"
                        >
                          <span class="text-md font-semibold"> Zaloguj </span>

                          <Icon
                            name="material-symbols:arrow-right-alt-rounded"
                            class="w-6 h-6"
                          />
                        </button>
                        <div class="text-center text-sm mt-2 font-medium mb-4">
                          Masz już konto? Kliknij żeby się zalogować.
                        </div>
                      </div>
                      <div class="my-4">
                        <div class="flex items-center justify-center">
                          <Field
                            type="radio"
                            name="invoiceIsCompany"
                            @click="changeInvoceType(false)"
                            :value="false"
                          />
                          <label
                            for="data-radio-1"
                            class="ml-2 text-sm mr-2 font-medium text-black"
                            >Osoba prywatna</label
                          >
                          <Field
                            type="radio"
                            name="invoiceIsCompany"
                            @click="changeInvoceType(true)"
                            :value="true"
                          />
                          <label
                            for="data-radio-2"
                            class="ml-2 text-sm font-medium text-black"
                            >Firma</label
                          >
                        </div>
                      </div>
                      <FormVTextInput
                        type="text"
                        name="email"
                        label="Email*"
                        placeholder="Email*"
                      />
                      <FormVTextInput
                        v-show="invoiceIsCompany"
                        type="text"
                        name="companyName"
                        placeholder="Firma*"
                        label="Firma*"
                        class="w-full"
                      />
                      <FormVTextInput
                        v-show="invoiceIsCompany"
                        name="nip"
                        type="text"
                        placeholder="NIP"
                        label="NIP"
                        class="w-full"
                        :nipActive="true"
                      />
                      <div>
                        <FormVTextInput
                          type="text"
                          name="firstName"
                          placeholder="Imie*"
                          label="Imie*"
                          class="w-full"
                        />
                        <FormVTextInput
                          type="text"
                          name="lastName"
                          placeholder="Nazwisko*"
                          label="Nazwisko*"
                          class="w-full"
                        />
                        <FormVTextInput
                          type="text"
                          name="phone"
                          placeholder="Telefon*"
                          label="Telefon*"
                          class="w-full"
                        />
                        <div class="flex gap-3">
                          <FormVTextInput
                            type="text"
                            name="street"
                            placeholder="Ulica i numer domu*"
                            label="Ulica i numer domu*"
                            class="w-2/3"
                          />
                        </div>
                        <div class="flex gap-2">
                          <FormVTextInput
                            type="text"
                            name="postalCode"
                            :fontSize="2"
                            placeholder="Kod pocztowy*"
                            label="Kod pocztowy*"
                            class="w-2/5"
                          />
                          <FormVTextInput
                            type="text"
                            name="city"
                            placeholder="Miasto*"
                            label="Miasto*"
                            class="w-3/5"
                          />
                        </div>
                        <div>
                          <span class="text-sm">Województwo</span>
                          <div class="top-16 w-full">
                            <Combobox v-model="selected">
                              <div class="relative mt-1">
                                <div
                                  class="relative w-full cursor-default outline-none overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
                                  style="border: 1px solid #e2e8f0"
                                >
                                  <ComboboxInput
                                    class="w-full py-2 pl-3 pr-10 outline-none text-sm leading-5 text-gray-900"
                                    :displayValue="(person) => person?.name"
                                    @change="query = $event.target.value"
                                  />
                                  <ComboboxButton
                                    class="absolute inset-y-0 right-0 flex items-center pr-2"
                                  >
                                    <ChevronUpDownIcon
                                      class="h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                  </ComboboxButton>
                                </div>
                                <TransitionRoot
                                  leave="transition ease-in duration-100"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                  @after-leave="query = ''"
                                >
                                  <ComboboxOptions
                                    class="block mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                  >
                                    <div
                                      v-if="
                                        filteredProvince.length === 0 &&
                                        query !== ''
                                      "
                                      class="relative cursor-default select-none py-2 px-4 text-gray-700"
                                    >
                                      Nie znaleziono.
                                    </div>

                                    <ComboboxOption
                                      v-for="person in filteredProvince"
                                      as="template"
                                      :key="person.id"
                                      :value="person"
                                      v-slot="{ selected, active }"
                                    >
                                      <li
                                        class="relative cursor-default select-none py-2 pl-10 pr-4"
                                        :class="{
                                          'bg-emerald-50 text-blue-900': active,
                                          'text-gray-900': !active,
                                        }"
                                      >
                                        <span
                                          class="block truncate"
                                          :class="{
                                            'font-medium': selected,
                                            'font-normal': !selected,
                                          }"
                                        >
                                          {{ person.name }}
                                        </span>
                                        <span
                                          v-if="selected"
                                          class="absolute inset-y-0 left-0 flex items-center pl-3"
                                          :class="{
                                            'text-blue-900': active,
                                            'text-blue-800': !active,
                                          }"
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="w-5 h-5"
                                            viewBox="0 0 24 24"
                                          >
                                            <path
                                              fill="currentColor"
                                              d="m10 16.4l-4-4L7.4 11l2.6 2.6L16.6 7L18 8.4l-8 8Z"
                                            />
                                          </svg>
                                        </span>
                                      </li>
                                    </ComboboxOption>
                                  </ComboboxOptions>
                                </TransitionRoot>
                              </div>
                            </Combobox>
                          </div>
                          <span class="help text-red-600 text-sm">
                            {{ isSelected ? "" : "Wybierz województwo" }}</span
                          >
                        </div>
                      </div>
                      <div class="form-group form-check text-lefty mt-4">
                        <label
                          class="form-check-label inline-block text-gray-800 cursor-pointer"
                          >Dane na fakturze takie same jak dane dostawy?</label
                        >
                        <div>
                          <Switch
                            v-model="useShippingAddressAsBillingAddress"
                            @click="billingAnotherAddressHandle"
                            :class="
                              useShippingAddressAsBillingAddress
                                ? 'bg-emerald-400'
                                : 'bg-gray-200'
                            "
                            class="relative inline-flex h-6 w-11 items-center rounded-full"
                          >
                            <span class="sr-only">Enable notifications</span>
                            <span
                              :class="
                                useShippingAddressAsBillingAddress
                                  ? 'translate-x-6'
                                  : 'translate-x-1'
                              "
                              class="inline-block h-4 w-4 transform rounded-full bg-white transition"
                            />
                          </Switch>
                          <span class="ml-2">{{
                            billingAnotherAddress ? "Tak" : "Nie"
                          }}</span>
                        </div>
                      </div>
                      <div v-show="billingAnotherAddress">
                        <div class="my-4">
                          <div class="flex items-center justify-center">
                            <Field
                              type="radio"
                              name="billingAnotherAddressIsCompany"
                              @click="billingAnotherAddressIsCompanyHandle"
                              :value="false"
                            />
                            <label
                              for="data-radio-1"
                              class="ml-2 text-sm mr-2 font-medium text-black"
                              >Osoba prywatna</label
                            >
                            <Field
                              type="radio"
                              name="billingAnotherAddressIsCompany"
                              @click="billingAnotherAddressIsCompanyHandle"
                              :value="true"
                            />
                            <label
                              for="data-radio-2"
                              class="ml-2 text-sm font-medium text-black"
                              >Firma</label
                            >
                          </div>
                        </div>
                        <div>
                          <FormVTextInput
                            v-show="billingAnotherAddressIsCompany"
                            type="text"
                            name="billingAddress.companyName"
                            placeholder="Firma*"
                            label="Firma*"
                            class="w-full"
                          />
                          <FormVTextInput
                            type="text"
                            name="billingAddress.firstName"
                            placeholder="Imie*"
                            label="Imie*"
                            class="w-full"
                          />
                          <FormVTextInput
                            type="text"
                            name="billingAddress.lastName"
                            placeholder="Nazwisko*"
                            label="Nazwisko*"
                            class="w-full"
                          />
                          <FormVTextInput
                            type="text"
                            name="billingAddress.phone"
                            placeholder="Telefon*"
                            label="Telefon*"
                            class="w-full"
                          />
                          <div class="flex gap-3">
                            <FormVTextInput
                              type="text"
                              name="billingAddress.street"
                              placeholder="Ulica*"
                              label="Ulica*"
                              class="w-2/3"
                            />
                            <FormVTextInput
                              type="text"
                              name="billingAddress.number"
                              placeholder="Nr*"
                              label="Nr*"
                              class="w-1/3"
                            />
                          </div>
                          <div class="flex gap-2">
                            <FormVTextInput
                              type="text"
                              name="billingAddress.postalCode"
                              :fontSize="2"
                              label="Kod pocztowy*"
                              placeholder="Kod pocztowy*"
                              class="w-2/5"
                            />
                            <FormVTextInput
                              type="text"
                              name="billingAddress.city"
                              placeholder="Miasto*"
                              label="Miasto*"
                              class="w-3/5"
                            />
                          </div>
                          <div>
                            <span class="text-sm">Województwo</span>
                            <div class="top-16 w-72">
                              <Combobox v-model="selectedOnAnotherAddress">
                                <div class="relative mt-1">
                                  <div
                                    class="relative w-full cursor-default outline-none overflow-hidden rounded-lg border-1 border-solid border-gray-400 bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
                                  >
                                    <ComboboxInput
                                      class="w-full py-2 pl-3 pr-10 outline-none text-sm leading-5 text-gray-900"
                                      :displayValue="(person) => person?.name"
                                      @change="query = $event.target.value"
                                    />
                                    <ComboboxButton
                                      class="absolute inset-y-0 right-0 flex items-center pr-2"
                                    >
                                      <ChevronUpDownIcon
                                        class="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                      />
                                    </ComboboxButton>
                                  </div>
                                  <TransitionRoot
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                    @after-leave="query = ''"
                                  >
                                    <ComboboxOptions
                                      class="block mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                    >
                                      <div
                                        v-if="
                                          filteredProvince.length === 0 &&
                                          query !== ''
                                        "
                                        class="relative cursor-default select-none py-2 px-4 text-gray-700"
                                      >
                                        Nie znaleziono.
                                      </div>

                                      <ComboboxOption
                                        v-for="person in filteredProvince"
                                        as="template"
                                        :key="person.id"
                                        :value="person"
                                        v-slot="{
                                          selectedOnAnotherAddress,
                                          active,
                                        }"
                                      >
                                        <li
                                          class="cursor-default select-none py-2 pl-10 pr-4"
                                          :class="{
                                            'bg-teal-600 text-white': active,
                                            'text-gray-900': !active,
                                          }"
                                        >
                                          <span
                                            class="block truncate"
                                            :class="{
                                              'font-medium':
                                                selectedOnAnotherAddress,
                                              'font-normal':
                                                !selectedOnAnotherAddress,
                                            }"
                                          >
                                            {{ person.name }}
                                          </span>
                                          <span
                                            v-if="selectedOnAnotherAddress"
                                            class="absolute inset-y-0 left-0 flex items-center pl-3"
                                            :class="{
                                              'text-white': active,
                                              'text-teal-600': !active,
                                            }"
                                          >
                                            <CheckIcon
                                              class="h-5 w-5"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        </li>
                                      </ComboboxOption>
                                    </ComboboxOptions>
                                  </TransitionRoot>
                                </div>
                              </Combobox>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p class="mt-4">* Wymagane pola</p>
                      <div class="border-b border-gray-400 mt-7 md:hidden">
                        <button
                          @click="nextSection()"
                          class="items-center rounded border-2 w-full border-green-400 px-8 py-3 text-white bg-green-400 hover:bg-white hover:text-green-400 focus:outline-none focus:ring active:bg-green-400 duration-400"
                        >
                          <span class="text-sm font-semibold uppercase">
                            Przejdź do wyboru metody dostawy
                          </span>

                          <Icon
                            name="material-symbols:arrow-right-alt-rounded"
                            class="w-6 h-6"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="<sm:flex md:w-1/3">
                  <div
                    class="relative <sm:top-0 <sm:transform w-full duration-600 ease-out transition-all"
                    :class="
                      activeSectionId.section == 'delivery'
                        ? 'opacity-100 !-translate-x-0/2 <sm:p-0'
                        : activeSectionId.id >= lastSectionId
                        ? '<sm:opacity-0 !-translate-x-3/2  <sm:absolute'
                        : lastSectionId > 3
                        ? '<sm:opacity-0 !-translate-x-3/2  <sm:absolute'
                        : '<sm:opacity-0 !translate-x-3/2 <sm:absolute'
                    "
                  >
                    <div
                      class="md:border-1 p-3 rounded-md border-gray-300 px-3 bg-white <sm:transform duration-600 ease-out transition-all"
                      :class="`${
                        activeSectionId.section == 'delivery' ? '' : ''
                      } ${
                        formErrors.deliveryMethod != null
                          ? 'border-red-600'
                          : ''
                      }`"
                    >
                      <div>
                        <h2 class="font-semibold text-xl mb-4">
                          2. Metoda dostawy
                        </h2>
                      </div>
                      <div class="items-center">
                        <div class="flex items-center">
                          <Field
                            name="deliveryMethod"
                            v-model="methodDeliveryType"
                            @click="changeDeliveryMethod(0)"
                            type="radio"
                            class="w-5 h-5"
                            value="0"
                          />
                          <Icon name="mdi:truck-fast" />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-10 w-10 ml-3"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M3 13.5L2.25 12H7.5l-.6-1.5H2L1.25 9h7.8l-.6-1.5H1.11L.25 6H4a2 2 0 0 1 2-2h12v4h3l3 4v5h-2a3 3 0 0 1-3 3a3 3 0 0 1-3-3h-4a3 3 0 0 1-3 3a3 3 0 0 1-3-3H4v-3.5H3m16 5a1.5 1.5 0 0 0 1.5-1.5a1.5 1.5 0 0 0-1.5-1.5a1.5 1.5 0 0 0-1.5 1.5a1.5 1.5 0 0 0 1.5 1.5m1.5-9H18V12h4.46L20.5 9.5M9 18.5a1.5 1.5 0 0 0 1.5-1.5A1.5 1.5 0 0 0 9 15.5A1.5 1.5 0 0 0 7.5 17A1.5 1.5 0 0 0 9 18.5Z"
                            />
                          </svg>
                          <label
                            for="disabled-radio-1"
                            class="ml-2 text-sm mr-2 text-md font-medium text-black"
                            >Kurier</label
                          >
                          <label
                            class="ml-auto text-sm justify-end mr-2 text-lg font-semibold text-black"
                            >{{
                              cart.cart?.shippingAmountGross?.toFixed(2)
                            }}
                            zł</label
                          >
                        </div>
                        <div class="pt-3 text-13px text-wrap leading-4">
                          Szczegóły odnośnie przewoźnika realizującego Twoją
                          dostawę otrzymasz mailowo po złożeniu zamówienia.
                          <br />Przewidywana dostawa w 1-2 dni robocze
                        </div>
                      </div>
                      <div class="items-center">
                        <div class="flex items-center">
                          <Field
                            name="deliveryMethod"
                            v-model="methodDeliveryType"
                            @click="changeDeliveryMethod(1)"
                            type="radio"
                            class="w-5 h-5"
                            value="1"
                          />

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-10 w-10 ml-3"
                            viewBox="0 0 576 512"
                          >
                            <path
                              fill="currentColor"
                              d="M408 120c0 54.6-73.1 151.9-105.2 192c-7.7 9.6-22 9.6-29.6 0C241.1 271.9 168 174.6 168 120C168 53.7 221.7 0 288 0s120 53.7 120 120zm8 80.4c3.5-6.9 6.7-13.8 9.6-20.6c.5-1.2 1-2.5 1.5-3.7l116-46.4c15.8-6.3 32.9 5.3 32.9 22.3v270.8c0 9.8-6 18.6-15.1 22.3L416 503V200.4zm-278.4-62.1c2.4 14.1 7.2 28.3 12.8 41.5c2.9 6.8 6.1 13.7 9.6 20.6v251.4L32.9 502.7C17.1 509 0 497.4 0 480.4V209.6c0-9.8 6-18.6 15.1-22.3l122.6-49zM327.8 332c13.9-17.4 35.7-45.7 56.2-77v249.3l-192-54.9V255c20.5 31.3 42.3 59.6 56.2 77c20.5 25.6 59.1 25.6 79.6 0zM288 152a40 40 0 1 0 0-80a40 40 0 1 0 0 80z"
                            />
                          </svg>
                          <label
                            for="disabled-radio-1"
                            class="ml-2 text-sm mr-2 text-md font-medium text-black"
                            >Odbiór własny</label
                          >
                          <label
                            class="ml-auto text-sm justify-end mr-2 text-lg font-semibold text-black"
                            >0,00 zł</label
                          >
                        </div>
                        <div class="pt-3 text-13px text-wrap leading-4">
                          Szczegóły odnośnie przewoźnika realizującego Twoją
                          dostawę otrzymasz mailowo po złożeniu zamówienia.
                          <br />Przewidywana dostawa w 1-2 dni robocze
                        </div>
                      </div>
                      <span class="help text-red-600 text-sm">{{
                        formErrors.deliveryMethod
                      }}</span>
                      <div class="border-b border-gray-400 mt-7 md:hidden">
                        <button
                          @click="nextSection()"
                          class="items-center rounded border-2 w-full border-green-400 px-8 py-3 text-white bg-green-400 hover:bg-white hover:text-green-400 focus:outline-none focus:ring active:bg-green-400 duration-400"
                        >
                          <span class="text-sm font-semibold uppercase">
                            Przejdź do wyboru metody dostawy
                          </span>

                          <Icon
                            name="material-symbols:arrow-right-alt-rounded"
                            class="w-6 h-6"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    class="relative rounded-md border-1 border-gray-300 p-3 <sm:top-0 w-full <sm:transform duration-600 ease-out transition-all bg-white md:mt-5"
                    :class="`${
                      activeSectionId.section == 'payment'
                        ? 'opacity-100 !-translate-x-0/2 '
                        : activeSectionId.id >= lastSectionId &&
                          activeSectionId.id > 3
                        ? '<sm:opacity-0 !-translate-x-3/2 <sm:absolute'
                        : '<sm:opacity-0 !translate-x-3/2 <sm:absolute'
                    }
                        ${activeSectionId.section == 'delivery' ? '' : ''} ${
                      formErrors.paymentMethod != null ? '!border-red-600' : ''
                    }`"
                  >
                    <div
                      :class="
                        activeSectionId.section != 'payment' ? '<sm:hidden' : ''
                      "
                    >
                      <h2 class="font-semibold text-xl mb-4">
                        3. Metoda płatności
                      </h2>
                    </div>
                    <div class="flex items-center mt-4">
                      <Field
                        name="paymentMethod"
                        v-model="methodPaymentType"
                        @click="changePaymentMethod(2)"
                        type="radio"
                        class="w-5 h-5"
                        value="2"
                      />

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-8 w-8 ml-3"
                        viewBox="0 0 48 48"
                      >
                        <mask id="ipSBankTransfer0">
                          <g
                            fill="none"
                            stroke-linejoin="round"
                            stroke-width="4"
                          >
                            <rect
                              width="40"
                              height="28"
                              x="4"
                              y="10"
                              fill="#fff"
                              stroke="#fff"
                              rx="2"
                            />
                            <path
                              stroke="#000"
                              stroke-linecap="round"
                              d="M4 20h40"
                            />
                            <path
                              stroke="#fff"
                              stroke-linecap="round"
                              d="M4 17v6m40-6v6"
                            />
                            <path
                              stroke="#000"
                              stroke-linecap="round"
                              d="M29 29h8"
                            />
                          </g>
                        </mask>
                        <path
                          fill="currentColor"
                          d="M0 0h48v48H0z"
                          mask="url(#ipSBankTransfer0)"
                        />
                      </svg>
                      <label
                        for="disabled-radio-2"
                        class="ml-2 text-sm mr-2 text-md font-medium text-black"
                        >Przelew standardowy</label
                      >
                      <label
                        class="ml-auto text-sm justify-end mr-2 text-lg font-semibold text-black"
                        >0,00 zł</label
                      >
                    </div>
                    <div class="flex items-center mt-4">
                      <Field
                        name="paymentMethod"
                        v-model="methodPaymentType"
                        @click="changePaymentMethod(1)"
                        type="radio"
                        class="w-5 h-5"
                        value="1"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-8 w-8 ml-3"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M200.4 27.39L180.9 183h42.8l49.1-146.57l-72.4-9.04zm91.7 8L242.7 183l149.7.1l34.3-102.61l-134.6-45.1zM180 46.03l-71.9 7.84L122.2 183h40.7L180 46.03zM64 153c-11.5 0-19.18 8.8-21.27 17.2c-1.04 4.2-.45 7.6.73 9.5c1.17 1.8 2.79 3.3 8.54 3.3h52.1l-3.3-30H64zm357.4 0l-10 30h47.5c-2.6-5-3.7-10.3-3-15.6c.7-5.2 2.7-9.9 5.3-14.4h-39.8zM41 201v246.9c0 5.1 2.79 11.1 7.37 15.7C52.96 468.2 59 471 64 471l384 .1c5 0 11-2.8 15.6-7.4c4.6-4.6 7.4-10.6 7.4-15.7v-71h-87c-44 0-44-82 0-82h87v-93.9L41 201zm343 112c-20 0-20 46 0 46h22.3c-9-3.8-15.3-12.7-15.3-23s6.3-19.2 15.3-23H384zm41.7 0c9 3.8 15.3 12.7 15.3 23s-6.3 19.2-15.3 23H487v-46h-61.3zm-9.7 16c-4 0-7 3-7 7s3 7 7 7s7-3 7-7s-3-7-7-7z"
                        />
                      </svg>
                      <label
                        for="disabled-radio-2"
                        class="ml-2 text-sm mr-2 text-md font-medium text-black"
                        >Płatość za pobraniem</label
                      >
                      <label
                        class="ml-auto text-sm justify-end mr-2 text-lg font-semibold text-black"
                        >9,99 zł</label
                      >
                    </div>
                    <div class="flex items-center mt-4">
                      <Field
                        name="paymentMethod"
                        v-model="methodPaymentType"
                        @click="changePaymentMethod(0)"
                        type="radio"
                        class="w-5 h-5"
                        value="0"
                      />
                      <img
                        src="/assets/content/przelewy24.png"
                        class="ml-3 w-14 h-8"
                        alt="Logo Przelewy24"
                      />
                      <label
                        for="disabled-radio-2"
                        class="ml-2 text-sm mr-2 text-md font-medium text-black"
                        >Przelew online</label
                      >
                      <label
                        class="ml-auto text-sm justify-end mr-2 text-lg font-semibold text-black"
                        >0,00 zł</label
                      >
                    </div>
                    <span class="help text-red-600 text-sm">{{
                      formErrors.paymentMethod
                    }}</span>
                    <div class="border-b border-gray-400 mt-7 md:hidden">
                      <button
                        @click="nextSection()"
                        class="items-center rounded border-2 w-full border-green-400 px-8 py-3 text-white bg-green-400 hover:bg-white hover:text-green-400 focus:outline-none focus:ring active:bg-green-400 duration-400"
                      >
                        <span class="text-sm font-semibold uppercase">
                          Przejdź do podsumowania
                        </span>

                        <Icon
                          name="material-symbols:arrow-right-alt-rounded"
                          class="w-6 h-6"
                        />
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  class="md:w-1/3 <sm:top-0 <sm:transform duration-600 ease-out transition-all"
                  :class="`${
                    activeSectionId.section != 'data' ? '' : '<sm:hidden'
                  }
                ${
                  activeSectionId.section == 'summary'
                    ? 'opacity-100 !-translate-x-0/2 <sm:p-0 relative'
                    : activeSectionId.id >= lastSectionId
                    ? '<sm:opacity-0 !translate-x-3/2  <sm:absolute'
                    : '<sm:opacity-0 !translate-x-3/2 <sm:!absolute'
                }
                `"
                >
                  <div
                    class="border-1 rounded-md border-gray-300 bg-white"
                    :class="
                      activeSectionId.section != 'summary' ? '<sm:hidden' : ''
                    "
                  >
                    <div class="p-3">
                      <div class="border-b-2 border-gray-300">
                        <h2 class="font-semibold text-xl mb-1">
                          4. Podsumowanie
                        </h2>
                        <NuxtLink
                          class="text-green-400 text-12px hover:text-green-300 hover:underline"
                          text="Śledź zamówienie"
                          to="cart"
                          >Edytuj koszyk</NuxtLink
                        >
                      </div>
                      <div>
                        <ul class="divide-y divide-gray-700">
                          <li
                            v-for="item in cart.cart?.items"
                            :key="item.id"
                            class="py-6 sm:flex-row sm:justify-between"
                          >
                            <div class="flex w-full space-x-2 sm:space-x-4">
                              <img
                                class="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-24 sm:h-24"
                                :src="item.productImage"
                                :alt="item.productName"
                              />
                              <div class="w-full pb-4">
                                <div class="flex w-full pb-2 space-x-2">
                                  <div class="space-y-1">
                                    <h3
                                      class="text-md font-semibold leading-snug sm:pr-8"
                                    >
                                      {{ item.productName }}
                                    </h3>
                                  </div>
                                </div>
                                <div class="flex text-sm justify-between">
                                  <div>
                                    <div>
                                      <p
                                        v-for="variationOption in item.variationOptions"
                                        :key="variationOption.optionName"
                                        class="mt-1 text-sm text-gray-500"
                                      >
                                        {{ variationOption.optionName }}:
                                        {{ variationOption.value }}
                                      </p>
                                    </div>
                                    <div>Ilość: {{ item.quantity }}</div>
                                  </div>
                                  <div class="justify-end text-right">
                                    <p
                                      class="text-sm line-through text-red-600"
                                    >
                                      {{ item.productOldPrice?.toFixed(2) }} zł
                                    </p>
                                    <p class="text-lg font-semibold">
                                      {{ item.productPrice?.toFixed(2) }} zł
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="block mt-2">
                              <!-- <button
                                class="text-green-400 text-sm hover:text-green-300 hover:underline"
                              >
                                Główne cechy produktu »
                              </button> -->
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="bg-slate-200 py-2">
                      <div class="flex items-center">
                        <span
                          class="ml-2 text-sm mr-2 text-md font-medium text-black"
                          >Wartość produktów</span
                        >
                        <span
                          class="ml-auto text-sm justify-end mr-2 text-md font-medium text-black"
                          >{{ cart.cart?.subTotalGross?.toFixed(2) }} zł</span
                        >
                      </div>
                      <div class="flex items-center py-3">
                        <span
                          class="ml-2 text-sm mr-2 text-md font-medium text-black"
                          >Koszt transportu</span
                        >
                        <span
                          class="ml-auto text-sm justify-end mr-2 text-md font-medium text-black"
                          >{{
                            cart.cart?.currentShippingAmountGross?.toFixed(2)
                          }}
                          zł</span
                        >
                      </div>
                      <div class="flex items-center mt-3 mb-1">
                        <span
                          class="ml-2 text-sm mr-2 text-lg font-bold text-blue-900"
                          >Łącznie
                        </span>
                        <span
                          class="ml-auto text-sm justify-end mr-2 text-xl font-bold text-blue-900"
                          >{{ cart.cart?.orderTotal.toFixed(2) }}</span
                        >
                      </div>
                      <div class="flex items-center text-red-500">
                        <span class="ml-2 text-sm mr-2 text-1rem font-medium"
                          >Oszczędzasz
                        </span>
                        <span
                          class="ml-auto text-sm justify-end mr-2 text-xl font-semibold"
                          >{{ cart.cart?.saveMoney.toFixed(2) }} zł</span
                        >
                      </div>
                    </div>
                    <div class="border-1 rounded-b-md border-gray-300 bg-white">
                      <div class="p-3">
                        <div
                          class="form-group flex form-check gap-3 text-lefty mt-4"
                        >
                          <Field
                            name="checkbox"
                            :value="true"
                            v-model="selectAll"
                            @click="selectAllHandle"
                            type="checkbox"
                            class="appearance-none h-4 min-w-[15px] border-2 border-gray-300 rounded-sm bg-white checked:bg-green-400 checked:border-green-400 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                          />
                          <label
                            class="form-check-label inline-block text-gray-800 cursor-pointer"
                            >Zaznacz wszystkie</label
                          >
                        </div>
                        <div
                          class="form-group flex form-check gap-3 text-left mt-4"
                        >
                          <Field
                            type="checkbox"
                            v-model="acceptMarketing"
                            name="acceptMarketing"
                            @click="onlySelectedHandle"
                            :value="true"
                            class="appearance-none h-4 min-w-[15px] border-2 border-gray-300 rounded-sm bg-white checked:bg-green-400 checked:border-green-400 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                            :class="`${
                              formErrors.acceptMarketing != null
                                ? 'border-red-600'
                                : ''
                            }`"
                          />
                          <label
                            class="form-check-label inline-block text-gray-800 cursor-pointer"
                            >Zgoda na przetwarzanie danych osobowych w celach
                            marketingowych</label
                          >
                        </div>
                        <div
                          class="form-group flex form-check gap-3 text-lefty mt-4"
                        >
                          <Field
                            type="checkbox"
                            v-model="acceptRegulations"
                            name="acceptRegulations"
                            @click="onlySelectedHandle"
                            :value="true"
                            class="appearance-none h-4 min-w-[15px] border-2 border-gray-300 rounded-sm bg-white checked:bg-green-400 checked:border-green-400 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                            :class="`${
                              formErrors.acceptRegulations != null
                                ? 'border-red-600'
                                : ''
                            }`"
                          />
                          <label
                            class="form-check-label inline-block text-gray-800 cursor-pointer"
                            >*Oświadczam, że zapoznałem się z treścią
                            <a class="font-semibold hover:underline"
                              >Regulaminu</a
                            >
                            serwisu i akceptuję jego postanowienia.</label
                          >
                        </div>
                        <div class="border-b border-gray-400 mt-7">
                          <button
                            class="items-center rounded border-2 w-full border-emerald-400 px-8 py-3 text-white bg-emerald-400 hover:bg-white hover:text-emerald-400 focus:outline-none focus:ring duration-400"
                          >
                            <span
                              v-show="!showSpinner"
                              class="text-sm font-semibold uppercase"
                            >
                              Zamawiam i płacę
                            </span>
                            <Icon
                              v-show="!showSpinner"
                              name="material-symbols:arrow-right-alt-rounded"
                              class="w-6 h-6"
                            />
                            <div v-show="showSpinner" role="status">
                              <svg
                                aria-hidden="true"
                                class="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                  fill="currentColor"
                                />
                                <path
                                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                  fill="currentFill"
                                />
                              </svg>
                              <span class="text-14px"
                                >Przetwarzanie zamówienia...</span
                              >
                              <span class="sr-only">Loading...</span>
                            </div>
                          </button>
                        </div>
                        <div
                          class="text-12px text-gray-500 leading-5 mt-3 text-font"
                        >
                          <p>
                            Administratorem Twoich danych osobowych jest Data
                            Sharp z siedzibą w Przytocznej . Twoje dane osobowe
                            będą przetwarzane w celu realizacji procesu
                            zakupowego, działań marketingowych, wypełnienia
                            obowiązków wynikających z przepisów prawa oraz
                            obrony i dochodzenia ewentualnych roszczeń.
                            Szczegółowe informacje na temat przetwarzania Twoich
                            danych osobowych, w tym o przysługujących Ci prawach
                            znajdziesz w [<a
                              class="text-gray-600 font-semibold hover:underline cursor-pointer"
                              >Polityce Prywatności: Złożenie zamówienia</a
                            >
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageSection>
      </VForm>
    </PageBody>
  </PageWrapper>
</template>
