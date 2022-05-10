import { jsPDF } from "jspdf";

export const createBlocPdf = function (
  translate: any,
  contentElement: { phrases: {} },
  messages: any,
  lang: string
): jsPDF {
  let doc = new jsPDF({ orientation: "landscape" });
  return doc;
};
