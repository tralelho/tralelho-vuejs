"use strict";
require("events").EventEmitter.prototype._maxListeners = 20;
const fs = require("fs");
const readline = require("readline");
let i18n_fr = require("@/locales/fr.json");

const localesPath = "../src/locales/";

function listDirectory() {
  return fs
    .readdirSync(localesPath, { withFileTypes: true })
    .filter((item) => item.isDirectory())
    .map((item) => item.name);
}

async function getALlLines(readInterface) {
  const allLines = [];
  for await (const line of readInterface) {
    if (line.startsWith("msgid") || line.startsWith("msgstr")) {
      const sentence = line.substring(line.indexOf('"') + 1, line.length - 1);
      allLines.push(sentence);
    }
  }
  return allLines;
}

function findSentenceInFr(sentence) {
  if (sentence === "") return;
  let findKey;
  Object.keys(i18n_fr).some((key) => {
    return Object.entries(i18n_fr[key]).some(([key2, value]) => {
      if (value === sentence) {
        findKey = `${key}.${key2}`;
        return true;
      }
    });
  });
  if (!findKey) {
    return sentence;
  }
}

function toSlug(toBeSlugified) {
  const charactersToReplace =
    "àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœøṕŕßśșțùúüûǘẃẍÿź·/_,:;";
  const templateForReplacingCharacters =
    "aaaaaaaaceeeeghiiiimnnnooooooprssstuuuuuwxyz------";
  const specialCharsRegex = new RegExp(
    charactersToReplace.split("").join("|"),
    "g"
  );
  return toBeSlugified
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(specialCharsRegex, (character) =>
      templateForReplacingCharacters.charAt(
        charactersToReplace.indexOf(character)
      )
    ) // Replace special characters
    .replace(/&/g, "-and-") // Replace & with ‘and’
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

async function findNotIni18n() {
  const readInterface = readline.createInterface({
    input: fs.createReadStream(`./django_fr.po`),
    crlfDelay: Infinity,
  });

  const allLines = await getALlLines(readInterface);

  const result = { others: {} };

  for (let i = 0; i < allLines.length; i = i + 2) {
    const msgId = allLines[i];
    const sentence = findSentenceInFr(msgId);
    if (sentence) {
      result.others[toSlug(sentence)] = sentence;
    }
  }

  console.log(JSON.stringify(result));
}

findNotIni18n()
  .then(() => {
    console.log("End !");
  })
  .catch((e) => {
    console.error(e);
  });
