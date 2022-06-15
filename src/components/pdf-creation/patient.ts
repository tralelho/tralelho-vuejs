import { PdfDocumentList } from "./PDF-creator";
import { jsPDF } from "jspdf";
import { changePage, getMessage } from "./util";

export const createPatientPdf = function (
  translate: any,
  contentElement: { phrases: {} },
  messages: any,
  lang: string
): jsPDF {
  let doc = new jsPDF({ orientation: "portrait" });
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
   y = 20;
   startSection = y;
   for (const phrase of contentElement.medication.phrases) {
     doc.text(translate(`${phrase}`), 20, y);
     doc.text(getMessage(messages, lang, `${phrase}`), 20, y + 4);
     y = y + 10;
   }
   img.src = `/pdf-images/patient/medoc.png`;
   doc.addImage(img, "png", 120, startSection, 15, 15);
   doc.rect(18, startSection - 4, 70, y - startSection);
 
   y = 20;

  //Measures section
  y = 20;
  startSection = y;
  for (const phrase of contentElement.measures.phrases) {
    const originalPhrase = translate(`${phrase}`);
    const translatedPhrase = getMessage(messages, lang, `${phrase}`);
    doc.text(originalPhrase, 150, y, { maxWidth: 130 });
    doc.text(translatedPhrase, 150, y + (originalPhrase.length > 90 ? 8 : 4), {
      maxWidth: 130,
    });
    y = y + (originalPhrase.length > 90 ? 15 : 10);
  }
  img.src = `/pdf-images/patient/pouls.png`;
  doc.addImage(img, "png", 265, startSection, 15, 20);
  doc.rect(148, startSection - 4, 140, y - startSection + 5);

  y = y + 20;

  for (const phrase of contentElement.treatment.phrases) {
    doc.text(translate(`${phrase}`), 150, y);
    doc.text(getMessage(messages, lang, `${phrase}`), 150, y + 4);
    y = y + 10;
  }
  img.src = `/pdf-images/patient/seringue.png`;
  doc.addImage(img, "png", 265, startSection, 15, 15);
  doc.rect(148, startSection - 4, 140, y - startSection);

 

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

  doc.addPage();

  //informations section
  let yRight = 20;
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

  doc.setFontSize(12);

  img.src = `/pdf-images/patient/flower2.png`;
  doc.addImage(img, "png", 20, 20, 20, 20);

  img.src = `/pdf-images/patient/peur.png`;
  doc.addImage(img, "png", 100, 100, 100, 100);
  doc.text(translate(`${contentElement.flower.phrases.peur}`), 140, 10);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.peur}`),
    150,
    150
  );

  img.src = `/pdf-images/patient/manger.png`;
  doc.addImage(img, "png", 172, 42, 20, 20);
  doc.text(translate(`${contentElement.flower.phrases.faim}`), 190, 30);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.faim}`),
    190,
    35
  );

  img.src = `/pdf-images/patient/boire.png`;
  doc.addImage(img, "png", 200, 66, 20, 20);
  doc.text(translate(`${contentElement.flower.phrases.soif}`), 230, 60);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.soif}`),
    230,
    65
  );

  img.src = `/pdf-images/patient/wc.png`;
  doc.addImage(img, "png", 210, 100, 20, 20);
  doc.text(translate(`${contentElement.flower.phrases.wc[0]}`), 235, 100);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.wc[0]}`),
    235,
    105
  );
  doc.text(translate(`${contentElement.flower.phrases.wc[1]}`), 235, 120);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.wc[1]}`),
    235,
    125
  );

  img.src = `/pdf-images/patient/diarrhée.png`;
  doc.addImage(img, "png", 200, 135, 20, 20);
  doc.text(translate(`${contentElement.flower.phrases.diarrhée}`), 230, 155);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.diarrhée}`),
    230,
    160
  );

  img.src = `/pdf-images/patient/vertiges.png`;
  doc.addImage(img, "png", 178, 160, 15, 20);
  doc.text(translate(`${contentElement.flower.phrases.vertiges}`), 190, 195);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.vertiges}`),
    190,
    200
  );

  doc.text(translate(`${contentElement.flower.phrases.informations}`), 50, 250);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.informations}`),
    50,
    255
  );

  img.src = `/pdf-images/patient/informations.png`;
  doc.addImage(img, "png", 140, 170, 20, 17);

  img.src = `/pdf-images/patient/nausée.png`;
  doc.addImage(img, "png", 105, 160, 22, 20);

  img.src = `/pdf-images/patient/vomi.png`;
  doc.addImage(img, "png", 80, 135, 20, 20);

  img.src = `/pdf-images/patient/froid.png`;
  doc.addImage(img, "png", 70, 100, 20, 20);

  img.src = `/pdf-images/patient/chaud.png`;
  doc.addImage(img, "png", 78, 65, 20, 20);

  img.src = `/pdf-images/patient/mal.png`;
  doc.addImage(img, "png", 105, 42, 20, 20);

  return doc;
};
