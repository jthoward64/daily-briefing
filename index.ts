import { assembleMenuSentence } from "./CampusDishManager.js";
import NewsAPI from "./NewsApiManager.js";
import secrets from "./secrets.js";

const username = "Tag";
const menuSentence = await assembleMenuSentence();
const newsApi = new NewsAPI(secrets.newsApiKey);
const top = await newsApi.getTopHeadlines({
  sources: ["associated-press"],
  pageSize: 5,
});

export async function handler() {
  let returnValue = "";
  returnValue += `Good morning ${username}.`;

  returnValue += menuSentence;

  returnValue += "In actual news, the current top five stories are:";
  top.articles.forEach(
    (article) => (returnValue += `${article.title.replace(/\./g, "")}.`)
  );

  const response = {
    statusCode: 200,
    body: returnValue,
  };
  console.log(response);
  return response;
}
