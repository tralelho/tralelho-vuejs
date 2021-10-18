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
        return key2;
      }
    });
  });

  return findKey;
}

async function convert() {
  const dirs = listDirectory();

  let readInterface;

  for (const directory of dirs) {
    readInterface = readline.createInterface({
      input: fs.createReadStream(
        `${localesPath}/${directory}/LC_MESSAGES/django.po`
      ),
      crlfDelay: Infinity,
    });

    const allLines = await getALlLines(readInterface);

    const i18n = {};

    for (let i = 0; i < allLines.length; i = i + 2) {
      const msgId = allLines[i];
      const path = findSentenceInFr(msgId);
      if (path) {
        const i18n_keys = path.split(".");
        if (!i18n[i18n_keys[0]]) {
          i18n[i18n_keys[0]] = {};
        }
        i18n[i18n_keys[0]][i18n_keys[1]] = allLines[i + 1];
      }
    }

    const data = JSON.stringify(i18n, null, 2);
    fs.writeFileSync(`${directory}.json`, data);
  }
}

convert()
  .then(() => {
    console.log("End !");
  })
  .catch((e) => {
    console.error(e);
  });
