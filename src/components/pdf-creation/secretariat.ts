import { jsPDF } from "jspdf";
import { changePage, getMessage } from "./util";

export const createSecretariatPdf = function (
  translate: any,
  doc: any,
  contentElement: { phrases: {} },
  y: number,
  messages: any,
  lang: string,
  font: string
): jsPDF {
  for (const section of contentElement.sections) {
    doc.setFont("arial", "bold");
    doc.text(translate(`${section.title}`), 10, y);

    y = y + 8;

    doc.setFont("arial", "normal");
    for (const phrase of section.list) {
      y = changePage(doc, y);
      doc.text(translate(`${phrase}`), 20, y);
      doc.setFont(font, "normal");
      doc.text(getMessage(messages, lang, `${phrase}`), 20, y + 4);

      y = y + 12;
    }

    if (section.form) {
      for (const formElement of section.form) {
        y = changePage(doc, y);
        doc.setFont("arial", "bold");
        doc.text(translate(`${formElement}`), 20, y);
        doc.setFont(font, "normal");
        doc.text(getMessage(messages, lang, `${formElement}`), 20, y + 4);
        doc.text("_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _", 100, y + 4);
        y = y + 12;
      }
    }
  }

  return doc;
};
