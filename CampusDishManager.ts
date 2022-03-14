import fetch from "node-fetch";
import {
  CampusDishApiRoot,
  MenuProduct,
  MenuStation,
} from "./types/CampusDish.js";

export type CampusDishQueryOptions = {
  location: "Fresh Food Company" | "Champions Kitchen";
  mealPeriod: "Breakfast" | "Brunch" | "Lunch" | "Dinner";
  mode: "Daily" | "Weekly";
  date: Date;
};
export async function getCampusDish(
  queryOptions: CampusDishQueryOptions
): Promise<CampusDishApiRoot> {
  let apiLocationId = "";
  switch (queryOptions.location) {
    case "Champions Kitchen":
      apiLocationId = "11090";
      break;
    case "Fresh Food Company":
      apiLocationId = "8328";
      break;
    default:
      console.error("Unknown location provided");
      break;
  }

  let apiPeriodId = "";
  switch (queryOptions.mealPeriod) {
    case "Breakfast":
      apiPeriodId = "1067";
      break;
    case "Lunch":
      apiPeriodId = "1068";
      break;
    case "Brunch":
      apiPeriodId =
        queryOptions.location === "Champions Kitchen" ? "11090" : "1070";
      break;
    case "Dinner":
      apiPeriodId = "1069";
      break;
    default:
      console.error("Unknown meal period provided");
      break;
  }

  const apiDate = queryOptions.date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const campusDishApiData = await fetch(
    `https://uky.campusdish.com/api/menu/GetMenus?locationId=${encodeURIComponent(
      apiLocationId
    )}&mode=${encodeURIComponent(queryOptions.mode)}&date=${encodeURIComponent(
      apiDate
    )}&periodId=${encodeURIComponent(apiPeriodId)}`,
    {
      headers: {
        Host: "uky.campusdish.com",
        Accept: "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br",
        "X-NewRelic-ID": "Uw4HVVJQGwYAVVNUBAMPUg==",
        Connection: "keep-alive",
        Referer:
          "https://uky.campusdish.com/LocationsAndMenus/ChampionsKitchen",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
      },
    }
  );
  return (await campusDishApiData.json()) as CampusDishApiRoot;
}

export function getProducts(
  menu: CampusDishApiRoot,
  excludedStationIDs: string[]
): {
  [key: string]: MenuProduct[];
} {
  const stationsById: { [key: number]: MenuStation } = {};

  menu.Menu.MenuStations.forEach((station) => {
    if (!excludedStationIDs.includes(station.StationId)) {
      stationsById[station.StationId] = station;
    }
  });

  const products = menu.Menu.MenuProducts;
  const productsAtStations: { [key: string]: MenuProduct[] } = {};
  products.forEach((product) => {
    if (!excludedStationIDs.includes(product.StationId)) {
      const productStationName = stationsById[product.StationId].Name;
      if (Array.isArray(productsAtStations[productStationName])) {
        productsAtStations[productStationName].push(product);
      } else {
        productsAtStations[productStationName] = [product];
      }
    }
  });
  return productsAtStations;
}

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

    const productsAtStations = getProducts(
      await getCampusDish({
        date: today,
        location: "Fresh Food Company",
        mealPeriod,
        mode: "Daily",
      }),
      ["13878", "13880", "39895", "38109", "24552", "24555", "24542"]
    );

    for (const stationName in productsAtStations) {
      if (
        Object.prototype.hasOwnProperty.call(productsAtStations, stationName)
      ) {
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

  return menuSentence;
}
