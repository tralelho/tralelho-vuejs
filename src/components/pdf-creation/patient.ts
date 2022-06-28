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

  doc.setFontSize(16);
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
    doc.addImage(img, "png", x, 70, 10, 10);
    x = x + 20;
  }

  doc.rect(18, startSection - 4, 121, y - startSection + 25);

  y = y + 40;


   //Medication section

  y = 20;
  startSection = y;
  for (const phrase of contentElement.medication.phrases) {
    const originalPhrase = translate(`${phrase}`);
    const translatedPhrase = getMessage(messages, lang, `${phrase}`);
    doc.text(originalPhrase, 150, y, { maxWidth: 130 });
    doc.text(translatedPhrase, 150, y + (originalPhrase.length > 90 ? 8 : 4), {
      maxWidth: 130,
    });
    y = y + (originalPhrase.length > 90 ? 15 : 10);
  }
  img.src = `/pdf-images/patient/medoc.png`;
  doc.addImage(img, "png", 265, startSection, 15, 20);
  doc.rect(148, startSection - 4, 140, y - startSection + 5);
  

  //Measures section

  startSection = y;
  for (const phrase of contentElement.measures.phrases) {
    doc.text(translate(`${phrase}`), 80, y);
    doc.text(getMessage(messages, lang, `${phrase}`), 20, y + 4);
    y = y + 10;
  }
  img.src = `/pdf-images/patient/pouls.png`;
  doc.addImage(img, "png", 120, startSection, 15, 15);
  doc.rect(18, startSection - 4, 121, y - startSection);


//bans section

  y = y + 20;

  for (const phrase of contentElement.bans.phrases) {
    doc.text(translate(`${phrase}`), 150, y);
    doc.text(getMessage(messages, lang, `${phrase}`), 150, y + 4);
    y = y + 10;
  }
  img.src = `/pdf-images/patient/interdit.png`;
  doc.addImage(img, "png", 265, startSection, 15, 15);
  doc.rect(148, startSection - 4, 140, y - startSection);

 

  //to Have section
  startSection = y;
  for (const phrase of contentElement.toHave.phrases) {
    doc.text(translate(`${phrase}`), 20, y);
    doc.text(getMessage(messages, lang, `${phrase}`), 20, y + 4);
    y = y + 10;
  }
  img.src = `/pdf-images/patient/seringue.png`;
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
  doc.addImage(img, "png", 0, 20, 200, 270);

  img.src = `/pdf-images/patient/peur.png`;
  doc.addImage(img, "png", 65, 100, 15, 15);
  doc.text(translate(`${contentElement.flower.phrases.peur}`), 50, 130);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.peur}`),
    50,135);

  doc.text(translate(`${contentElement.flower.phrases.douleur}`), 40, 80);
  doc.text(
      getMessage(messages, lang, `${contentElement.flower.phrases.douleur}`),
      40,75);

  img.src = `/pdf-images/patient/manger.png`;
  doc.addImage(img, "png", 65, 40, 15, 15);
  doc.text(translate(`${contentElement.flower.phrases.faim}`), 75, 25);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.faim}`),
    75,
    30
  );

  img.src = `/pdf-images/patient/boire.png`;
  doc.addImage(img, "png", 40, 55, 15, 15);
  doc.text(translate(`${contentElement.flower.phrases.soif}`), 10, 60);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.soif}`),
    10,
    65
  );

  img.src = `/pdf-images/patient/wc.png`;
  doc.addImage(img, "png", 130, 105, 15, 15);
  doc.text(translate(`${contentElement.flower.phrases.wc[0]}`), 150, 80);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.wc[0]}`),
    150,
    85
  );
  doc.text(translate(`${contentElement.flower.phrases.wc[1]}`), 180, 1100);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.wc[1]}`),
    180,
    115
  );

  img.src = `/pdf-images/patient/diarrhée.png`;
  doc.addImage(img, "png", 180, 130, 15, 15);
  doc.text(translate(`${contentElement.flower.phrases.diarrhée}`), 210, 130);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.diarrhée}`),
    210,
    135
  );

  img.src = `/pdf-images/patient/vertiges.png`;
  doc.addImage(img, "png", 125, 150, 15, 20);
  doc.text(translate(`${contentElement.flower.phrases.vertiges}`), 95, 180);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.vertiges}`),
    95,
    185
  );

 
  doc.text(translate(`${contentElement.flower.phrases.informations}`), 10, 150);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.informations}`),
    10,
    155
  );

  

  img.src = `/pdf-images/patient/nausée.png`;
  doc.addImage(img, "png", 95, 140, 16, 15);
  doc.text(translate(`${contentElement.flower.phrases.nausée}`), 80, 150);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.nausée}`),
    80,155
  );

  img.src = `/pdf-images/patient/vomi.png`;
  doc.addImage(img, "png", 100, 110, 15, 15);
  doc.text(translate(`${contentElement.flower.phrases.vomi}`), 80, 110);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.vomi}`),
    80,115
  );

  img.src = `/pdf-images/patient/froid.png`;
  doc.addImage(img, "png", 63, 100, 15, 15);
  doc.text(translate(`${contentElement.flower.phrases.froid}`), 40, 75);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.froid}`),
    40,80
  );

  img.src = `/pdf-images/patient/chaud.png`;
  doc.addImage(img, "png", 42, 90, 15, 15);
  doc.text(translate(`${contentElement.flower.phrases.chaud}`), 20, 95);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.chaud}`),
    20,100
  );

  doc.text(translate(`${contentElement.flower.phrases.mal}`), 10, 275);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.mal}`),
    10,
    280
  );

  return doc;
};
