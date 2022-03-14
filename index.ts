import {
  getCampusDish,
  getProducts,
  isProductImportant,
} from "./CampusDishMenu.js";

const username = "Tag";

console.log(`Good morning ${username}`);

// Output the day's menu
let menuSentence = "";

// TODO use this api endpoint instead https://uky.campusdish.com/api/menu/GetMenuPeriods?locationId=11090&storeId=&date=03/21/2022&mode=Daily
let todayMeals = ["Breakfast", "Lunch", "Dinner"] as (
  | "Breakfast"
  | "Lunch"
  | "Dinner"
  | "Brunch"
)[];
const today = new Date("3/21/22");
if (today.getDay() === 0 || today.getDay() === 6) {
  todayMeals = ["Brunch", "Dinner"] as (
    | "Breakfast"
    | "Lunch"
    | "Dinner"
    | "Brunch"
  )[];
}

for (const mealPeriod of todayMeals) {
  menuSentence += `Today's ${mealPeriod} menu:\n`;

  const productsAtStations = getProducts(
    await getCampusDish({
      date: today,
      location: "Fresh Food Company",
      mealPeriod,
      mode: "Daily",
    }),
    []
  );

  for (const stationName in productsAtStations) {
    if (Object.prototype.hasOwnProperty.call(productsAtStations, stationName)) {
      const stationProducts = productsAtStations[stationName];
      const productNames = stationProducts
        .filter(isProductImportant)
        .map((product) => product.Product.MarketingName);

      menuSentence += `${stationName} is serving `;
      productNames.forEach((productName, i) => {
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
  }
}

console.log(menuSentence);
