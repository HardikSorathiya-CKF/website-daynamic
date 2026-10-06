import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

import connectDB from "../config/db.js";
import Service from "../models/Service.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FRONT_DATA = path.resolve(__dirname, "../../ckf-website-front/src/data");
const SITE = "https://cloudkodeform.com";

const defaultLayoutTheme = {
    fontFamily: "Nunito, 'Segoe UI', Arial, sans-serif",
    colors: {
        primary: "#062d67",
        secondary: "#f58020",
        text: "#575757",
        background: "#ffffff",
    },
    typography: {
        h1: { fontFamily: "var(--ckf-font)", fontSize: "40px", fontWeight: "800", lineHeight: "1.2" },
        h2: { fontFamily: "var(--ckf-font)", fontSize: "32px", fontWeight: "700", lineHeight: "1.3" },
        h3: { fontFamily: "var(--ckf-font)", fontSize: "26px", fontWeight: "700", lineHeight: "1.35" },
        h4: { fontFamily: "var(--ckf-font)", fontSize: "22px", fontWeight: "700", lineHeight: "1.4" },
        h5: { fontFamily: "var(--ckf-font)", fontSize: "18px", fontWeight: "700", lineHeight: "1.45" },
        h6: { fontFamily: "var(--ckf-font)", fontSize: "16px", fontWeight: "700", lineHeight: "1.5" },
        p: { fontFamily: "var(--ckf-font)", fontSize: "16px", fontWeight: "400", lineHeight: "1.6" },
    },
};

const styles = {
    section: "display:block;width:100%;padding:0;min-height:160px;",
    container:
        "display:flex;flex-wrap:wrap;width:100%;max-width:1140px;margin:0 auto;padding:0 16px;box-sizing:border-box;",
    row: "display:flex;flex-wrap:wrap;width:100%;min-height:140px;",
    col50:
        "display:flex;flex-direction:column;width:50%;max-width:50%;padding:16px;min-height:140px;flex:0 0 50%;",
    col100:
        "display:flex;flex-direction:column;width:100%;max-width:100%;padding:16px;min-height:140px;flex:0 0 100%;",
    h2: "color:var(--ckf-color-primary);margin:0 0 12px;",
    h3: "color:var(--ckf-color-primary);margin:16px 0 8px;",
    h5: "color:var(--ckf-color-primary);margin:16px 0 8px;",
    p: "color:var(--ckf-color-text);margin:0 0 12px;",
    img: "max-width:100%;height:auto;border-radius:12px;",
    button:
        "display:inline-flex;align-self:flex-start;width:auto;padding:11px 18px;background-color:transparent;color:var(--ckf-color-secondary);border:1px solid var(--ckf-color-secondary);border-radius:50px;text-decoration:none;font-weight:700;font-family:var(--ckf-font);line-height:1;margin:8px 0 0;",
};

const escapeHtml = (value) =>
    String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

const toDataUrl = (filePath) => {
    if (!filePath || !fs.existsSync(filePath)) return "";
    const ext = path.extname(filePath).slice(1) || "webp";
    return `data:image/${ext};base64,${fs.readFileSync(filePath).toString("base64")}`;
};

const loadData = (fileName, names) => {
    const filePath = path.join(FRONT_DATA, fileName);
    let source = fs.readFileSync(filePath, "utf8");

    source = source.replace(/^import\s+.+$/gm, (line) => {
        const match = line.match(/import\s+(\w+)\s+from\s+['"]([^'"]+)['"]/);
        if (!match) return "";
        const abs = path.resolve(path.dirname(filePath), match[2]);
        return `const ${match[1]} = ${JSON.stringify(abs)};`;
    });
    source = source.replace(/^export\s+/gm, "");

    const sandbox = { console };
    vm.createContext(sandbox);
    const picked = names
        .map((name) => `${name}: typeof ${name} !== "undefined" ? ${name} : null`)
        .join(",");

    vm.runInContext(`${source}\nglobalThis.__out = { ${picked} };`, sandbox, {
        filename: filePath,
    });

    return sandbox.__out;
};

const wrapSection = (inner) =>
    `<section class="ckf-section" style="${styles.section}"><div class="ckf-container" style="${styles.container}"><div class="ckf-row" style="${styles.row}">${inner}</div></div></section>`;

const wrapCol = (inner, width = "100") =>
    `<div class="ckf-col" style="${width === "50" ? styles.col50 : styles.col100}">${inner}</div>`;

const imageTag = (filePath, alt) => {
    const src = toDataUrl(filePath);
    if (!src) return "";
    return `<img src="${src}" alt="${escapeHtml(alt)}" style="${styles.img}" />`;
};

const renderParagraph = (content) => {
    if (typeof content === "string") {
        return `<p style="${styles.p}">${escapeHtml(content)}</p>`;
    }

    if (content?.type === "compare") {
        return `<h5 style="${styles.h5}">Old Way</h5><p style="${styles.p}">${escapeHtml(content.oldWay)}</p><h5 style="${styles.h5}">New Way</h5><p style="${styles.p}">${escapeHtml(content.newWay)}</p>`;
    }

    if (content?.label) {
        const subItems = (content.subItems || [])
            .map(
                (item) =>
                    `<h5 style="${styles.h5}">${escapeHtml(item.label)}</h5><p style="${styles.p}">${escapeHtml(item.text || "")}</p>`
            )
            .join("");
        return `<h5 style="${styles.h5}">${escapeHtml(content.label)}</h5><p style="${styles.p}">${escapeHtml(content.text || "")}</p>${subItems}`;
    }

    return "";
};

const renderList = (items) => {
    if (!items?.length) return "";
    return `<ul style="margin:0 0 12px;padding-left:18px;color:var(--ckf-color-text);">${items
        .map((item) => `<li style="margin:0 0 8px;">${escapeHtml(item)}</li>`)
        .join("")}</ul>`;
};

const button = (label) =>
    `<a href="${SITE}/contact" style="${styles.button}">${escapeHtml(label)}</a>`;

const buildLayoutHtml = ({ detail, content, features, highlight, faqs }) => {
    const intro = detail?.intro || {};
    const introText = [
        `<h2 style="${styles.h2}">${escapeHtml(intro.title || detail?.slug || "")}</h2>`,
        intro.description ? `<p style="${styles.p}">${escapeHtml(intro.description)}</p>` : "",
        intro.description2 ? `<p style="${styles.p}">${escapeHtml(intro.description2)}</p>` : "",
        renderList(intro.points),
        (intro.footer || []).map((item) => `<p style="${styles.p}">${escapeHtml(item)}</p>`).join(""),
        button("Get Started"),
    ].join("");

    const parts = [
        wrapSection(`${wrapCol(introText, "50")}${wrapCol(imageTag(detail?.image, intro.title), "50")}`),
    ];

    if (content?.heading || content?.intro?.length) {
        parts.push(
            wrapSection(
                wrapCol(
                    [
                        content.heading
                            ? `<h2 style="${styles.h2}">${escapeHtml(content.heading)}</h2>`
                            : "",
                        (content.intro || [])
                            .map((item) => `<p style="${styles.p}">${escapeHtml(item)}</p>`)
                            .join(""),
                        renderList(content.introPoints),
                        (content.introAfter || [])
                            .map((item) => `<p style="${styles.p}">${escapeHtml(item)}</p>`)
                            .join(""),
                    ].join("")
                )
            )
        );
    }

    (content?.sections || []).forEach((section) => {
        const text = [
            `<h3 style="${styles.h3}">${escapeHtml(section.title)}</h3>`,
            (section.paragraphs || []).map(renderParagraph).join(""),
        ].join("");
        const image = imageTag(section.image, section.title);

        if (image && section.imagePosition === "right") {
            parts.push(wrapSection(`${wrapCol(text, "50")}${wrapCol(image, "50")}`));
        } else if (image) {
            parts.push(wrapSection(`${wrapCol(image, "50")}${wrapCol(text, "50")}`));
        } else {
            parts.push(wrapSection(wrapCol(text)));
        }
    });

    if (features?.length) {
        parts.push(
            wrapSection(
                wrapCol(
                    `<h2 style="${styles.h2}">Key Service Features</h2>${features
                        .map(
                            (item) =>
                                `<h3 style="${styles.h3}">${escapeHtml(item.title)}</h3><p style="${styles.p}">${escapeHtml(item.description)}</p>`
                        )
                        .join("")}`
                )
            )
        );
    }

    if (highlight) {
        const text = [
            `<h2 style="${styles.h2}">${escapeHtml(highlight.title)}</h2>`,
            highlight.description
                ? `<p style="${styles.p}">${escapeHtml(highlight.description)}</p>`
                : "",
            (highlight.steps || [])
                .map(
                    (step) =>
                        `<h5 style="${styles.h5}">${escapeHtml(step.title)}</h5><p style="${styles.p}">${escapeHtml(step.text)}</p>`
                )
                .join(""),
            renderList(highlight.points),
            highlight.closing
                ? `<p style="${styles.p}">${escapeHtml(highlight.closing)}</p>`
                : "",
            button(highlight.ctaText || "Start With Us"),
        ].join("");

        parts.push(
            wrapSection(
                `${wrapCol(imageTag(highlight.image, highlight.title), "50")}${wrapCol(text, "50")}`
            )
        );
    }

    if (faqs?.length) {
        parts.push(
            wrapSection(
                wrapCol(
                    `<h2 style="${styles.h2}">Frequently Asked Questions</h2><div class="ckf-accordion">${faqs
                        .map(
                            (faq, index) =>
                                `<div class="ckf-accordion-item${index === 0 ? " is-open" : ""}"><div class="ckf-accordion-title">${escapeHtml(faq.question)}</div><p class="ckf-accordion-body" style="${styles.p}">${escapeHtml(faq.answer)}</p></div>`
                        )
                        .join("")}</div>`
                )
            )
        );
    }

    return parts.join("");
};

const seedServiceContent = async () => {
    try {
        await connectDB();

        const { serviceDetails } = loadData("serviceDetailData.js", ["serviceDetails"]);
        const { serviceContents } = loadData("serviceContentData.js", ["serviceContents"]);
        const { serviceFeatures } = loadData("serviceFeatureData.js", ["serviceFeatures"]);
        const { serviceHighlights } = loadData("serviceHighlightData.js", ["serviceHighlights"]);
        const { serviceFaqs } = loadData("serviceFaqData.js", ["serviceFaqs"]);

        const slugs = Object.keys(serviceDetails || {});

        for (const slug of slugs) {
            const service = await Service.findOne({ slug, isDeleted: false });

            if (!service) {
                console.log(`Skipped missing service: ${slug}`);
                continue;
            }

            service.content = JSON.stringify({
                html: buildLayoutHtml({
                    detail: serviceDetails[slug],
                    content: serviceContents?.[slug],
                    features: serviceFeatures?.[slug] || [],
                    highlight: serviceHighlights?.[slug],
                    faqs: serviceFaqs?.[slug] || [],
                }),
                css: "",
                theme: defaultLayoutTheme,
            });

            await service.save();
            console.log(`Added content: ${slug}`);
        }

        console.log(`Done. ${slugs.length} service pages ready.`);
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedServiceContent();
