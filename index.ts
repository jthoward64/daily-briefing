import fetch from "node-fetch";
import {
  CampusDishApiRoot,
  MenuProduct,
  MenuStation,
} from "./types/CampusDish";

let menu = (await (
  await fetch(
    "https://uky.campusdish.com/api/menu/GetMenus?locationId=11090&mode=Daily&date=02/19/2022",
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
  )
).json()) as CampusDishApiRoot;

const stationsById: { [key: number]: MenuStation } = {};

menu.Menu.MenuStations.forEach((station) => {
  stationsById[station.StationId] = station;
});

const products = menu.Menu.MenuProducts;
const productsAtStations: { [key: string]: MenuProduct[] } = {};
products.forEach((product) => {
  const productStationName = stationsById[product.StationId].Name;
  if(Array.isArray(productsAtStations[productStationName])) {
    productsAtStations[productStationName].push(product)
  } else {
    productsAtStations[productStationName] = [product]
  }
});

for (const stationName in productsAtStations) {
    if (Object.prototype.hasOwnProperty.call(productsAtStations, stationName)) {
        const stationProducts = productsAtStations[stationName];
        console.log(`${stationName}:`);
        stationProducts.forEach(product => {console.log('\t' + product.Product.MarketingName)})
    }
}
