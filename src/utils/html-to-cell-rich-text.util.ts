import { CellRichTextValue, Font, RichText } from "exceljs";

export function htmlToCellRichTextValue(html: string): CellRichTextValue {
  if (!html) return { richText: [] };

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const body = doc.body;
  const richTexts: RichText[] = [];

  // eslint-disable-next-line no-undef
  function processNode(node: ChildNode): void {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || "";
      const parent = node.parentNode as HTMLElement;
      const font: Partial<Font> = {};

      if (window.getComputedStyle(parent).fontWeight === "bold") {
        font.bold = true;
      }
      if (window.getComputedStyle(parent).fontStyle === "italic") {
        font.italic = true;
      }
      if (window.getComputedStyle(parent).textDecorationLine.includes("underline")) {
        font.underline = "single"; // Simplificação, ajuste conforme necessário.
      }
      if (window.getComputedStyle(parent).verticalAlign === "super") {
        font.vertAlign = "superscript";
      }
      if (window.getComputedStyle(parent).verticalAlign === "sub") {
        font.vertAlign = "subscript";
      }

      richTexts.push({
        text,
        font: Object.keys(font).length > 0 ? font : undefined,
      });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      Array.from(node.childNodes).forEach(processNode);
    }
  }

  Array.from(body.childNodes).forEach(processNode);

  return { richText: richTexts };
}
