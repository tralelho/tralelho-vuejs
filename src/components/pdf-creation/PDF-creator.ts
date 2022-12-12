import { jsPDF } from "jspdf";
import Content from "./configuration.json";
import { i18n } from "../../main";
import { createPatientPdf } from "./patient";
import { createSecretariatPdf } from "./secretariat";
import { createIRMAndScannerPdf } from "./irmAndScanner";
import { getMessage } from "./util";
import "./fonts/CODE2000-normal";
import "./fonts/NotoSansSinhala-Regular-normal.js";

export enum PdfDocumentList {
  PATIENT = "Patient",
  PEDIATRIE = "Pédiatrie",
  SCANNER = "Scanner",
  IRM = "IRM",
  BLOC = "Bloc opératoire",
  SECRETARIAT = "Secretariat",
}

export const createPdf = function (
  type: PdfDocumentList,
  messages: any,
  lang?: string | string[]
) {
  lang = lang || "fra";

  let font = "CODE2000";

  if (lang === "sin") {
    font = "NotoSansSinhala-Regular";
  }

  const doc = buildPdfContent(type, messages, lang, font);

  doc.save(`${type}.pdf`);
};

const buildPdfContent = function (
  type: PdfDocumentList,
  messages: any,
  lang: string,
  font: string
): jsPDF {
  const { t } = i18n.global;

  if (type === PdfDocumentList.PATIENT) {
    return createPatientPdf(t, Content[type], messages, lang, font);
  }

  let doc = new jsPDF();

  doc.setFontSize(24);
  doc.setFont("arial", "bold");
  doc.text(type, 10, 10);

  doc.setFontSize(8);
  let y = 20;

  if (type === PdfDocumentList.SECRETARIAT) {
    // @ts-ignore
    return createSecretariatPdf(t, doc, Content[type], y, messages, lang, font);
  } else {
    for (const phrase of Content[type].phrases) {
      doc.setFont("arial", "bold");
      doc.text(t(`${phrase}`), 10, y);

      doc.setFont(font, "normal");
      doc.text(getMessage(messages, lang, `${phrase}`), 10, y + 4);

      y = y + 12;
    }

    if (type === PdfDocumentList.SCANNER || type === PdfDocumentList.IRM) {
      return createIRMAndScannerPdf(
        t,
        type,
        doc,
        Content[type],
        y,
        messages,
        lang,
        font
      );
    }

    return doc;
  }
};
