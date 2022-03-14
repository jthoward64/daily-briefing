import { getCampusDish, getProducts } from "./CampusDishMenu.js";
import {
  CampusDishApiRoot,
  MenuProduct,
  MenuStation,
} from "./types/CampusDish.js";

let menu = await getCampusDish();

const productsAtStations = getProducts(menu);

for (const stationName in productsAtStations) {
  if (Object.prototype.hasOwnProperty.call(productsAtStations, stationName)) {
    const stationProducts = productsAtStations[stationName];
    console.log(`${stationName}:`);
    stationProducts.forEach((product) => {
      console.log("\t" + product.Product.MarketingName);
    });
  }
}
