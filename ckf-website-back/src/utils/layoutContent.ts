export type ThemeTextStyle = {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
};

export const TYPOGRAPHY_TAGS = ["h1", "h2", "h3", "h4", "h5", "h6", "p"] as const;
export type TypographyTag = (typeof TYPOGRAPHY_TAGS)[number];

export type LayoutTheme = {
  fontFamily: string;
  colors: {
    primary: string;
    secondary: string;
    text: string;
    background: string;
  };
  typography: Record<TypographyTag, ThemeTextStyle>;
};

type LayoutContent = {
  html?: string;
  css?: string;
  theme?: Partial<LayoutTheme> & {
    colors?: Partial<LayoutTheme["colors"]>;
    typography?: Partial<Record<TypographyTag, Partial<ThemeTextStyle>>>;
  };
};

export const LAYOUT_FONTS = [
  { id: "Nunito, 'Segoe UI', Arial, sans-serif", label: "Nunito" },
  { id: "Inter, sans-serif", label: "Inter" },
  { id: "Poppins, sans-serif", label: "Poppins" },
  { id: "Roboto, sans-serif", label: "Roboto" },
  { id: "Georgia, serif", label: "Georgia" },
  { id: "Arial, Helvetica, sans-serif", label: "Arial" },
  { id: "'Times New Roman', Times, serif", label: "Times New Roman" },
];

export const FONT_WEIGHTS = [
  { id: "300", label: "Light" },
  { id: "400", label: "Regular" },
  { id: "500", label: "Medium" },
  { id: "600", label: "Semibold" },
  { id: "700", label: "Bold" },
  { id: "800", label: "Extra Bold" },
];

export const defaultTypography: Record<TypographyTag, ThemeTextStyle> = {
  h1: { fontFamily: "var(--ckf-font)", fontSize: "40px", fontWeight: "800", lineHeight: "1.2" },
  h2: { fontFamily: "var(--ckf-font)", fontSize: "32px", fontWeight: "700", lineHeight: "1.3" },
  h3: { fontFamily: "var(--ckf-font)", fontSize: "26px", fontWeight: "700", lineHeight: "1.35" },
  h4: { fontFamily: "var(--ckf-font)", fontSize: "22px", fontWeight: "700", lineHeight: "1.4" },
  h5: { fontFamily: "var(--ckf-font)", fontSize: "18px", fontWeight: "700", lineHeight: "1.45" },
  h6: { fontFamily: "var(--ckf-font)", fontSize: "16px", fontWeight: "700", lineHeight: "1.5" },
  p: { fontFamily: "var(--ckf-font)", fontSize: "16px", fontWeight: "400", lineHeight: "1.6" },
};

export const defaultLayoutTheme: LayoutTheme = {
  fontFamily: "Nunito, 'Segoe UI', Arial, sans-serif",
  colors: {
    primary: "#062d67",
    secondary: "#f58020",
    text: "#575757",
    background: "#ffffff",
  },
  typography: defaultTypography,
};

const unwrapHtml = (html: string) => {
  const trimmed = html.trim();
  if (!trimmed) return "";

  const bodyMatch = trimmed.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (bodyMatch) return bodyMatch[1].trim();

  return trimmed;
};

const normalizeTextStyle = (style: Partial<ThemeTextStyle> | undefined, fallback: ThemeTextStyle): ThemeTextStyle => ({
  fontFamily: style?.fontFamily || fallback.fontFamily,
  fontSize: style?.fontSize || fallback.fontSize,
  fontWeight: style?.fontWeight || fallback.fontWeight,
  lineHeight: style?.lineHeight || fallback.lineHeight,
});

const normalizeTheme = (theme?: LayoutContent["theme"] | null): LayoutTheme => ({
  fontFamily: theme?.fontFamily || defaultLayoutTheme.fontFamily,
  colors: {
    primary: theme?.colors?.primary || defaultLayoutTheme.colors.primary,
    secondary: theme?.colors?.secondary || defaultLayoutTheme.colors.secondary,
    text: theme?.colors?.text || defaultLayoutTheme.colors.text,
    background: theme?.colors?.background || defaultLayoutTheme.colors.background,
  },
  typography: TYPOGRAPHY_TAGS.reduce(
    (next, tag) => {
      next[tag] = normalizeTextStyle(theme?.typography?.[tag], defaultTypography[tag]);
      return next;
    },
    {} as Record<TypographyTag, ThemeTextStyle>
  ),
});

export const parseLayoutContent = (value?: string | LayoutContent | null) => {
  if (!value) return { html: "", css: "", theme: defaultLayoutTheme };

  if (typeof value === "object") {
    return {
      html: unwrapHtml(value.html || ""),
      css: value.css || "",
      theme: normalizeTheme(value.theme),
    };
  }

  try {
    const data = JSON.parse(value) as LayoutContent;
    if (data && typeof data === "object") {
      return {
        html: unwrapHtml(data.html || ""),
        css: data.css || "",
        theme: normalizeTheme(data.theme),
      };
    }
  } catch {
    // Older records stored plain HTML.
  }

  return { html: unwrapHtml(value), css: "", theme: defaultLayoutTheme };
};

export const hasLayoutContent = (value?: string | null) =>
  Boolean(parseLayoutContent(value).html);

const typographyToCss = (theme: LayoutTheme) =>
  TYPOGRAPHY_TAGS.map((tag) => {
    const style = theme.typography[tag];
    return `${tag} {
  font-family: ${style.fontFamily};
  font-size: ${style.fontSize};
  font-weight: ${style.fontWeight};
  line-height: ${style.lineHeight};
}`;
  }).join("\n");

export const themeToCss = (theme: LayoutTheme) => `/*ckf-theme-start*/
:root {
  --ckf-font: ${theme.fontFamily};
  --ckf-color-primary: ${theme.colors.primary};
  --ckf-color-secondary: ${theme.colors.secondary};
  --ckf-color-text: ${theme.colors.text};
  --ckf-color-background: ${theme.colors.background};
}
html, body {
  font-family: var(--ckf-font);
  color: var(--ckf-color-text);
  background: var(--ckf-color-background);
}
${typographyToCss(theme)}
/*ckf-theme-end*/`;

export const stripThemeCss = (css: string) =>
  css.replace(/\/\*ckf-theme-start\*\/[\s\S]*?\/\*ckf-theme-end\*\//g, "").trim();

export const parsePx = (value: string) => {
  const match = String(value).match(/[\d.]+/);
  return match ? match[0] : "";
};
