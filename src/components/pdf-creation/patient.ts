import { PdfDocumentList } from "./PDF-creator";
import { jsPDF } from "jspdf";
import { changePage, getMessage } from "./util";

export const createPatientPdf = function (
  translate: any,
  contentElement: { phrases: {} },
  messages: any,
  lang: string
): jsPDF {
  let doc = new jsPDF({ orientation: "landscape" });
  const img = new Image();

  doc.setFontSize(24);
  doc.setFont("arial", "bold");
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

  x = 23;
  for (let i = 0; i < 6; i++) {
    img.src = `/pdf-images/patient/douleur${i}.png`;
    doc.addImage(img, "png", x, 80, 12, 12);
    x = x + 20;
  }

  doc.rect(18, startSection - 4, 121, y - startSection + 25);

  y = y + 40;

  //Medication section
  startSection = y;
  for (const phrase of contentElement.medication.phrases) {
    doc.text(translate(`${phrase}`), 20, y);
    doc.text(getMessage(messages, lang, `${phrase}`), 20, y + 4);
    y = y + 10;
  }
  img.src = `/pdf-images/patient/medoc.png`;
  doc.addImage(img, "png", 120, startSection, 15, 15);
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
  img.src = `/pdf-images/patient/pouls.png`;
  doc.addImage(img, "png", 265, startSection, 15, 20);
  doc.rect(148, startSection - 4, 140, yRight - startSection + 5);

  yRight = yRight + 20;

  //treatment section
  startSection = yRight;
  for (const phrase of contentElement.treatment.phrases) {
    doc.text(translate(`${phrase}`), 150, yRight);
    doc.text(getMessage(messages, lang, `${phrase}`), 150, yRight + 4);
    yRight = yRight + 10;
  }
  img.src = `/pdf-images/patient/seringue.png`;
  doc.addImage(img, "png", 265, startSection, 15, 15);
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
  img.src = `/pdf-images/patient/interdit.png`;
  doc.addImage(img, "png", 120, startSection, 15, 15);
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

  doc.addPage();

  y = 20;
  //flower section
  // for (const phrase of contentElement.flower.phrases) {
  //   doc.text(translate(`${phrase}`), 20, y);
  //   doc.text(getMessage(messages, lang, `${phrase}`), 20, y + 4);
  //   y = y + 10;
  // }

  img.src = `/pdf-images/patient/cercle.png`;
  doc.addImage(img, "png", 60, 20, 180, 180);

  img.src = `/pdf-images/patient/manger.png`;
  doc.addImage(img, "png", 172, 42, 20, 20);

  img.src = `/pdf-images/patient/boire.png`;
  doc.addImage(img, "png", 200, 66, 20, 20);

  img.src = `/pdf-images/patient/wc.png`;
  doc.addImage(img, "png", 210, 100, 20, 20);

  img.src = `/pdf-images/patient/nausée.png`;
  doc.addImage(img, "png", 105, 160, 22, 20);

  img.src = `/pdf-images/patient/vomi.png`;
  doc.addImage(img, "png", 80, 135, 20, 20);

  img.src = `/pdf-images/patient/froid.png`;
  doc.addImage(img, "png", 70, 100, 20, 20);

  img.src = `/pdf-images/patient/chaud.png`;
  doc.addImage(img, "png", 78, 65, 20, 20);

  return doc;
};
