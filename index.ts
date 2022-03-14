import { assembleMenuSentence } from "./CampusDishManager.js";
import NewsAPI from "./NewsApiManager.js";
import secrets from "./secrets.js";

const username = "Tag";

console.log(`Good morning ${username}.`);

const menuSentence = await assembleMenuSentence();
console.log(menuSentence);

console.log("In actual news, the current top five stories are:");
const newsApi = new NewsAPI(secrets.newsApiKey);
const top = await newsApi.getTopHeadlines({
  sources: ["associated-press"],
  pageSize: 5,
});
top.articles.forEach((article) =>
  console.log(`${article.title.replace(/\./g, "")}.`)
);
