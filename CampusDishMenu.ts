import fetch from "node-fetch";
import {
  CampusDishApiRoot,
  MenuProduct,
  MenuStation,
} from "./types/CampusDish";

type CampusDishQueryOptions = {
  location: "FreshFoodCompany" | "ChampionsKitchen";
  mealPeriod: "Breakfast" | "Brunch" | "Lunch" | "Dinner";
  mode: "Daily" | "Weekly";
  date: Date;
  excludedStationIDs: string[];
};

export class CampusDishMenu {
  protected _apiRoot: CampusDishApiRoot;
  protected readonly queryOptions: CampusDishQueryOptions;
  protected isLoadedYet: boolean;

  protected stationsById: { [key: string]: MenuStation } = {};
  protected productListsByStationId: { [key: string]: MenuProduct[] } = {};

  public get apiRoot() {
    if (!this.isLoadedYet) {
      throw new Error(
        "You must call the 'load' method on an instance of CampusDishMenu before accessing its members"
      );
    }
    return this._apiRoot;
  }

  public get categories() {
    if (!this.isLoadedYet) {
      throw new Error(
        "You must call the 'load' method on an instance of CampusDishMenu before accessing its members"
      );
    }
    return this._apiRoot.Menu.Categories;
  }

  public get stationIDs() {
    if (!this.isLoadedYet) {
      throw new Error(
        "You must call the 'load' method on an instance of CampusDishMenu before accessing its members"
      );
    }
    return Object.keys(this.stationsById);
  }

  public get periodName() {
    if (!this.isLoadedYet) {
      throw new Error(
        "You must call the 'load' method on an instance of CampusDishMenu before accessing its members"
      );
    }
    return this._apiRoot.SelectedPeriodName;
  }

  constructor(queryOptions: CampusDishQueryOptions) {
    this.isLoadedYet = false;
    this.queryOptions = queryOptions;
  }

  public async load() {
    let apiLocationId = "";
    switch (this.queryOptions.location) {
      case "ChampionsKitchen":
        apiLocationId = "11090";
        break;
      case "FreshFoodCompany":
        apiLocationId = "8328";
        break;
      default:
        console.error("Unknown location provided");
        break;
    }

    let apiPeriodId = "";
    switch (this.queryOptions.mealPeriod) {
      case "Breakfast":
        apiPeriodId = "1067";
        break;
      case "Lunch":
        apiPeriodId = "1068";
        break;
      case "Brunch":
        apiPeriodId =
          this.queryOptions.location === "ChampionsKitchen" ? "11090" : "1070";
        break;
      case "Dinner":
        apiPeriodId = "1069";
        break;
      default:
        console.error("Unknown meal period provided");
        break;
    }

    const apiDate = this.queryOptions.date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const campusDishApiData = await fetch(
      `https://uky.campusdish.com/api/menu/GetMenus?locationId=${encodeURIComponent(
        apiLocationId
      )}&mode=${encodeURIComponent(
        this.queryOptions.mode
      )}&date=${encodeURIComponent(apiDate)}&periodId=${encodeURIComponent(
        apiPeriodId
      )}`,
      {
        headers: {
          Host: "uky.campusdish.com",
          Accept: "application/json, text/plain, */*",
          "Accept-Language": "en-US,en;q=0.5",
          "Accept-Encoding": "gzip, deflate, br",
          "X-NewRelic-ID": "Uw4HVVJQGwYAVVNUBAMPUg==",
          Connection: "keep-alive",
          Referer: `https://uky.campusdish.com/LocationsAndMenus/${encodeURIComponent(
            this.queryOptions.location
          )}}`,
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-origin",
        },
      }
    );

    this._apiRoot = (await campusDishApiData.json()) as CampusDishApiRoot;
    this.isLoadedYet = true;

    this._apiRoot.Menu.MenuStations.forEach((station) => {
      if (!this.queryOptions.excludedStationIDs.includes(station.StationId)) {
        if (station.PeriodId === this._apiRoot.SelectedPeriodId) {
          this.stationsById[station.StationId] = station;
        }
      }
    });

    this._apiRoot.Menu.MenuProducts.forEach((product) => {
      if (!this.queryOptions.excludedStationIDs.includes(product.StationId)) {
        if (Array.isArray(this.productListsByStationId[product.StationId])) {
          this.productListsByStationId[product.StationId].push(product);
        } else {
          this.productListsByStationId[product.StationId] = [product];
        }
      }
    });
  }

  public getStation(id: string) {
    if (!this.isLoadedYet) {
      throw new Error(
        "You must call the 'load' method on an instance of CampusDishMenu before accessing its members"
      );
    }
    return this.stationsById[id];
  }

  public getProductsAtStation(id: string) {
    if (!this.isLoadedYet) {
      throw new Error(
        "You must call the 'load' method on an instance of CampusDishMenu before accessing its members"
      );
    }
    return this.productListsByStationId[id];
  }
}
