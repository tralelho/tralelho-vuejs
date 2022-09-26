import { PdfDocumentList } from "./PDF-creator";
import { jsPDF } from "jspdf";
import { getMessage } from "./util";

export const createIRMAndScannerPdf = function (
  translate: any,
  type: PdfDocumentList,
  doc: jsPDF,
  content: any,
  position: number,
  messages: any,
  lang: string
): jsPDF {
  //CheckList
  doc.setFontSize(16);
  doc.setFont("arial", "bold");
  doc.rect(10, position - 1, 190, 8);
  doc.text(`Checklist ${type}`, 75, position + 5);
  position = position + 15;
  doc.setFontSize(8);

  for (const formElement of content.checkList.form) {
    doc.setFont("arial", "bold");
    doc.text(translate(`${formElement.code}`), 20, position);
    doc.setFont("CODE2000", "normal");
    doc.text(
      getMessage(messages, lang, `${formElement.code}`),
      20,
      position + 4
    );
    doc.text(formElement.response, 100, position + 4);
    position = position + 12;
  }

  position = position + 5;
  doc.setFont("arial", "bold");

  const startRectangle = position;

  doc.text(translate(`${content.checkList.responses[0]}`), 110, position);
  doc.text(
    getMessage(messages, lang, `${content.checkList.responses[0]}`),
    110,
    position + 4
  );
  doc.text(translate(`${content.checkList.responses[1]}`), 140, position);
  doc.text(
    getMessage(messages, lang, `${content.checkList.responses[1]}`),
    140,
    position + 4
  );
  doc.text(translate(`${content.checkList.responses[2]}`), 170, position);
  doc.text(
    getMessage(messages, lang, `${content.checkList.responses[2]}`),
    170,
    position + 4
  );

  position = position + 10;
  let pageAdded = false;

  for (const phrase of content.checkList.list) {
    if (position >= 290) {
      doc.rect(10, startRectangle - 5, 190, position - startRectangle);
      doc.addPage();
      pageAdded = true;
      position = 10;
    }
    doc.setFont("arial", "bold");
    doc.text(translate(`${phrase}`), 12, position);
    doc.setFont("CODE2000", "normal");
    doc.text(getMessage(messages, lang, `${phrase}`), 12, position + 4);

    doc.rect(110, position, 5, 5);
    doc.rect(140, position, 5, 5);
    doc.rect(170, position, 5, 5);

    position = position + 12;
  }

  if (pageAdded) {
    doc.rect(10, 5, 190, position);
  } else {
    doc.rect(10, startRectangle - 5, 190, position - startRectangle);
  }

  position = position + 15;

  doc.setFont("arial", "bold");
  doc.text(translate(`${content.sign}`), 20, position);
  doc.setFont("CODE2000", "normal");
  doc.text(getMessage(messages, lang, `${content.sign}`), 20, position + 4);

  return doc;
};
