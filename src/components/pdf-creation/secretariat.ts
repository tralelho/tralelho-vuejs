import { jsPDF } from "jspdf";
import { changePage, getMessage } from "./util";

export const createSecretariatPdf = function (
  translate: any,
  doc: any,
  content: any,
  y: number,
  messages: any,
  lang: string,
  font: string
): jsPDF {
  doc.setFontSize(12);
  doc.setFont(font, "normal");

  y = y + 5;

  doc.text(translate(`${content.subTitle}`), 10, y);
  doc.text(getMessage(messages, lang, `${content.subTitle}`), 10, y + 5);

  y = y + 20;

  // Identity
  doc.setFontSize(16);
  doc.setFont("arial", "bold");
  doc.text(
    translate(`${content.identity.title}`) +
      " / " +
      getMessage(messages, lang, `${content.identity.title}`),
    10,
    y
  );
  y = y + 10;

  doc.setFontSize(12);
  doc.setFont(font, "normal");

  for (const formElement of content.identity.checkList.form) {
    doc.setFont("arial", "bold");
    doc.text(translate(`${formElement.code}`), 20, y);
    doc.setFont(font, "normal");
    doc.text(getMessage(messages, lang, `${formElement.code}`), 20, y + 4);
    doc.text(formElement.response, 100, y + 4);
    y = y + 12;
  }

  for (const phrase of content.identity.checkList.list) {
    doc.setFont("arial", "bold");
    doc.text(translate(`${phrase}`), 12, y);
    doc.setFont(font, "normal");
    doc.text(getMessage(messages, lang, `${phrase}`), 12, y + 4);
    y = y + 12;
  }

  for (const phrase of content.identity.checkList.choice) {
    doc.rect(12, y, 4, 4);
    doc.setFont("arial", "bold");
    doc.text(translate(`${phrase}`), 20, y);
    doc.setFont(font, "normal");
    doc.text(getMessage(messages, lang, `${phrase}`), 20, y + 4);
    y = y + 12;
  }

  y = y + 5;

  for (const formElement of content.identity.checkList.form2) {
    doc.setFont("arial", "bold");
    doc.text(translate(`${formElement.code}`), 12, y);
    doc.setFont(font, "normal");
    doc.text(getMessage(messages, lang, `${formElement.code}`), 12, y + 4);
    doc.text(formElement.response, 200, y + 4, { align: "right" });
    y = y + 12;
  }

  y = y + 10;

  // Waiting
  doc.setFontSize(16);
  doc.setFont("arial", "bold");
  doc.text(
    translate(`${content.waiting.title}`) +
      " / " +
      getMessage(messages, lang, `${content.waiting.title}`),
    10,
    y
  );
  y = y + 10;

  doc.setFontSize(12);

  for (const phrase of content.waiting.list) {
    if (y >= 290) {
      doc.addPage();
      y = 10;
    }

    doc.setFont("arial", "bold");
    const originalPhrase = translate(`${phrase}`);
    doc.text(originalPhrase, 12, y, { maxWidth: 180 });
    doc.setFont(font, "normal");
    if (originalPhrase.length > 120) {
      y = y + 10;
    }

    const translatedPhrase = getMessage(messages, lang, `${phrase}`);
    doc.text(translatedPhrase, 12, y + 4, {
      maxWidth: 180,
    });
    if (translatedPhrase.length > 120) {
      y = y + 30;
    } else {
      y = y + 12;
    }
  }

  y = y + 10;

  // Welcome
  doc.setFontSize(16);
  doc.setFont("arial", "bold");
  doc.text(
    translate(`${content.welcome.title}`) +
      " / " +
      getMessage(messages, lang, `${content.welcome.title}`),
    10,
    y
  );
  y = y + 10;

  doc.setFontSize(12);

  for (const phrase of content.welcome.list) {
    if (y >= 290) {
      doc.addPage();
      y = 10;
    }

    doc.setFont("arial", "bold");
    const originalPhrase = translate(`${phrase}`);
    doc.text(originalPhrase, 12, y, { maxWidth: 180 });
    doc.setFont(font, "normal");

    const translatedPhrase = getMessage(messages, lang, `${phrase}`);
    doc.text(translatedPhrase, 12, y + 4, {
      maxWidth: 180,
    });
    y = y + 12;
  }

  return doc;
};
