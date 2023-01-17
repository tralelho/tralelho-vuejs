import { PdfDocumentList } from "./PDF-creator";
import { jsPDF } from "jspdf";
import { getMessage } from "./util";

export const createPatientPdf = function (
  translate: any,
  contentElement: { phrases: {} },
  messages: any,
  lang: string,
  font: string
): jsPDF {
  let doc = new jsPDF({ orientation: "portrait" });
  doc.setLineHeightFactor(1);
  const img = new Image();

  doc.setFontSize(16);
  doc.setFont("arial", "bold");
  doc.text(PdfDocumentList.PATIENT, 90, 10);

  doc.setFontSize(14);
  doc.setFont(font, "normal");

  //Pain section
  let y = 25;
  let startSection = y;
  doc.rect(99, y - 3, 30, 8);
  doc.text(
    translate(`${contentElement.pain.responses[0]}`) +
      " / " +
      getMessage(messages, lang, `${contentElement.pain.responses[0]}`),
    101,
    y + 3
  );
  doc.rect(139, y - 3, 30, 8);
  doc.text(
    translate(`${contentElement.pain.responses[1]}`) +
      " / " +
      getMessage(messages, lang, `${contentElement.pain.responses[1]}`),
    142,
    y + 3
  );

  for (const phrase of contentElement.pain.phrases) {
    doc.text(translate(`${phrase}`), 10, y);
    doc.text(getMessage(messages, lang, `${phrase}`), 10, y + 5);

    y = y + 15;
  }

  let x = 13;
  for (const phrase of contentElement.pain.painScale) {
    doc.text(translate(`${phrase}`), x, y + 1);
    doc.text(getMessage(messages, lang, `${phrase}`), x - 3, y + 6);
    doc.rect(x - 5, y - 4, 17, 12);
    x = x + 17;
  }

  x = 13;
  for (let i = 0; i < 6; i++) {
    img.src = `/pdf-images/patient/douleur${i}.png`;
    doc.addImage(img, "png", x, 95, 10, 10);
    x = x + 33;
  }

  y = y + 25;

  doc.line(30, y, 180, y);

  y = y + 2;
  //Medication section
  img.src = `/pdf-images/patient/medoc.png`;
  doc.addImage(img, "png", 90, y, 15, 15);
  y = y + 20;

  for (const phrase of contentElement.medication.phrases) {
    doc.text(translate(`${phrase}`), 10, y);
    doc.text(getMessage(messages, lang, `${phrase}`), 10, y + 5);
    y = y + 15;
  }

  doc.line(30, y, 180, y);
  y = y + 2;
  //Measures section
  img.src = `/pdf-images/patient/pouls.png`;
  doc.addImage(img, "png", 90, y, 15, 15);
  y = y + 20;

  for (const phrase of contentElement.measures.phrases) {
    const splitTextOrigin = doc.splitTextToSize(translate(`${phrase}`), 180);
    doc.text(splitTextOrigin, 10, y);
    if (splitTextOrigin.length > 1) {
      y = y + 5;
    }
    const splitTextTranslate = doc.splitTextToSize(
      getMessage(messages, lang, `${phrase}`),
      180
    );
    doc.text(splitTextTranslate, 10, y + 5);
    y = y + 15;
  }

  doc.addPage();
  y = 5;
  //to Have section
  img.src = `/pdf-images/patient/seringue.png`;
  doc.addImage(img, "png", 90, y, 15, 15);
  y = y + 20;
  for (const phrase of contentElement.sting.phrases) {
    doc.text(translate(`${phrase}`), 10, y);
    doc.text(getMessage(messages, lang, `${phrase}`), 10, y + 5);
    y = y + 15;
  }

  doc.line(30, y, 180, y);

  y = y + 2;
  //bans section
  img.src = `/pdf-images/patient/interdit.png`;
  doc.addImage(img, "png", 90, y, 15, 15);
  y = y + 20;

  for (const phrase of contentElement.bans.phrases) {
    doc.text(translate(`${phrase}`), 10, y);
    doc.text(getMessage(messages, lang, `${phrase}`), 10, y + 5);
    y = y + 15;
  }

  doc.addPage();
  y = 5;
  //Pad section
  img.src = `/pdf-images/patient/seringue.png`;
  doc.addImage(img, "png", 90, y, 15, 15);
  y = y + 20;
  for (const phrase of contentElement.pad.phrases) {
    doc.text(translate(`${phrase}`), 10, y);
    doc.text(getMessage(messages, lang, `${phrase}`), 10, y + 5);
    y = y + 15;
  }

  doc.line(30, y, 180, y);
  y = y + 2;

  //informations section
  img.src = `/pdf-images/patient/informations.png`;
  doc.addImage(img, "png", 90, y, 15, 15);
  y = y + 20;
  
  for (const phrase of contentElement.informations.phrases) {
    doc.text(translate(`${phrase}`), 10, y);
    doc.text(getMessage(messages, lang, `${phrase}`), 10, y + 5);
    y = y + 15;
  }

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
    280
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
    130,
    250
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
