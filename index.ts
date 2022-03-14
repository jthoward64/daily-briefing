import {
  getCampusDish,
  getProducts,
  isProductImportant,
} from "./CampusDishMenu.js";

let menu = await getCampusDish({
  date: new Date("3/21/2022"),
  location: "Fresh Food Company",
  mealPeriod: "Breakfast",
  mode: "Daily",
});

const productsAtStations = getProducts(menu);

for (const stationName in productsAtStations) {
  if (Object.prototype.hasOwnProperty.call(productsAtStations, stationName)) {
    const stationProducts = productsAtStations[stationName];
    console.log(`${stationName}:`);
    stationProducts.forEach((product) => {
      if (isProductImportant(product)) {
        console.log("\t" + product.Product.MarketingName);
      }
    });
  }
}
