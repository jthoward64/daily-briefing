import { CampusDishMenu } from "./CampusDishMenu.js";
import { MenuProduct } from "./types/CampusDish.js";

const unimportantCategoryIDs = [
  "Condiments_11090",
  "Sauces_11090",
  "Condiments_8328",
  "Sauces_8328",
];

export function isProductImportant(menuProduct: MenuProduct): boolean {
  const { Product } = menuProduct;
  const categoryIds = Product.Categories.map((category) => category.CategoryId);

  let hasUnimportantCategory = false;

  for (const category of categoryIds) {
    if (unimportantCategoryIDs.includes(category)) {
      hasUnimportantCategory = true;
    } else {
      return true;
    }
  }

  return !hasUnimportantCategory;
}

export async function assembleMenuSentence() {
  // Output the day's menu
  let menuSentence = "";
  let wereProductsFound = false;

  // TODO use this api endpoint instead https://uky.campusdish.com/api/menu/GetMenuPeriods?locationId=11090&storeId=&date=03/21/2022&mode=Daily
  let todayMeals = ["Breakfast", "Lunch", "Dinner"] as (
    | "Breakfast"
    | "Lunch"
    | "Dinner"
    | "Brunch"
  )[];
  const today = new Date("3/20/22");
  if (today.getDay() === 0 || today.getDay() === 6) {
    todayMeals = ["Brunch", "Dinner"] as (
      | "Breakfast"
      | "Lunch"
      | "Dinner"
      | "Brunch"
    )[];
  }

  for (const mealPeriod of todayMeals) {
    menuSentence += `\nToday's ${mealPeriod} menu:\n`;

    const menu = new CampusDishMenu({
      date: today,
      location: "FreshFoodCompany",
      mealPeriod,
      mode: "Daily",
      excludedStationIDs: [
        "13878",
        "13880",
        "39895",
        "38109",
        "24552",
        "24555",
        "24542",
      ],
    });

    await menu.load();

    menu.stationIDs.forEach((stationID) => {
      const stationProducts = menu.getProductsAtStation(stationID);
      if (stationProducts) {
        const productNames = stationProducts
          .filter(isProductImportant)
          .map((product) => product.Product.MarketingName);

        menuSentence += `${menu.getStation(stationID).Name} is serving `;
        productNames.forEach((productName, i) => {
          wereProductsFound = true;
          if (i > 0) {
            if (i === productNames.length - 1) {
              menuSentence += ", and ";
            } else {
              menuSentence += ", ";
            }
          }
          menuSentence += productName.toLowerCase();
        });
        menuSentence += ".\n";
      }
    });
  }

  return wereProductsFound
    ? menuSentence
    : "\nThe dining hall is probably closed today\n";
}
