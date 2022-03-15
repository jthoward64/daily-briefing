export interface CampusDishApiRoot {
  Mode: number;
  Date: string;
  LocationId: string;
  StoreIds: any;
  SelectedPeriodId: string;
  Menu: Menu;
  DefaultMenuView: number;
  DisplayOnlyCurrentDayMenu: boolean;
  DisplayWeeklyMenu: boolean;
  DisplayDailyMenu: boolean;
  DisplayFoodOrderMenu: boolean;
  SelectedPeriodName: string;
  DisplayPriceOnTheMenu: boolean;
  HideProductsCalorie: boolean;
  HideProductsNutritional: boolean;
  HideEatWellIconsFromMenu: boolean;
  BottomOfNutritionalAttributes: string;
  CaloriesAdvice: any;
  EnableAllergenFiltering: boolean;
  AllergensTitle: string;
  SpecialDietsTitle: string;
  MenuConfigured: boolean;
  SeeMenuLink: any;
  Target: any;
  CategoriesTitle: string;
  IsCheckoutAndCartEnabled: boolean;
  HideProductsShortDescription: boolean;
  OnlyShowCurrentDaysOnlineOrdering: boolean;
  OnlyAllowFutureDaysOnlineOrdering: boolean;
  MinDate: string;
  FavoriteProductsModel: any;
  LinkToLoginPageWithReturnUrl: string;
  MenuFoodOrderingProducts: any;
  Legend: Legend;
  IsFavorites: boolean;
  IsDaily: boolean;
  IsWeekly: boolean;
  IsFoodOrder: boolean;
  DisplayProductImages: boolean;
  ShowAddToCalculatorButton: boolean;
  UserFavoritiesEnabled: boolean;
  CacheKey: string;
  IsCached: boolean;
  Location: Location;
  FulfillmentDelivery: boolean;
  FulfillmentPickup: boolean;
}

export interface Menu {
  MenuId: string;
  Name: string;
  LocationId: string;
  LocationName: any;
  StartDate: string;
  EndDate: string;
  Allergens: Allergen[];
  SpecialDiets: SpecialDiet[];
  MenuPeriods: MenuPeriod[];
  MenuProducts: MenuProduct[];
  MenuStations: MenuStation[];
  ShowCategories: boolean;
  Categories: Category[];
  DisplayPriceOnTheMenu: boolean;
  DisplayOnlyCurrentDayMenu: boolean;
  OnlyShowCurrentDaysOnlineOrdering: boolean;
  HideEatWellIconsFromMenu: boolean;
  ImportPrimaIngredients: boolean;
  DisplayFoodPreferenceFilter: boolean;
  MenuSourceSystem: number;
  ShowLegend: boolean;
  DisplayProductImageInFoodOrderingMenu: boolean;
  DisplayProductImageInDailyMenu: boolean;
}

export interface Allergen {
  Id: string;
  Name: string;
}

export interface SpecialDiet {
  Id: string;
  Name: string;
}

export interface MenuPeriod {
  PeriodId: string;
  Name: string;
  IsActive: boolean;
  UtcMealPeriodStartTime: string;
  UtcMealPeriodEndTime: string;
}

export interface MenuProduct {
  MenuProductId: string;
  ProductId: string;
  PeriodId: string;
  StationId: string;
  StationRank: number;
  MenuId: any;
  CatalogId: string;
  Product: Product;
  AssignedDate: string;
  IsDeemphasized: boolean;
  HasDeliverySlotInSchedule: boolean;
  IsUserFavorite: boolean;
}

export interface Product {
  ProductId: string;
  DisplayName: any;
  MarketingName: string;
  Description: string;
  ShortDescription: string;
  ImageUrl: string;
  CurrentPrice?: number;
  CurrentPriceCulture?: string;
  CurrencyCulture: string;
  Categories: Category[];
  DietaryInformation: DietaryInformation[];
  BrandId: any;
  Ingredients: any;
  LocationId: string;
  IsBulkProduct: boolean;
  Variants: any[];
  HasNutritionalInformation: boolean;
  AvailableFilters: AvailableFilters;
  ContainsEggs?: boolean;
  ContainsFish?: boolean;
  ContainsMilk?: boolean;
  ContainsPeanuts?: boolean;
  ContainsShellfish?: boolean;
  ContainsSoy?: boolean;
  ContainsTreeNuts?: boolean;
  ContainsWheat?: boolean;
  IsGlutenFree?: boolean;
  IsHalal?: boolean;
  IsKosher?: boolean;
  IsLocallyGrown: boolean;
  IsOrganic: boolean;
  IsVegan: boolean;
  IsVegetarian: boolean;
  ProductSummaries: any[];
  PrimaRecipeType: string;
  AllergenStatement: string;
  CatalogId: string;
  MinPickupTime: string;
  MinDeliveryTime: string;
  StoreId: any;
  DeliveryLeadTime: any;
  DeliveryLeadTimeFrame: any;
  IngredientsOrAllergensInconsisten: boolean;
  ServingSize?: string;
  ServingUnit?: string;
  Calories?: string;
  CaloriesFromFat?: string;
  TotalFat?: string;
  TransFat?: string;
  Cholesterol?: string;
  Sodium?: string;
  TotalCarbohydrates?: string;
  DietaryFiber?: string;
  Sugars?: string;
  Protein?: string;
  VitaminA: any;
  VitaminC?: string;
  Calcium?: string;
  Iron?: string;
  SaturatedFat?: string;
}

export interface Category {
  CategoryId: string;
  DisplayName: string;
  ImageUrl: any;
  Description: any;
  MenuRanking: number;
}

export interface DietaryInformation {
  IconUrl: string;
  Name: string;
  Description: string;
  IsDisabled: boolean;
  IsEnabled: boolean;
}

export interface AvailableFilters {
  ContainsEggs?: boolean;
  ContainsFish?: boolean;
  ContainsMilk?: boolean;
  ContainsPeanuts?: boolean;
  ContainsShellfish?: boolean;
  ContainsSoy?: boolean;
  ContainsTreeNuts?: boolean;
  ContainsWheat?: boolean;
  IsGlutenFree?: boolean;
  IsHalal?: boolean;
  IsLocallyGrown: boolean;
  IsOrganic: boolean;
  IsVegan: boolean;
  IsVegetarian: boolean;
  IsKosher?: boolean;
}

export interface MenuStation {
  StationId: string;
  StationRank: number;
  Name: string;
  Description: any;
  ImageUrl: any;
  BrandId: any;
  BrandName: any;
  CollapseDeemphasized: boolean;
  DisplayDeemphasizedType: number;
  PeriodId: string;
  StationDescription: string;
  StationImageSitecorePath: string;
  StationImagePath: any;
  StationImageSitecorePathExntensionless: string;
}

export interface Legend {
  Items: Item[];
  LinkUrl: any;
  LinkText: any;
}

export interface Item {
  IconUrl: string;
  Name: string;
  Description: string;
  IsDisabled: boolean;
  IsEnabled: boolean;
}

export interface Location {
  Contacts: any;
  PaymentMethods: any;
  PickupTimeLookup: any;
  Id: string;
  ModelName: string;
  Properties: Property[];
  HideEatWellIconsOnMenus: boolean;
  MerchantId: any;
  Email: any;
  Phone: any;
  GeoCode: any;
  Name: string;
  MarketingName: any;
  ShortName: any;
  Line1: any;
  Line2: any;
  Line3: any;
  City: any;
  RegionCode: string;
  PostalCode: string;
  CountryCode: string;
  ChannelGroupName: string;
  ChannelGroupId: string;
  HideProductsNutritional: boolean;
  HideProductsCalorie: boolean;
  HideProductsIngredients: boolean;
  CreditCardProviderVersion: number;
  CreditCardPaymentForm: any;
  HostedPaymentRedirectUrl: any;
  SessionToken: any;
  CreditCardProviderUrl: any;
  CreditCardProviderRequestErrorMessage: any;
  ClientId: any;
  TimeZoneInformation: TimeZoneInformation;
  HolidayDates: any[];
  DisplayOnlyCurrentDayMenu: boolean;
  DisplayPriceOnTheMenu: boolean;
  ShowPickupDate: boolean;
  ShowPickupTime: boolean;
  ShowRecipientEmail: boolean;
  ShowRecipientPhone: boolean;
  ShowSpecialInstructions: boolean;
  IsPickupTimeForEachMealPeriod: boolean;
  PickupTimeIncrement: number;
  DisplayDailyMenu: any;
  DisplayWeeklyMenu: any;
  DefaultMenuView: any;
  MenuLabel: any;
  MenuLabelingOption: number;
  EnableAllergenFiltering: boolean;
  UnderSpecialDietsHeading: string;
  UnderAllergensHeading: string;
  AllergensTitle: string;
  SpecialDietsTitle: string;
  BottomOfNutritionalAttributes: string;
  PatronManagementSystemID: number;
  LastMenuUpdatedDate: any;
  CategoriesTitle: string;
  LocationMarketingType: number;
  OrderEmailList: any;
  SendOrderEmails: boolean;
  SmsOrderNotifyEnabled: boolean;
  RealTimeOrderNotifyEnabled: boolean;
  MenuSourceSystem: number;
  OnlyShowCurrentDaysOnlineOrdering: boolean;
  OnlyAllowFutureDaysOnlineOrdering: boolean;
  OnlineOrdering: boolean;
  HideProductsShortDescription: boolean;
  ScheduledPaymentNotificationEmailList: any;
  SendScheduledPaymentNotifications: boolean;
  DeliveryLeadTime: any;
  DeliveryLeadTimeFrame: any;
  InternationalShipping: boolean;
  DisplayProductImageInDailyMenu: boolean;
  DisplayProductImageInFoodOrderingMenu: boolean;
  OutletCode: any;
  IsOutletCodeActive: boolean;
  DisplayProductImageInEmail: boolean;
  FulfillmentPickup: boolean;
  FulfillmentDelivery: boolean;
}

export interface Property {
  Key: string;
  Value: any;
}

export interface TimeZoneInformation {
  Target: Target;
  ModelName: string;
  Properties: Property[];
}

export interface Target {
  ModelName: string;
  Properties: Property[];
}
