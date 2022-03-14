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
      apiPeriodId = "1069";
      break;
    case "Dinner":
      apiPeriodId = "1070";
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
