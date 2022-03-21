import fetch from "node-fetch";
import secrets from "./secrets.js";
import { WeatherApiRoot } from "./types/WeatherApi.js";

const latitude = 38.03399416760114;
const longitude = -84.47720985983197;

async function getWeather(): Promise<WeatherApiRoot> {
  const weatherDataRaw = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${secrets.weatherApiKey}&units=imperial&exclude=minutely,daily`
  );
  const weatherData = await weatherDataRaw.json();
  return weatherData as WeatherApiRoot;
}

export async function buildWeatherSentence(): Promise<string> {
  const { current, hourly } = await getWeather();

  const tempsForNext12 = hourly
    .filter((val, i) => i < 12)
    .map((hourWeather) => hourWeather.temp);
  const feelsLikeForNext12 = hourly
    .filter((val, i) => i < 12)
    .map((hourWeather) => hourWeather.temp);

  let lowFeelsLikeTemp = Math.round(feelsLikeForNext12[0]);
  let highFeelsLikeTemp = Math.round(feelsLikeForNext12[0]);

  const lowTemp = Math.round(
    tempsForNext12.reduce((prevTemp, currTemp, i) => {
      if (prevTemp < currTemp) {
        return prevTemp;
      } else {
        lowFeelsLikeTemp = feelsLikeForNext12[i];
        return currTemp;
      }
    })
  );
  const highTemp = Math.round(
    tempsForNext12.reduce((prevTemp, currTemp, i) => {
      console.log(hourly[i]);
      if (prevTemp > currTemp) {
        return prevTemp;
      } else {
        highFeelsLikeTemp = feelsLikeForNext12[i];
        return currTemp;
      }
    })
  );

  let weatherString = `The temperature right now is ${Math.round(
    current.temp
  )}°F, feeling like ${Math.round(
    current.feels_like
  )}°F, for the next 12 hours the high is ${highTemp}°F${
    // Only add the feels like if its different
    highTemp === highFeelsLikeTemp
      ? ""
      : `, feeling like ${highFeelsLikeTemp}°F`
  }, and the low is ${lowTemp}°F${
    // Only add the feels like if its different
    highTemp === highFeelsLikeTemp
      ? ""
      : `, feeling like ${lowFeelsLikeTemp}°F.`
  }`;

  // Exclude "Atmosphere", "Cloudy", or "Clear"
  const weatherConditions = hourly
    .filter((val, i) => i < 12)
    .map((hourWeather) => hourWeather.weather)
    .flat()
    .filter((hourWeatherCondition) => hourWeatherCondition.id < 700);
  if (Array.isArray(weatherConditions) && weatherConditions.length > 0) {
    weatherString += " In the next 12 hours it will ";
    for (let i = 0; i < weatherConditions.length; i++) {
      if (i > 0) {
        weatherString += " and ";
      }

      const weatherCondition = weatherConditions[i];
      // Is it "Atmosphere", "Cloudy", or "Clear"
      if (Math.floor(weatherCondition.id / 100) < 700) {
        // Is it "Cloudy"
        if (Math.floor(weatherCondition.id / 100) >= 800) {
          weatherString += weatherCondition.main;
        }
      } else {
        weatherString += weatherCondition.main;
      }
    }
    weatherString += ".";
  }

  return weatherString;
}
