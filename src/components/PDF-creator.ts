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

  const doc = new jsPDF();

  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text(type, 10, 10);

  doc.setFontSize(8);

  let y = 30;
  for (const phrase of Content[type].phrases) {
    doc.setFont("helvetica", "bold");
    doc.text(t(`${phrase}`), 10, y);
    doc.setFont("helvetica", "normal");
    doc.text(messages.value.eng[`${phrase}`].source, 10, y + 4);
    y = y + 12;
  }

  doc.save(`${type}.pdf`);
};
