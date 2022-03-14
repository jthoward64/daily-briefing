import fetch from "node-fetch";
import {
  CampusDishApiRoot,
  MenuProduct,
  MenuStation,
} from "./types/CampusDish.js";

export async function getCampusDish(): Promise<CampusDishApiRoot> {
  const campusDishApiData = await fetch(
    "https://uky.campusdish.com/api/menu/GetMenus?locationId=11090&mode=Daily&date=03/22/2022",
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

export function getProducts(menu: CampusDishApiRoot): {
  [key: string]: MenuProduct[];
} {
  const stationsById: { [key: number]: MenuStation } = {};

  menu.Menu.MenuStations.forEach((station) => {
    stationsById[station.StationId] = station;
  });

  const products = menu.Menu.MenuProducts;
  const productsAtStations: { [key: string]: MenuProduct[] } = {};
  products.forEach((product) => {
    const productStationName = stationsById[product.StationId].Name;
    if (Array.isArray(productsAtStations[productStationName])) {
      productsAtStations[productStationName].push(product);
    } else {
      productsAtStations[productStationName] = [product];
    }
  });
  return productsAtStations;
}
