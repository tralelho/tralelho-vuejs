import { useI18n } from "vue-i18n";
import { jsPDF } from "jspdf";
import Content from "../views/pdf/Content.json";
import { i18n } from "../main";

export enum PdfDocumentList {
  PATIENT = "Patient",
  PEDIATRIE = "Pédiatrie",
  SCANNER = "Scanner",
  IRM = "IRM",
  BLOC = "Bloc opératoire",
  SECRETARIAT = "Secretariat",
}

export const createPdf = function (type: PdfDocumentList) {
  const { t, messages } = i18n.global;

  let doc = new jsPDF();

  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text(type, 10, 10);

  doc.setFontSize(8);

  let y = 20;
  for (const phrase of Content[type].phrases) {
    doc.setFont("helvetica", "bold");
    doc.text(t(`${phrase}`), 10, y);
    doc.setFont("helvetica", "normal");
    doc.text(messages.value.eng[`${phrase}`].source, 10, y + 4);
    y = y + 12;
  }

  if (type === PdfDocumentList.SCANNER) {
    doc = createScannerPdf(t, doc, Content[type], y, messages);
  }

  doc.save(`${type}.pdf`);
};

const createScannerPdf = function (
  translate: any,
  doc: jsPDF,
  content: any,
  position: number,
  messages: any
): jsPDF {
  //CheckList
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.rect(10, position-1, 190, 8);
  doc.text("Checklist Scanner", 75, position + 5);
  position = position + 15;
  doc.setFontSize(8);

  for (const formElement of content.checkList.form) {
    doc.setFont("helvetica", "bold");
    doc.text(translate(`${formElement.code}`), 20, position);
    doc.setFont("helvetica", "normal");
    doc.text(
      messages.value.eng[`${formElement.code}`].source,
      20,
      position + 4
    );
    doc.text(formElement.response, 100, position + 4);
    position = position + 12;
  }

  position = position + 5;
  doc.setFont("helvetica", "bold");

  const startRectangle= position;

  doc.text(translate(`${content.checkList.responses[0]}`), 110, position);
  doc.text(messages.value.eng[`${content.checkList.responses[0]}`].source, 110, position + 4);
  doc.text(translate(`${content.checkList.responses[1]}`), 140, position);
  doc.text(messages.value.eng[`${content.checkList.responses[1]}`].source, 140, position + 4);
  doc.text(translate(`${content.checkList.responses[2]}`), 170, position);
  doc.text(messages.value.eng[`${content.checkList.responses[2]}`].source, 170, position + 4);

  position = position + 10;

  for (const phrase of content.checkList.list) {
    doc.setFont("helvetica", "bold");
    doc.text(translate(`${phrase}`), 12, position);
    doc.setFont("helvetica", "normal");
    doc.text(messages.value.eng[`${phrase}`].source, 12, position + 4);

    doc.rect(110, position, 5, 5);
    doc.rect(140, position, 5, 5);
    doc.rect(170, position, 5, 5);

    position = position + 12;
  }
  doc.rect(10, startRectangle-5, 190, position - startRectangle)

  position = position + 10;

  doc.setFont("helvetica", "bold");
  doc.text(translate(`${content.sign}`), 20, position);
  doc.setFont("helvetica", "normal");
  doc.text(messages.value.eng[`${content.sign}`].source, 20, position + 4);

  return doc;
};
