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

const getMessage = function (messages: any, lang: string, code: string) {
  try {
    return messages[lang][code]({
      normalize: function (text: string) {
        return text[0];
      },
    });
  } catch {
    throw new Error(`Cannot find traduction ${code}`);
  }
};

export const createPdf = function (
  type: PdfDocumentList,
  messages: any,
  lang?: string
) {
  lang = lang || "fra";

  const doc = buildPdfContent(type, messages, lang);

  doc.save(`${type}.pdf`);
};

const buildPdfContent = function (
  type: PdfDocumentList,
  messages: any,
  lang: string
): jsPDF {
  const { t } = i18n.global;

  if (type === PdfDocumentList.PATIENT) {
    return createPatientPdf(t, Content[type], messages, lang);
  }

  let doc = new jsPDF();

  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text(type, 10, 10);

  doc.setFontSize(8);
  let y = 20;

  if (type === PdfDocumentList.SECRETARIAT) {
    // @ts-ignore
    return createSecretariatPdf(t, doc, Content[type], y, messages, lang);
  } else {
    for (const phrase of Content[type].phrases) {
      doc.setFont("helvetica", "bold");
      doc.text(t(`${phrase}`), 10, y);

      doc.setFont("helvetica", "normal");
      doc.text(getMessage(messages, lang, `${phrase}`), 10, y + 4);

      y = y + 12;
    }

    if (type === PdfDocumentList.SCANNER || type === PdfDocumentList.IRM) {
      return createScannerIRMPdf(
        t,
        type,
        doc,
        Content[type],
        y,
        messages,
        lang
      );
    }

    return doc;
  }
};

const changePage = function (doc: any, position: number): number {
  if (position >= 290) {
    doc.addPage();
    position = 10;
  }

  return position;
};

const createPatientPdf = function (
  translate: any,
  contentElement: { phrases: {} },
  messages: any,
  lang: string
): jsPDF {
  let doc = new jsPDF({ orientation: "landscape" });

  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text(PdfDocumentList.PATIENT, 10, 10);

  doc.setFontSize(8);

  let y = 20;

  //Pain section
  let startSection = y;
  doc.rect(77, y - 2, 20, 7);
  doc.text(
    translate(`${contentElement.pain.responses[0]}`) +
      " / " +
      getMessage(messages, lang, `${contentElement.pain.responses[0]}`),
    80,
    y + 2
  );
  doc.rect(107, y - 2, 20, 7);
  doc.text(
    translate(`${contentElement.pain.responses[1]}`) +
      " / " +
      getMessage(messages, lang, `${contentElement.pain.responses[1]}`),
    110,
    y + 2
  );

  for (const phrase of contentElement.pain.phrases) {
    doc.text(translate(`${phrase}`), 20, y);
    doc.text(getMessage(messages, lang, `${phrase}`), 20, y + 4);

    y = y + 13;
  }

  let x = 23;
  for (const phrase of contentElement.pain.painScale) {
    doc.text(translate(`${phrase}`), x, y);
    doc.text(getMessage(messages, lang, `${phrase}`), x - 2, y + 4);
    doc.rect(x - 5, y - 4, 11, 10);
    x = x + 11;
  }
  doc.rect(18, startSection - 4, 121, y - startSection + 10);

  y = y + 20;

  //Medication section
  startSection = y;
  for (const phrase of contentElement.medication.phrases) {
    doc.text(translate(`${phrase}`), 20, y);
    doc.text(getMessage(messages, lang, `${phrase}`), 20, y + 4);
    y = y + 10;
  }
  doc.rect(18, startSection - 4, 121, y - startSection);

  y = y + 20;

  //Measures section
  let yRight = 20;
  startSection = yRight;
  for (const phrase of contentElement.measures.phrases) {
    const originalPhrase = translate(`${phrase}`);
    const translatedPhrase = getMessage(messages, lang, `${phrase}`);
    doc.text(originalPhrase, 150, yRight, { maxWidth: 130 });
    doc.text(
      translatedPhrase,
      150,
      yRight + (originalPhrase.length > 90 ? 8 : 4),
      {
        maxWidth: 130,
      }
    );
    yRight = yRight + (originalPhrase.length > 90 ? 15 : 10);
  }
  doc.rect(148, startSection - 4, 140, yRight - startSection + 5);

  yRight = yRight + 20;

  //treatment section
  startSection = yRight;
  for (const phrase of contentElement.treatment.phrases) {
    doc.text(translate(`${phrase}`), 150, yRight);
    doc.text(getMessage(messages, lang, `${phrase}`), 150, yRight + 4);
    yRight = yRight + 10;
  }
  doc.rect(148, startSection - 4, 140, yRight - startSection);

  y = y + 20;

  doc.addPage();
  y = 20;

  //bans section
  startSection = y;
  for (const phrase of contentElement.bans.phrases) {
    doc.text(translate(`${phrase}`), 20, y);
    doc.text(getMessage(messages, lang, `${phrase}`), 20, y + 4);
    y = y + 10;
  }
  doc.rect(18, startSection - 4, 121, y - startSection);

  y = y + 20;

  //informations section
  yRight = 20;
  startSection = yRight;
  for (const phrase of contentElement.informations.phrases) {
    doc.text(translate(`${phrase}`), 150, yRight);
    doc.text(getMessage(messages, lang, `${phrase}`), 150, yRight + 4);
    yRight = yRight + 10;
  }
  doc.rect(148, startSection - 4, 140, yRight - startSection);

  //toHave section
  startSection = y;
  for (const phrase of contentElement.toHave.phrases) {
    y = changePage(doc, y);
    doc.text(translate(`${phrase}`), 20, y);
    doc.text(getMessage(messages, lang, `${phrase}`), 20, y + 4);
    y = y + 10;
  }
  doc.rect(18, startSection - 4, 121, y - startSection);

  y = y + 20;

  //flower section
  for (const phrase of contentElement.flower.phrases) {
    y = changePage(doc, y);
    doc.text(translate(`${phrase}`), 20, y);
    doc.text(getMessage(messages, lang, `${phrase}`), 20, y + 4);
    y = y + 10;
  }

  return doc;
};

const createSecretariatPdf = function (
  translate: any,
  doc: any,
  contentElement: { phrases: {} },
  y: number,
  messages: any,
  lang: string
): jsPDF {
  for (const section of contentElement.sections) {
    doc.setFont("helvetica", "bold");
    doc.text(translate(`${section.title}`), 10, y);

    y = y + 8;

    doc.setFont("helvetica", "normal");
    for (const phrase of section.list) {
      y = changePage(doc, y);
      doc.text(translate(`${phrase}`), 20, y);
      doc.text(getMessage(messages, lang, `${phrase}`), 20, y + 4);

      y = y + 12;
    }

    if (section.form) {
      for (const formElement of section.form) {
        y = changePage(doc, y);
        doc.setFont("helvetica", "bold");
        doc.text(translate(`${formElement}`), 20, y);
        doc.setFont("helvetica", "normal");
        doc.text(getMessage(messages, lang, `${formElement}`), 20, y + 4);
        doc.text("_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _", 100, y + 4);
        y = y + 12;
      }
    }
  }

  return doc;
};

const createScannerIRMPdf = function (
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
  doc.setFont("helvetica", "bold");
  doc.rect(10, position - 1, 190, 8);
  doc.text(`Checklist ${type}`, 75, position + 5);
  position = position + 15;
  doc.setFontSize(8);

  for (const formElement of content.checkList.form) {
    doc.setFont("helvetica", "bold");
    doc.text(translate(`${formElement.code}`), 20, position);
    doc.setFont("helvetica", "normal");
    doc.text(
      getMessage(messages, lang, `${formElement.code}`),
      20,
      position + 4
    );
    doc.text(formElement.response, 100, position + 4);
    position = position + 12;
  }

  position = position + 5;
  doc.setFont("helvetica", "bold");

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
    doc.setFont("helvetica", "bold");
    doc.text(translate(`${phrase}`), 12, position);
    doc.setFont("helvetica", "normal");
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

  doc.setFont("helvetica", "bold");
  doc.text(translate(`${content.sign}`), 20, position);
  doc.setFont("helvetica", "normal");
  doc.text(getMessage(messages, lang, `${content.sign}`), 20, position + 4);

  return doc;
};
