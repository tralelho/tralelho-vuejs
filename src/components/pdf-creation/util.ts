export const getMessage = function (messages: any, lang: string, code: string) {
  try {
    return messages[lang][code]({
      normalize: function (text: string) {
        return text[0];
      },
    }) || "";
  } catch {
    throw new Error(`Cannot find traduction ${code}`);
  }
};
export const changePage = function (doc: any, position: number): number {
  if (position >= 290) {
    doc.addPage();
    position = 10;
  }

  return position;
};
