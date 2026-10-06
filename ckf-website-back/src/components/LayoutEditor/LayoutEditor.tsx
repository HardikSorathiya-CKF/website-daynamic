import { useEffect, useRef, useState } from "react";
import grapesjs, { type Editor } from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import Modal from "../Modal/Modal";
import ColorPicker, { ColorPickerPanel } from "../ColorPicker/ColorPicker";
import {
  FONT_WEIGHTS,
  LAYOUT_FONTS,
  TYPOGRAPHY_TAGS,
  parseLayoutContent,
  parsePx,
  stripThemeCss,
  themeToCss,
  type LayoutTheme,
  type ThemeTextStyle,
  type TypographyTag,
} from "../../utils/layoutContent";
import "../../assets/css/layout-editor.css";

type LayoutEditorProps = {
  value?: string;
  onChange: (value: string) => void;
};

const CANVAS_FONTS =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Nunito:wght@400;600;700;800&family=Poppins:wght@400;600;700&family=Roboto:wght@400;500;700&display=swap";

const canvasCss = `
  * { box-sizing: border-box; }
  html, body {
    margin: 0;
    min-height: 100%;
    background: var(--ckf-color-background, #ffffff);
    color: var(--ckf-color-text, #575757);
    font-family: var(--ckf-font, Nunito, "Segoe UI", Arial, sans-serif);
  }
  body { padding: 24px; }
  .ckf-section, .ckf-row, .ckf-col, .ckf-container {
    position: relative;
    box-sizing: border-box;
  }
  .ckf-container {
    width: 100%;
    max-width: 1140px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 16px;
    padding-right: 16px;
  }
  .ckf-col {
    min-width: 0 !important;
    flex-grow: 0 !important;
    flex-shrink: 0 !important;
  }
  .ckf-section:empty, .ckf-row:empty, .ckf-col:empty, .ckf-container:empty {
    min-height: 160px !important;
    outline: 2px dashed #b7c7dc;
    outline-offset: -8px;
    border-radius: 16px;
  }
  .ckf-section:empty::after, .ckf-row:empty::after, .ckf-col:empty::after, .ckf-container:empty::after {
    content: "+";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 2px dashed #062d67;
    color: #f58020;
    background: #fff;
    font-size: 30px;
    line-height: 44px;
    text-align: center;
  }
  .ckf-accordion {
    display: flex;
    flex-direction: column;
    gap: 14px;
    width: 100%;
  }
  .ckf-accordion-item {
    margin: 0;
    border: 1px solid #e9ecef;
    border-radius: 16px;
    background: #f7f9fc;
    overflow: visible;
  }
  .ckf-accordion-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 20px 24px 8px;
    color: var(--ckf-color-primary, #062d67);
    font-size: 17px;
    font-weight: 700;
    line-height: 1.45;
  }
  .ckf-accordion-title::after {
    content: "";
    width: 10px;
    height: 10px;
    flex-shrink: 0;
    border-right: 2px solid var(--ckf-color-secondary, #f58020);
    border-bottom: 2px solid var(--ckf-color-secondary, #f58020);
    transform: rotate(-135deg);
  }
  .ckf-accordion-body {
    display: block !important;
    min-height: 48px;
    padding: 0 24px 22px;
    margin: 0;
    color: var(--ckf-color-text, #575757);
    font-size: 15px;
    line-height: 1.8;
  }
  @media (max-width: 480px) {
    .ckf-col {
      width: 100% !important;
      max-width: 100% !important;
      flex: 0 0 100% !important;
      flex-basis: 100% !important;
    }
  }
  .ckf-divider {
    display: block;
    width: 100%;
    height: 2px;
    border: 0;
    margin: 20px 0;
    background: #e4eaf2;
  }
  .ckf-counter {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%;
    padding: 16px;
  }
  .ckf-counter-value {
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 2px;
    margin-bottom: 12px;
    color: var(--ckf-color-secondary, #f58020);
    font-size: 48px;
    font-weight: 800;
    line-height: 1;
  }
  .ckf-counter-number, .ckf-counter-suffix {
    color: inherit;
    font: inherit;
  }
  .ckf-counter-title {
    margin: 0 0 8px;
    color: var(--ckf-color-primary, #062d67);
    font-size: 20px;
    font-weight: 700;
  }
  .ckf-counter-text {
    margin: 0;
    max-width: 320px;
    color: var(--ckf-color-text, #575757);
    font-size: 15px;
    line-height: 1.7;
  }
`;

const COLUMN_WIDTHS = ["25%", "30%", "33%", "40%", "50%", "60%", "70%", "75%", "100%"];

const THEME_COLORS: { key: keyof LayoutTheme["colors"]; label: string; cssVar: string }[] = [
  { key: "primary", label: "Primary", cssVar: "var(--ckf-color-primary)" },
  { key: "secondary", label: "Secondary", cssVar: "var(--ckf-color-secondary)" },
  { key: "text", label: "Text", cssVar: "var(--ckf-color-text)" },
  { key: "background", label: "Background", cssVar: "var(--ckf-color-background)" },
];

const toColorInputValue = (value: string | undefined, theme: LayoutTheme, fallback: string) => {
  const v = String(value || "").trim();
  if (!v) return fallback;
  const fromTheme = THEME_COLORS.find((item) => item.cssVar === v);
  if (fromTheme) return theme.colors[fromTheme.key];
  if (/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(v) || /^rgba?\(/i.test(v)) return v;
  return fallback;
};

const FONT_STYLE_OPTIONS = [
  { id: "var(--ckf-font)", label: "Default" },
  ...LAYOUT_FONTS,
];

const HEADING_SIZES: { tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"; label: string }[] = [
  { tag: "h1", label: "H1" },
  { tag: "h2", label: "H2" },
  { tag: "h3", label: "H3" },
  { tag: "h4", label: "H4" },
  { tag: "h5", label: "H5" },
  { tag: "h6", label: "H6" },
];

type EditorComponent = {
  getStyle: () => Record<string, string>;
  addStyle: (style: Record<string, string>) => void;
  get?: (key: string) => unknown;
  set?: (key: string, value: unknown, options?: { silent?: boolean }) => void;
  getAttributes?: () => { class?: string };
  getEl?: () => HTMLElement | undefined;
  getView?: () => { render?: () => void };
  closest?: (selector: string) => EditorComponent | undefined;
  append?: (component: unknown) => void;
  find?: (selector: string) => EditorComponent[];
  addAttributes?: (attributes: Record<string, string>) => void;
  components?: (content?: unknown) => unknown;
};

const classListOf = (component: EditorComponent) => {
  const fromAttr = String(component.getAttributes?.().class || "");
  const fromProp = String(component.get?.("classes") || "");
  return `${fromAttr} ${fromProp}`.split(/\s+/);
};

const isColumn = (component: EditorComponent) => {
  const type = String(component.get?.("type") || "");
  return type === "ckf-col" || classListOf(component).includes("ckf-col");
};

const headingTagOf = (component: EditorComponent) => {
  const tag = String(component.get?.("tagName") || component.get?.("headingLevel") || "").toLowerCase();
  return /^h[1-6]$/.test(tag) ? tag : "";
};

const isHeading = (component: EditorComponent) => {
  const type = String(component.get?.("type") || "");
  return type === "ckf-heading" || Boolean(headingTagOf(component));
};

const isDescription = (component: EditorComponent) => {
  const type = String(component.get?.("type") || "");
  const tag = String(component.get?.("tagName") || "").toLowerCase();
  const name = String(component.get?.("name") || "");
  return (
    type !== "ckf-heading" &&
    (type === "ckf-accordion-body" ||
      tag === "p" ||
      name === "Description" ||
      name === "Text" ||
      name === "Answer" ||
      classListOf(component).includes("ckf-accordion-body"))
  );
};

const isAccordionTitle = (component: EditorComponent) => {
  const type = String(component.get?.("type") || "");
  const tag = String(component.get?.("tagName") || "").toLowerCase();
  return type === "ckf-accordion-title" || tag === "summary" || classListOf(component).includes("ckf-accordion-title");
};

const isAccordionItem = (component: EditorComponent) => {
  const type = String(component.get?.("type") || "");
  return type === "ckf-accordion-item" || classListOf(component).includes("ckf-accordion-item");
};

const accordionAnswerOf = (component: EditorComponent) => {
  if (isAccordionTitle(component)) return undefined;
  if (classListOf(component).includes("ckf-accordion-body") || String(component.get?.("type") || "") === "ckf-accordion-body") {
    return component;
  }
  if (isAccordionItem(component)) return component.find?.(".ckf-accordion-body")?.[0];
  return undefined;
};

const isCounter = (component: EditorComponent) => {
  const type = String(component.get?.("type") || "");
  return type === "ckf-counter" || classListOf(component).includes("ckf-counter");
};

const closestAccordion = (component: EditorComponent) => {
  if (String(component.get?.("type") || "") === "ckf-accordion" || classListOf(component).includes("ckf-accordion")) {
    return component;
  }
  return component.closest?.(".ckf-accordion");
};

const closestCounter = (component: EditorComponent) => {
  if (isCounter(component)) return component;
  return component.closest?.(".ckf-counter");
};

const isWritableText = (component: EditorComponent) =>
  isHeading(component) || isDescription(component) || isAccordionTitle(component) || Boolean(accordionAnswerOf(component));

const isImage = (component: EditorComponent) => {
  const type = String(component.get?.("type") || "");
  const tag = String(component.get?.("tagName") || "").toLowerCase();
  return type === "image" || tag === "img";
};

const imageSrcOf = (component: EditorComponent) => String(component.get?.("src") || "");

const componentText = (component: EditorComponent) => {
  if (isDescription(component)) {
    const html = component.getEl?.()?.innerHTML;
    if (html) return html;
    return typeof component.get?.("content") === "string" ? String(component.get("content")) : "";
  }

  const content = component.get?.("content");
  if (typeof content === "string" && content) {
    const holder = document.createElement("div");
    holder.innerHTML = content;
    const fromContent = holder.textContent || "";
    if (fromContent) return fromContent;
  }

  return component.getEl?.()?.innerText || "";
};

const setComponentText = (component: EditorComponent, text: string) => {
  component.set?.("content", text);
  component.getView?.()?.render?.();
  const el = component.getEl?.();
  if (!el) return;
  if (isDescription(component)) el.innerHTML = text;
  else el.textContent = text;
};

const normalizeWidth = (value?: string) => {
  if (!value) return "";
  const trimmed = String(value).trim();
  if (!trimmed || trimmed === "auto") return "";
  if (/^\d+(\.\d+)?$/.test(trimmed)) return `${trimmed}%`;
  return trimmed;
};

const currentColumnWidth = (component: EditorComponent) => {
  const style = (component.getStyle() || {}) as Record<string, string>;
  return normalizeWidth(style.width) || "50%";
};

const applyColumnWidth = (component: EditorComponent, widthOverride?: string) => {
  const style = (component.getStyle() || {}) as Record<string, string>;
  const width = normalizeWidth(widthOverride) || normalizeWidth(style.width);
  if (!width) return "";

  const next = {
    width,
    "max-width": width,
    flex: `0 0 ${width}`,
    "flex-basis": width,
    "box-sizing": "border-box",
  };

  if (style.width === next.width && style["max-width"] === next["max-width"] && style.flex === next.flex) {
    return width;
  }

  component.addStyle(next);
  return width;
};

const injectCanvasTheme = (editor: Editor, theme: LayoutTheme) => {
  const doc = editor.Canvas.getDocument();
  if (!doc) return;

  if (!doc.getElementById("ckf-google-fonts")) {
    const fonts = doc.createElement("link");
    fonts.id = "ckf-google-fonts";
    fonts.rel = "stylesheet";
    fonts.href = CANVAS_FONTS;
    doc.head.appendChild(fonts);
  }

  let style = doc.getElementById("ckf-theme-style") as HTMLStyleElement | null;
  if (!style) {
    style = doc.createElement("style");
    style.id = "ckf-theme-style";
    doc.head.appendChild(style);
  }
  style.textContent = themeToCss(theme);
};

function LayoutEditor({ value, onChange }: LayoutEditorProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement>(null);
  const stylesRef = useRef<HTMLDivElement>(null);
  const traitsRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<Editor | null>(null);
  const onChangeRef = useRef(onChange);
  const themeRef = useRef<LayoutTheme>(parseLayoutContent(value).theme);
  const [device, setDevice] = useState("Desktop");
  const [colWidth, setColWidth] = useState("");
  const [headingLevel, setHeadingLevel] = useState("");
  const [textKind, setTextKind] = useState<"title" | "description" | "">("");
  const [textValue, setTextValue] = useState("");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [hasSelection, setHasSelection] = useState(false);
  const [showAddAccordionItem, setShowAddAccordionItem] = useState(false);
  const [counterFields, setCounterFields] = useState<{ count: string; suffix: string } | null>(null);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [selectedBg, setSelectedBg] = useState("#ffffff");
  const [gjsColor, setGjsColor] = useState<{ value: string; left: number; top: number; field: HTMLElement } | null>(null);
  const [themeOpen, setThemeOpen] = useState(false);
  const [layersOpen, setLayersOpen] = useState(false);
  const [theme, setTheme] = useState<LayoutTheme>(() => parseLayoutContent(value).theme);

  onChangeRef.current = onChange;

  const emit = () => {
    const editor = editorRef.current;
    if (!editor) return;
    const currentTheme = themeRef.current;
    try {
      editor.getWrapper()?.onAll?.((component: { getId?: () => string; addAttributes?: (attrs: Record<string, string>) => void }) => {
        const id = component.getId?.();
        if (id) component.addAttributes?.({ id });
      });
    } catch {
      // Keep current HTML if id stamping fails.
    }
    let html = editor.getHtml();
    try {
      html = editor.getHtml({ cleanId: false } as { cleanId: boolean });
    } catch {
      // Older GrapesJS builds ignore cleanId.
    }
    onChangeRef.current(
      JSON.stringify({
        html,
        css: `${themeToCss(currentTheme)}\n${stripThemeCss(editor.getCss() || "")}`,
        theme: currentTheme,
      })
    );
  };

  useEffect(() => {
    if (!hostRef.current || !blocksRef.current || !layersRef.current || !stylesRef.current || !traitsRef.current) {
      return;
    }

    const editor = grapesjs.init({
      container: hostRef.current,
      height: "100%",
      width: "100%",
      fromElement: false,
      storageManager: false,
      noticeOnUnload: false,
      canvasCss,
      protectedCss: `
        * { box-sizing: border-box; }
        html, body { margin: 0; min-height: 100%; }
      `,
      panels: { defaults: [] },
      blockManager: { appendTo: blocksRef.current, appendOnClick: true },
      layerManager: { appendTo: layersRef.current },
      selectorManager: { appendTo: stylesRef.current, componentFirst: true },
      styleManager: {
        appendTo: stylesRef.current,
        sectors: [
          {
            name: "Size",
            open: true,
            properties: ["width", "max-width", "padding", "margin"],
          },
          {
            name: "Layout",
            open: false,
            properties: ["display", "flex-direction", "justify-content", "align-items", "gap"],
          },
          {
            name: "Typography",
            open: true,
            properties: [
              {
                type: "select",
                property: "font-family",
                name: "Font family",
                default: "var(--ckf-font)",
                options: FONT_STYLE_OPTIONS,
              },
              "font-size",
              "font-weight",
              "line-height",
              "text-align",
            ],
          },
          {
            name: "Decorations",
            open: false,
            properties: ["border", "border-radius", "box-shadow"],
          },
        ],
      },
      traitManager: {
        appendTo: traitsRef.current,
      },
      assetManager: { embedAsBase64: true, custom: true },
      deviceManager: {
        devices: [
          { id: "desktop", name: "Desktop", width: "" },
          { id: "tablet", name: "Tablet", width: "768px", widthMedia: "992px" },
          { id: "mobile", name: "Mobile", width: "375px", widthMedia: "480px" },
        ],
      },
    });

    const blocks = editor.BlockManager;

    editor.on("selector:add", (selector: { get: (key: string) => string; set: (key: string, value: boolean) => void }) => {
      if (
        [
          "ckf-section",
          "ckf-row",
          "ckf-col",
          "ckf-container",
          "ckf-accordion",
          "ckf-accordion-item",
          "ckf-accordion-title",
          "ckf-accordion-body",
          "ckf-divider",
          "ckf-counter",
          "ckf-counter-value",
          "ckf-counter-number",
          "ckf-counter-suffix",
          "ckf-counter-title",
          "ckf-counter-text",
        ].includes(selector.get("name"))
      ) {
        selector.set("private", true);
      }
    });

    editor.DomComponents.addType("ckf-heading", {
      extend: "text",
      isComponent: (el: HTMLElement) => /^H[1-6]$/.test(el.tagName),
      model: {
        defaults: {
          tagName: "h2",
          name: "Title",
          headingLevel: "h2",
        },
        init() {
          const tag = String(this.get("tagName") || "h2").toLowerCase();
          this.set("headingLevel", tag);
          this.on("change:headingLevel", () => {
            this.set("tagName", String(this.get("headingLevel") || "h2"));
            this.set("name", "Title");
          });
        },
      },
    });

    editor.DomComponents.addType("image", {
      extend: "image",
      model: {
        defaults: {
          traits: ["alt"],
        },
      },
    });

    editor.DomComponents.addType("ckf-col", {
      isComponent: (el: HTMLElement) => el.classList?.contains("ckf-col"),
      model: {
        defaults: {
          tagName: "div",
          name: "Column",
          droppable: true,
          attributes: { class: "ckf-col" },
          colWidth: "50%",
          traits: [
            {
              type: "select",
              name: "colWidth",
              label: "Width",
              changeProp: true,
              options: COLUMN_WIDTHS.map((width) => ({ id: width, name: width })),
            },
          ],
          style: {
            display: "flex",
            "flex-direction": "column",
            width: "50%",
            "max-width": "50%",
            padding: "16px",
            "min-height": "140px",
            flex: "0 0 50%",
          },
        },
        init() {
          this.on("change:colWidth", () => {
            applyColumnWidth(this, String(this.get("colWidth") || ""));
          });
        },
      },
    });

    editor.DomComponents.addType("ckf-container", {
      isComponent: (el: HTMLElement) => el.classList?.contains("ckf-container"),
      model: {
        defaults: {
          tagName: "div",
          name: "Container",
          droppable: true,
          attributes: { class: "ckf-container" },
          style: {
            display: "flex",
            "flex-wrap": "wrap",
            width: "100%",
            "max-width": "1140px",
            margin: "0 auto",
            padding: "0 16px",
            "min-height": "140px",
          },
        },
      },
    });

    editor.DomComponents.addType("ckf-accordion-title", {
      extend: "text",
      isComponent: (el: HTMLElement) => el.classList?.contains("ckf-accordion-title"),
      model: {
        defaults: {
          tagName: "div",
          name: "Question",
          editable: true,
          attributes: { class: "ckf-accordion-title" },
          content: "Accordion question",
        },
      },
    });

    editor.DomComponents.addType("ckf-accordion-body", {
      extend: "text",
      isComponent: (el: HTMLElement) => el.classList?.contains("ckf-accordion-body"),
      model: {
        defaults: {
          tagName: "p",
          name: "Answer",
          editable: true,
          attributes: { class: "ckf-accordion-body" },
          content: "Add the answer text",
          style: {
            color: "var(--ckf-color-text)",
            margin: "0",
          },
        },
      },
    });

    editor.DomComponents.addType("ckf-accordion-item", {
      isComponent: (el: HTMLElement) => el.classList?.contains("ckf-accordion-item"),
      model: {
        defaults: {
          tagName: "div",
          name: "Accordion Item",
          droppable: true,
          attributes: { class: "ckf-accordion-item" },
          components: [
            {
              type: "ckf-accordion-title",
              content: "Accordion question",
            },
            {
              type: "ckf-accordion-body",
              content: "Add the answer text",
            },
          ],
        },
      },
    });

    editor.DomComponents.addType("ckf-accordion", {
      isComponent: (el: HTMLElement) => el.classList?.contains("ckf-accordion"),
      model: {
        defaults: {
          tagName: "div",
          name: "Accordion",
          droppable: ".ckf-accordion-item",
          attributes: { class: "ckf-accordion" },
          components: [
            {
              type: "ckf-accordion-item",
              attributes: { class: "ckf-accordion-item is-open" },
              components: [
                { type: "ckf-accordion-title", content: "Question 1" },
                { type: "ckf-accordion-body", content: "Add answer 1" },
              ],
            },
            {
              type: "ckf-accordion-item",
              components: [
                { type: "ckf-accordion-title", content: "Question 2" },
                { type: "ckf-accordion-body", content: "Add answer 2" },
              ],
            },
            {
              type: "ckf-accordion-item",
              components: [
                { type: "ckf-accordion-title", content: "Question 3" },
                { type: "ckf-accordion-body", content: "Add answer 3" },
              ],
            },
          ],
        },
      },
    });

    editor.DomComponents.addType("ckf-divider", {
      isComponent: (el: HTMLElement) => el.classList?.contains("ckf-divider"),
      model: {
        defaults: {
          tagName: "hr",
          void: true,
          name: "Divider",
          droppable: false,
          attributes: { class: "ckf-divider" },
          style: {
            width: "100%",
            height: "2px",
            border: "none",
            "background-color": "#e4eaf2",
            margin: "20px 0",
          },
        },
      },
    });

    editor.DomComponents.addType("ckf-counter", {
      isComponent: (el: HTMLElement) => {
        if (!el.classList?.contains("ckf-counter")) return false;
        return {
          type: "ckf-counter",
          count: el.getAttribute("data-count") || "0",
          suffix: el.getAttribute("data-suffix") || "",
        };
      },
      model: {
        defaults: {
          tagName: "div",
          name: "Counter",
          droppable: false,
          attributes: { class: "ckf-counter", "data-count": "92", "data-suffix": "%" },
          count: "92",
          suffix: "%",
          traits: [
            { type: "number", name: "count", label: "Number", changeProp: true, min: 0 },
            { type: "text", name: "suffix", label: "Suffix", changeProp: true },
          ],
          style: {
            display: "flex",
            "flex-direction": "column",
            "align-items": "center",
            "text-align": "center",
            width: "100%",
            padding: "16px",
          },
          components: [
            {
              tagName: "div",
              name: "Value",
              droppable: false,
              attributes: { class: "ckf-counter-value" },
              components: [
                {
                  type: "text",
                  tagName: "span",
                  name: "Number",
                  attributes: { class: "ckf-counter-number" },
                  content: "92",
                },
                {
                  type: "text",
                  tagName: "span",
                  name: "Suffix",
                  attributes: { class: "ckf-counter-suffix" },
                  content: "%",
                },
              ],
            },
            {
              type: "ckf-heading",
              tagName: "h3",
              headingLevel: "h3",
              name: "Title",
              attributes: { class: "ckf-counter-title" },
              content: "Stat title",
              style: {
                color: "var(--ckf-color-primary)",
                margin: "0 0 8px",
              },
            },
            {
              type: "text",
              tagName: "p",
              name: "Description",
              attributes: { class: "ckf-counter-text" },
              content: "Short description for this stat.",
              style: {
                color: "var(--ckf-color-text)",
                margin: "0",
              },
            },
          ],
        },
        init() {
          const sync = () => {
            const count = String(this.get("count") ?? "0");
            const suffix = String(this.get("suffix") ?? "");
            this.addAttributes({ "data-count": count, "data-suffix": suffix });
            this.find(".ckf-counter-number")[0]?.components(count);
            this.find(".ckf-counter-suffix")[0]?.components(suffix);
          };
          this.on("change:count change:suffix", sync);
        },
      },
    });

    editor.Commands.add("ckf-add-accordion-item", {
      run(ed) {
        const selected = ed.getSelected() as EditorComponent | undefined;
        if (!selected) return;
        closestAccordion(selected)?.append?.({ type: "ckf-accordion-item" });
      },
    });

    blocks.add("section", {
      label: "Section",
      category: "Layout",
      media: '<div class="ckf-plus-box">+</div>',
      content: {
        type: "default",
        tagName: "section",
        name: "Section",
        attributes: { class: "ckf-section" },
        droppable: true,
        style: {
          display: "block",
          width: "100%",
          padding: "0",
          "min-height": "160px",
        },
        components: [{ type: "ckf-container" }],
      },
    });

    blocks.add("row", {
      label: "Row",
      category: "Layout",
      media: '<div class="ckf-plus-box">+</div>',
      content: {
        type: "default",
        tagName: "div",
        name: "Row",
        attributes: { class: "ckf-row" },
        droppable: true,
        style: {
          display: "flex",
          "flex-wrap": "wrap",
          width: "100%",
          "min-height": "140px",
        },
      },
    });

    blocks.add("column", {
      label: "Column",
      category: "Layout",
      media: '<div class="ckf-plus-box">+</div>',
      content: {
        type: "ckf-col",
        tagName: "div",
        attributes: { class: "ckf-col" },
        droppable: true,
        colWidth: "50%",
        style: {
          display: "flex",
          "flex-direction": "column",
          width: "50%",
          "max-width": "50%",
          padding: "16px",
          "min-height": "140px",
          flex: "0 0 50%",
        },
      },
    });

    blocks.add("container", {
      label: "Container",
      category: "Layout",
      media: '<div class="ckf-plus-box">+</div>',
      content: { type: "ckf-container" },
    });

    blocks.add("title", {
      label: "Title",
      category: "Content",
      media: '<i class="bi bi-type-h1"></i>',
      content: {
        type: "ckf-heading",
        tagName: "h2",
        headingLevel: "h2",
        name: "Title",
        content: "Add your title",
        style: {
          color: "var(--ckf-color-primary)",
          margin: "0 0 12px",
        },
      },
    });

    blocks.add("text", {
      label: "Description",
      category: "Content",
      media: '<i class="bi bi-text-paragraph"></i>',
      content: {
        type: "text",
        tagName: "p",
        name: "Description",
        content: "Add your description text",
        style: {
          color: "var(--ckf-color-text)",
          margin: "0",
        },
      },
    });

    blocks.add("image", {
      label: "Image",
      category: "Content",
      media: '<i class="bi bi-image"></i>',
      content: { type: "image", name: "Image", style: { "max-width": "100%" } },
    });

    blocks.add("button", {
      label: "Button",
      category: "Content",
      media: '<i class="bi bi-record-circle"></i>',
      content: {
        type: "link",
        name: "Button",
        content: "Learn more",
        style: {
          display: "inline-flex",
          "align-self": "flex-start",
          width: "auto",
          padding: "11px 18px",
          "background-color": "transparent",
          color: "var(--ckf-color-secondary)",
          border: "1px solid var(--ckf-color-secondary)",
          "border-radius": "50px",
          "text-decoration": "none",
          "font-weight": "700",
          "font-family": "var(--ckf-font)",
          "line-height": "1",
        },
      },
    });

    blocks.add("accordion", {
      label: "Accordion",
      category: "Content",
      media: '<i class="bi bi-menu-button-wide"></i>',
      content: { type: "ckf-accordion" },
    });

    blocks.add("divider", {
      label: "Divider",
      category: "Content",
      media: '<i class="bi bi-dash-lg"></i>',
      content: { type: "ckf-divider" },
    });

    blocks.add("counter", {
      label: "Counter",
      category: "Content",
      media: '<i class="bi bi-123"></i>',
      content: { type: "ckf-counter" },
    });

    try {
      editor.BlockManager.getCategories().each((category: { set: (key: string, value: boolean) => void }) =>
        category.set("open", true)
      );
    } catch {
      // Keep default categories.
    }

    const initial = parseLayoutContent(value);
    themeRef.current = initial.theme;

    editor.on("load", () => {
      if (initial.html) editor.setComponents(initial.html);
      if (initial.css) editor.setStyle(stripThemeCss(initial.css));
      injectCanvasTheme(editor, themeRef.current);
      emit();
    });

    const stylesEl = stylesRef.current;
    const openGjsColor = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const field = target.closest(".gjs-field-color") as HTMLElement | null;
      if (!field) return;
      event.preventDefault();
      event.stopPropagation();
      const input = field.querySelector("input");
      const swatch = field.querySelector(".gjs-field-color-picker") as HTMLElement | null;
      setGjsColor({
        value: input?.value || swatch?.style.backgroundColor || "#000000",
        left: event.clientX,
        top: event.clientY + 8,
        field,
      });
    };
    stylesEl.addEventListener("click", openGjsColor, true);

    editor.on("component:styleUpdate", (component: EditorComponent) => {
      if (!isColumn(component)) return;
      const width = applyColumnWidth(component);
      if (editor.getSelected() === component) setColWidth(width);
    });

    editor.on("component:selected", (component: EditorComponent) => {
      const style = (component.getStyle() || {}) as Record<string, string>;
      setHasSelection(true);
      setSelectedColor(toColorInputValue(style.color, themeRef.current, "#000000"));
      setSelectedBg(toColorInputValue(style["background-color"], themeRef.current, "#ffffff"));
      setImageSrc(isImage(component) ? imageSrcOf(component) : null);
      setShowAddAccordionItem(Boolean(closestAccordion(component)));

      const counter = closestCounter(component);
      setCounterFields(
        counter
          ? {
              count: String(counter.get?.("count") || counter.getEl?.()?.getAttribute("data-count") || "0"),
              suffix: String(counter.get?.("suffix") ?? counter.getEl?.()?.getAttribute("data-suffix") ?? ""),
            }
          : null
      );

      if (isColumn(component)) {
        setColWidth(currentColumnWidth(component));
        setHeadingLevel("");
        setTextKind("");
        setTextValue("");
        return;
      }

      setColWidth("");
      setHeadingLevel(isHeading(component) ? headingTagOf(component) || "h2" : "");

      if (isWritableText(component)) {
        const answer = accordionAnswerOf(component);
        if (isAccordionTitle(component) || isHeading(component)) {
          setTextKind("title");
          setTextValue(componentText(component));
          return;
        }
        setTextKind("description");
        setTextValue(componentText(answer || component));
        return;
      }

      setTextKind("");
      setTextValue("");
    });

    editor.on("rte:disable", () => {
      const selected = editor.getSelected() as EditorComponent | undefined;
      if (!selected || !isWritableText(selected)) return;
      const target = isAccordionTitle(selected) ? selected : accordionAnswerOf(selected) || selected;
      setTextValue(componentText(target));
    });

    editor.on("component:deselected", () => {
      setColWidth("");
      setHeadingLevel("");
      setTextKind("");
      setTextValue("");
      setImageSrc(null);
      setShowAddAccordionItem(false);
      setCounterFields(null);
      setHasSelection(false);
    });
    editor.on("update", emit);
    editorRef.current = editor;

    return () => {
      stylesEl.removeEventListener("click", openGjsColor, true);
      editor.destroy();
      editorRef.current = null;
    };
  }, []);

  const applyTheme = (next: LayoutTheme) => {
    themeRef.current = next;
    setTheme(next);
    if (editorRef.current) injectCanvasTheme(editorRef.current, next);
    emit();
  };

  const updateTypography = (tag: TypographyTag, patch: Partial<ThemeTextStyle>) => {
    applyTheme({
      ...theme,
      typography: {
        ...theme.typography,
        [tag]: { ...theme.typography[tag], ...patch },
      },
    });
  };

  const setColumnWidth = (width: string) => {
    const selected = editorRef.current?.getSelected() as EditorComponent | undefined;
    if (!selected || !isColumn(selected)) return;
    applyColumnWidth(selected, width);
    setColWidth(width);
  };

  const setHeadingTag = (tag: string) => {
    const selected = editorRef.current?.getSelected() as EditorComponent | undefined;
    if (!selected || !isHeading(selected)) return;
    selected.set?.("headingLevel", tag);
    selected.set?.("tagName", tag);
    setHeadingLevel(tag);
  };

  const writeSelectedText = (next: string) => {
    const selected = editorRef.current?.getSelected() as EditorComponent | undefined;
    if (!selected || !isWritableText(selected)) return;
    const target = isAccordionTitle(selected) ? selected : accordionAnswerOf(selected) || selected;
    setTextValue(next);
    setComponentText(target, next);
  };

  const setSelectedImageSrc = (src: string) => {
    const selected = editorRef.current?.getSelected() as EditorComponent | undefined;
    if (!selected || !isImage(selected)) return;
    selected.set?.("src", src);
    setImageSrc(src);
  };

  const addAccordionItem = () => {
    editorRef.current?.runCommand("ckf-add-accordion-item");
  };

  const updateCounterField = (field: "count" | "suffix", value: string) => {
    const selected = editorRef.current?.getSelected() as EditorComponent | undefined;
    if (!selected) return;
    const counter = closestCounter(selected);
    if (!counter) return;
    counter.set?.(field, value);
    setCounterFields((current) => (current ? { ...current, [field]: value } : current));
  };

  const setCanvasDevice = (name: string) => {
    setDevice(name);
    const editor = editorRef.current;
    editor?.Devices.select(name);
    const selected = editor?.getSelected() as EditorComponent | undefined;
    if (selected && isColumn(selected)) setColWidth(currentColumnWidth(selected));
  };

  const applyColorToSelected = (cssVar: string, property: "color" | "background-color") => {
    const selected = editorRef.current?.getSelected() as EditorComponent | undefined;
    if (!selected) return;
    selected.addStyle({ [property]: cssVar });
  };

  const setSelectedStyleColor = (property: "color" | "background-color", value: string) => {
    const selected = editorRef.current?.getSelected() as EditorComponent | undefined;
    if (!selected) return;
    selected.addStyle({ [property]: value });
    if (property === "color") setSelectedColor(value);
    else setSelectedBg(value);
  };

  return (
    <>
    <div className={`ckf-layout-editor ${layersOpen ? "is-layers-open" : ""}`}>
      <aside className="ckf-layout-editor__blocks">
        <p className="ckf-layout-editor__side-title">Blocks</p>
        <div className="ckf-layout-editor__blocks-body" ref={blocksRef} />
      </aside>

      <aside className="ckf-layout-editor__layers">
        <p className="ckf-layout-editor__side-title">Layers</p>
        <div className="ckf-layout-editor__layers-body" ref={layersRef} />
      </aside>

      <div className="ckf-layout-editor__stage">
        <div className="ckf-layout-editor__toolbar">
          <p className="ckf-layout-editor__toolbar-label">Canvas</p>
          {["Desktop", "Tablet", "Mobile"].map((name) => (
            <button
              key={name}
              type="button"
              className={`ckf-layout-editor__tool ${device === name ? "is-active" : ""}`}
              title={name}
              onClick={() => setCanvasDevice(name)}
            >
              <i className={`bi ${name === "Desktop" ? "bi-laptop" : name === "Tablet" ? "bi-tablet" : "bi-phone"}`}></i>
            </button>
          ))}
          <button
            type="button"
            className={`ckf-layout-editor__tool ${layersOpen ? "is-active" : ""}`}
            title="Layers"
            onClick={() => setLayersOpen((open) => !open)}
          >
            <i className="bi bi-layers"></i>
          </button>
          <button
            type="button"
            className={`ckf-layout-editor__theme-btn ${themeOpen ? "is-active" : ""}`}
            onClick={() => setThemeOpen(true)}
          >
            <i className="bi bi-palette2"></i>
            Default Theme
          </button>
          {colWidth ? (
            <>
              <span className="ckf-layout-editor__toolbar-sep"></span>
              <p className="ckf-layout-editor__toolbar-label">Column</p>
              {COLUMN_WIDTHS.map((width) => (
                <button
                  key={width}
                  type="button"
                  className={`ckf-layout-editor__width ${colWidth === width ? "is-active" : ""}`}
                  onClick={() => setColumnWidth(width)}
                >
                  {width.replace("%", "")}
                </button>
              ))}
            </>
          ) : null}
        </div>
        <div className="ckf-layout-editor__canvas" ref={hostRef} />
      </div>

      <aside className="ckf-layout-editor__styles">
        <p className="ckf-layout-editor__side-title">Column</p>
        <div className="ckf-layout-editor__traits" ref={traitsRef} />
        <p className="ckf-layout-editor__side-title">Style</p>
        {headingLevel ? (
          <label className="ckf-layout-editor__field ckf-layout-editor__heading-field">
            <span>Heading</span>
            <select value={headingLevel} onChange={(event) => setHeadingTag(event.target.value)}>
              {HEADING_SIZES.map((item) => (
                <option key={item.tag} value={item.tag}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        ) : null}
        {textKind ? (
          <label className="ckf-layout-editor__field ckf-layout-editor__content-field">
            <span>{textKind === "title" ? "Title text" : "Description text"}</span>
            <textarea
              rows={textKind === "title" ? 4 : 8}
              value={textValue}
              placeholder={textKind === "title" ? "Write title text" : "Write description text or HTML"}
              onChange={(event) => writeSelectedText(event.target.value)}
            />
          </label>
        ) : null}
        {imageSrc !== null ? (
          <label className="ckf-layout-editor__field ckf-layout-editor__image-field">
            <span>Upload image</span>
            {imageSrc ? <img src={imageSrc} alt="" className="ckf-layout-editor__image-preview" /> : null}
            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files?.[0];
                event.target.value = "";
                if (!file || !file.type.startsWith("image/")) return;
                const reader = new FileReader();
                reader.onload = () => setSelectedImageSrc(String(reader.result || ""));
                reader.readAsDataURL(file);
              }}
            />
          </label>
        ) : null}
        {showAddAccordionItem ? (
          <button type="button" className="ckf-layout-editor__add-btn" onClick={addAccordionItem}>
            Add accordion item
          </button>
        ) : null}
        {counterFields ? (
          <div className="ckf-layout-editor__counter-fields">
            <label className="ckf-layout-editor__field">
              <span>Number</span>
              <input
                type="number"
                min="0"
                value={counterFields.count}
                onChange={(event) => updateCounterField("count", event.target.value)}
              />
            </label>
            <label className="ckf-layout-editor__field">
              <span>Suffix</span>
              <input
                type="text"
                value={counterFields.suffix}
                placeholder="%"
                onChange={(event) => updateCounterField("suffix", event.target.value)}
              />
            </label>
          </div>
        ) : null}
        {hasSelection ? (
          <div className="ckf-layout-editor__color-fields">
            <ColorPicker label="Color" value={selectedColor} onChange={(value) => setSelectedStyleColor("color", value)} />
            <ColorPicker label="Background" value={selectedBg} onChange={(value) => setSelectedStyleColor("background-color", value)} />
          </div>
        ) : null}
        <div className="ckf-layout-editor__styles-body" ref={stylesRef} />
      </aside>
    </div>

      {gjsColor ? (
        <ColorPickerPanel
          value={gjsColor.value}
          left={gjsColor.left}
          top={gjsColor.top}
          onChange={(hex) => {
            const input = gjsColor.field.querySelector("input");
            const swatch = gjsColor.field.querySelector(".gjs-field-color-picker") as HTMLElement | null;
            if (input) {
              input.value = hex;
              input.dispatchEvent(new Event("input", { bubbles: true }));
              input.dispatchEvent(new Event("change", { bubbles: true }));
            }
            if (swatch) swatch.style.backgroundColor = hex;
            setGjsColor((current) => (current ? { ...current, value: hex } : current));
          }}
          onClose={() => setGjsColor(null)}
        />
      ) : null}

      <Modal
        open={themeOpen}
        title="Default Theme"
        className="ckf-modal--theme"
        onClose={() => setThemeOpen(false)}
      >
        <div className="ckf-theme-modal">
          <h2 className="ckf-theme-modal__title">Default Theme</h2>
          <p className="ckf-theme-modal__subtitle">
            Set global colors and default typography for headings and paragraph text.
          </p>

          <p className="ckf-theme-modal__section">Colors</p>
          <label className="ckf-layout-editor__field ckf-theme-modal__font">
            <span>Body font</span>
            <select
              value={theme.fontFamily}
              onChange={(event) => applyTheme({ ...theme, fontFamily: event.target.value })}
            >
              {LAYOUT_FONTS.map((font) => (
                <option key={font.id} value={font.id}>
                  {font.label}
                </option>
              ))}
            </select>
          </label>

          <div className="ckf-theme-modal__colors">
            {THEME_COLORS.map((item) => (
              <div key={item.key} className="ckf-layout-editor__color-row">
                <ColorPicker
                  label={item.label}
                  value={theme.colors[item.key]}
                  onChange={(value) =>
                    applyTheme({
                      ...theme,
                      colors: { ...theme.colors, [item.key]: value },
                    })
                  }
                />
                <button
                  type="button"
                  className="ckf-layout-editor__swatch-btn"
                  title={`Apply ${item.label} as text color`}
                  onClick={() => applyColorToSelected(item.cssVar, "color")}
                >
                  Aa
                </button>
                <button
                  type="button"
                  className="ckf-layout-editor__swatch-btn"
                  title={`Apply ${item.label} as background`}
                  onClick={() => applyColorToSelected(item.cssVar, "background-color")}
                >
                  Bg
                </button>
              </div>
            ))}
          </div>

          <p className="ckf-theme-modal__section">Typography</p>
          <div className="ckf-theme-type">
            <div className="ckf-theme-type__head">
              <span>Tag</span>
              <span>Font family</span>
              <span>Size</span>
              <span>Weight</span>
              <span>Line height</span>
            </div>
            {TYPOGRAPHY_TAGS.map((tag) => {
              const style = theme.typography[tag];
              return (
                <div key={tag} className="ckf-theme-type__row">
                  <strong>{tag.toUpperCase()}</strong>
                  <select
                    value={style.fontFamily}
                    onChange={(event) => updateTypography(tag, { fontFamily: event.target.value })}
                  >
                    {FONT_STYLE_OPTIONS.map((font) => (
                      <option key={font.id} value={font.id}>
                        {font.label}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    min="8"
                    max="120"
                    value={parsePx(style.fontSize)}
                    onChange={(event) => updateTypography(tag, { fontSize: `${event.target.value || "16"}px` })}
                  />
                  <select
                    value={style.fontWeight}
                    onChange={(event) => updateTypography(tag, { fontWeight: event.target.value })}
                  >
                    {FONT_WEIGHTS.map((weight) => (
                      <option key={weight.id} value={weight.id}>
                        {weight.label}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    min="1"
                    max="3"
                    step="0.05"
                    value={style.lineHeight}
                    onChange={(event) => updateTypography(tag, { lineHeight: event.target.value || "1.4" })}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default LayoutEditor;
