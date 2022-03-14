import { assembleMenuSentence } from "./CampusDishManager.js";

const username = "Tag";

console.log(`Good morning ${username}.`);

const menuSentence = await assembleMenuSentence();
console.log(menuSentence);
