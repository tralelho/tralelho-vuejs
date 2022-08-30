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

  //Pain section ok
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
    doc.text(translate(`${phrase}`), 10, y);
    doc.text(getMessage(messages, lang, `${phrase}`), 10, y + 4);

    y = y + 13;
  }

  let x = 13;
  for (const phrase of contentElement.pain.painScale) {
    doc.text(translate(`${phrase}`), x, y);
    doc.text(getMessage(messages, lang, `${phrase}`), x - 2, y + 4);
    doc.rect(x - 5, y - 4, 11, 10);
    x = x + 11;
  }

  x = 13;
  for (let i = 0; i < 6; i++) {
    img.src = `/pdf-images/patient/douleur${i}.png`;
    doc.addImage(img, "png", x, 80, 10, 10);
    x = x + 20;
  }

  doc.rect(8, startSection - 4, 121, y - startSection + 25);

  y = y + 40;

  //Medication section ok

  y = 20;
  startSection = y;
  for (const phrase of contentElement.medication.phrases) {
    const originalPhrase = translate(`${phrase}`);
    const translatedPhrase = getMessage(messages, lang, `${phrase}`);
    doc.text(originalPhrase, 138, y, { maxWidth: 130 });
    doc.text(translatedPhrase, 138, y + (originalPhrase.length > 90 ? 8 : 4), {
      maxWidth: 130,
    });
    y = y + (originalPhrase.length > 90 ? 15 : 10);
  }
  img.src = `/pdf-images/patient/medoc.png`;
  doc.addImage(img, "png", 175, startSection, 15, 20);
  doc.rect(135, startSection - 4, 65, y - startSection + 5);

  //Measures section

  startSection = y;
  for (const phrase of contentElement.measures.phrases) {
    doc.text(translate(`${phrase}`), 10, 175);
    doc.text(getMessage(messages, lang, `${phrase}`), 10, y + 4);
    y = y + 10;
  }
  img.src = `/pdf-images/patient/pouls.png`;
  doc.addImage(img, "png", 70, startSection, 15, 15);
  doc.rect(18, startSection, 90, y - startSection);

  y = y + 20;

  //bans section

  y = y + 10;

  for (const phrase of contentElement.bans.phrases) {
    doc.text(translate(`${phrase}`), 135, y);
    doc.text(getMessage(messages, lang, `${phrase}`), 135, y + 4);
    y = y + 10;
  }
  img.src = `/pdf-images/patient/interdit.png`;
  doc.addImage(img, "png", 160, startSection, 15, 15);
  doc.rect(130, startSection - 4, 70, y - startSection);

  //to Have section
  startSection = y;
  for (const phrase of contentElement.toHave.phrases) {
    doc.text(translate(`${phrase}`), 20, y);
    doc.text(getMessage(messages, lang, `${phrase}`), 20, y + 4);
    y = y + 10;
  }
  img.src = `/pdf-images/patient/seringue.png`;
  doc.addImage(img, "png", 70, startSection, 15, 15);
  doc.rect(18, startSection - 4, 90, y - startSection);

  y = y + 20;

  doc.addPage();

  //informations section
  let yRight = 20;
  startSection = yRight;
  for (const phrase of contentElement.informations.phrases) {
    doc.text(translate(`${phrase}`), 130, yRight);
    doc.text(getMessage(messages, lang, `${phrase}`), 130, yRight + 4);
    yRight = yRight + 10;
  }
  doc.rect(148, startSection - 4, 70, yRight - startSection);

  doc.addPage();

  doc.setFontSize(12);

  img.src = `/pdf-images/patient/flower2.png`;
  doc.addImage(img, "png", 0, 20, 200, 270);

  doc.text(translate(`${contentElement.flower.phrases.peur}`), 105, 75);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.peur}`),
    105,
    80
  );

  doc.text(translate(`${contentElement.flower.phrases.faim}`), 75, 25);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.faim}`),
    75,
    30
  );

  doc.text(translate(`${contentElement.flower.phrases.soif}`), 10, 60);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.soif}`),
    10,
    65
  );

  doc.text(translate(`${contentElement.flower.phrases.wc[0]}`), 150, 105);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.wc[0]}`),
    150,
    110
  );

  doc.text(translate(`${contentElement.flower.phrases.wc[1]}`), 160, 130);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.wc[1]}`),
    160,
    135
  );

  doc.text(translate(`${contentElement.flower.phrases.vertiges}`), 145, 150);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.vertiges}`),
    145,
    155
  );

  doc.text(translate(`${contentElement.flower.phrases.informations}`), 10, 150);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.informations}`),
    10,
    155
  );

  doc.text(translate(`${contentElement.flower.phrases.nausée}`), 90, 160);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.nausée}`),
    90,
    165
  );

  doc.text(translate(`${contentElement.flower.phrases.vomi}`), 82, 120);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.vomi}`),
    82,
    125
  );

  doc.text(translate(`${contentElement.flower.phrases.froid}`), 50, 130);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.froid}`),
    50,
    135
  );

  doc.text(translate(`${contentElement.flower.phrases.chaud}`), 20, 110);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.chaud}`),
    20,
    115
  );

  doc.text(translate(`${contentElement.flower.phrases.zero}`), 85, 270);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.zero}`),
    100,
    290
  );

  doc.text(translate(`${contentElement.flower.phrases.un}`), 85, 265);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.un}`),
    110,
    270
  );
  doc.text(translate(`${contentElement.flower.phrases.deux}`), 90, 255);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.deux}`),
    120,
    260
  );
  doc.text(translate(`${contentElement.flower.phrases.trois}`), 95, 245);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.trois}`),
    135,
    235
  );
  doc.text(translate(`${contentElement.flower.phrases.quatre}`), 100, 235);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.quatre}`),
    145,
    240
  );
  doc.text(translate(`${contentElement.flower.phrases.cinq}`), 110, 225);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.cinq}`),
    150,
    230
  );
  doc.text(translate(`${contentElement.flower.phrases.six}`), 120, 215);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.six}`),
    155,
    220
  );
  doc.text(translate(`${contentElement.flower.phrases.sept}`), 130, 205);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.sept}`),
    160,
    210
  );
  doc.text(translate(`${contentElement.flower.phrases.huit}`), 135, 195);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.huit}`),
    160,
    200
  );
  doc.text(translate(`${contentElement.flower.phrases.neuf}`), 139, 185);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.neuf}`),
    165,
    190
  );
  doc.text(translate(`${contentElement.flower.phrases.dix}`), 145, 175);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.dix}`),
    160,
    175
  );
  doc.text(translate(`${contentElement.flower.phrases.mal}`), 30, 275);
  doc.text(
    getMessage(messages, lang, `${contentElement.flower.phrases.mal}`),
    30,
    280
  );

  return doc;
};
