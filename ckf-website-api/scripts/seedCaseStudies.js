import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

import connectDB from "../config/db.js";
import CaseStudy from "../models/CaseStudy.js";
import {
    caseStudies,
    getCaseStudyContentSections,
    getCaseStudyFaqs,
} from "./data/frontendCaseStudies.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES_ROOT = path.resolve(
    __dirname,
    "../../ckf-website-front/src/assets/images"
);
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
    a: "color:var(--ckf-color-secondary);text-decoration:underline;",
    button:
        "display:inline-flex;align-self:flex-start;width:auto;padding:11px 18px;background-color:transparent;color:var(--ckf-color-secondary);border:1px solid var(--ckf-color-secondary);border-radius:50px;text-decoration:none;font-weight:700;font-family:var(--ckf-font);line-height:1;margin:8px 0 0;",
};

const studyMeta = {
    "building-smarter-mobile-apps": {
        breadcrumbImage: "common/mobileapp.webp",
        seoTitle: "Building Smarter Mobile Apps | CloudKodeForm",
        seoKeywords:
            "mobile app AI, retrofit AI, on-device ML, CloudKodeForm case study",
    },
    "shifting-to-the-edge": {
        breadcrumbImage: "common/cloudservices.webp",
        seoTitle: "Shifting to the Edge | CloudKodeForm",
        seoKeywords:
            "edge architecture, full-stack, cloud hosting, CloudKodeForm case study",
    },
    "devsecops-policy-as-code": {
        breadcrumbImage: "common/devops.webp",
        seoTitle: "DevSecOps by Default | CloudKodeForm",
        seoKeywords:
            "DevSecOps, policy as code, CI/CD security, CloudKodeForm case study",
    },
    "modern-finops-cloud-cost": {
        breadcrumbImage: "common/cloudservices.webp",
        seoTitle: "Beyond Right-Sizing | CloudKodeForm",
        seoKeywords:
            "FinOps, cloud cost, right-sizing, CloudKodeForm case study",
    },
    "multi-agent-ai-enterprise-apps": {
        breadcrumbImage: "common/ai.webp",
        seoTitle: "Beyond the Prompt | CloudKodeForm",
        seoKeywords:
            "multi-agent AI, enterprise apps, autonomous agents, CloudKodeForm case study",
    },
    "event-driven-microservices": {
        breadcrumbImage: "common/microservice.webp",
        seoTitle: "Event-Driven First | CloudKodeForm",
        seoKeywords:
            "event-driven microservices, Kafka, REST, CloudKodeForm case study",
    },
};

const toDataUrl = (relativePath) => {
    if (!relativePath) return "";
    const filePath = path.join(IMAGES_ROOT, relativePath);
    if (!fs.existsSync(filePath)) {
        console.warn(`Image not found: ${filePath}`);
        return "";
    }
    const ext = path.extname(relativePath).slice(1) || "webp";
    return `data:image/${ext};base64,${fs.readFileSync(filePath).toString("base64")}`;
};

const webPageSchema = (name, description, urlPath) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    name,
    description,
    url: `${SITE}${urlPath}`,
    publisher: {
        "@type": "Organization",
        name: "CloudKodeForm",
        url: `${SITE}/`,
    },
});

const escapeHtml = (value) =>
    String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

const isLikelyLabel = (label) => {
    if (!label || label.length < 3 || label.length > 90) return false;
    if (/^https?:\/\//i.test(label)) return false;
    if (/\.\s+[A-Z]/.test(label)) return false;
    if (label.split(/\s+/).length > 14) return false;
    if (/^(At|In|On|The|With|For|We|Our|You|This|That|If|When|By|From|As|It|An|A)\s/i.test(label)) {
        return false;
    }

    if (label.length <= 72 && !label.includes(".")) {
        return true;
    }

    return (
        /^\d/.test(label)
        || label.includes("&")
        || label.includes("(")
        || /[A-Z][a-z]+(?:\s+[A-Z&(-][^:]*){1,}/.test(label)
    );
};

const parseStringParagraph = (text) => {
    const colonIndex = text.indexOf(":");
    if (colonIndex > 2 && colonIndex < 90) {
        const label = text.slice(0, colonIndex).trim();
        const body = text.slice(colonIndex + 1).trim();
        if (isLikelyLabel(label) && body) {
            return { label, text: body };
        }
    }
    return null;
};

const renderSegments = (segments) =>
    (segments || [])
        .map((segment) => {
            if (segment.href) {
                return `<a href="${escapeHtml(segment.href)}" style="${styles.a}">${escapeHtml(segment.text)}</a>`;
            }
            return escapeHtml(segment.text);
        })
        .join("");

const renderRichText = (content) => {
    if (typeof content === "string") {
        const parsed = parseStringParagraph(content);
        if (parsed) return renderRichText(parsed);
        return `<p style="${styles.p}">${escapeHtml(content)}</p>`;
    }

    if (content?.segments?.length) {
        return `<p style="${styles.p}">${renderSegments(content.segments)}</p>`;
    }

    if (content?.label) {
        return `<h5 style="${styles.h5}">${escapeHtml(content.label)}</h5><p style="${styles.p}">${escapeHtml(content.text || "")}</p>`;
    }

    return "";
};

const renderFaqAnswer = (content) => {
    if (typeof content === "string") return escapeHtml(content);
    if (content?.segments?.length) return renderSegments(content.segments);
    if (content?.label) return `<strong>${escapeHtml(content.label)}</strong> ${escapeHtml(content.text || "")}`;
    return "";
};

const wrapSection = (inner) =>
    `<section class="ckf-section" style="${styles.section}"><div class="ckf-container" style="${styles.container}"><div class="ckf-row" style="${styles.row}">${inner}</div></div></section>`;

const wrapCol = (inner, width = "100") =>
    `<div class="ckf-col" style="${width === "50" ? styles.col50 : styles.col100}">${inner}</div>`;

const buildLayoutHtml = (study, featureDataUrl) => {
    const introTitle = escapeHtml(study.intro?.title || study.title);
    const introParagraphs = (study.intro?.paragraphs || []).map(renderRichText).join("");
    const introText = `<h2 style="${styles.h2}">${introTitle}</h2>${introParagraphs}`;
    const introImage = featureDataUrl
        ? `<img src="${featureDataUrl}" alt="${introTitle}" style="${styles.img}" />`
        : "";

    const introHtml = wrapSection(
        `${wrapCol(introText, "50")}${wrapCol(introImage, "50")}`
    );

    const contentSections = getCaseStudyContentSections(study)
        .map((section) => {
            const paragraphs = (section.paragraphs || []).map(renderRichText).join("");
            const points = (section.points || []).map(renderRichText).join("");
            return wrapSection(
                wrapCol(
                    `<h3 style="${styles.h3}">${escapeHtml(section.title)}</h3>${paragraphs}${points}`
                )
            );
        })
        .join("");

    const faqs = getCaseStudyFaqs(study);
    const faqHtml = faqs.length
        ? wrapSection(
            wrapCol(
                `<h2 style="${styles.h2}">Frequently Asked Questions</h2><div class="ckf-accordion">${faqs
                    .map(
                        (faq, index) =>
                            `<div class="ckf-accordion-item${index === 0 ? " is-open" : ""}"><div class="ckf-accordion-title">${escapeHtml(faq.question)}</div><p class="ckf-accordion-body" style="${styles.p}">${renderFaqAnswer(faq.answer)}</p></div>`
                    )
                    .join("")}</div>`
            )
        )
        : "";

    const ctaHtml = wrapSection(
        wrapCol(
            `<a href="${SITE}/contact" style="${styles.button}">Start Your Project</a>`
        )
    );

    return `${introHtml}${contentSections}${faqHtml}${ctaHtml}`;
};

const seedCaseStudies = async () => {
    try {
        await connectDB();

        for (const study of caseStudies) {
            const meta = studyMeta[study.slug] || {};
            const featureImage = toDataUrl(study.image);
            const breadcrumbImage = toDataUrl(meta.breadcrumbImage);
            const seoTitle = meta.seoTitle || `${study.title} | CloudKodeForm`;
            const seoDescription = study.description;
            const seoKeywords =
                meta.seoKeywords || "case study, CloudKodeForm, software insights, technology blog";

            const payload = {
                title: study.title,
                subtitle: study.intro?.title || "",
                slug: study.slug,
                expertContent: study.description,
                description: JSON.stringify({
                    html: buildLayoutHtml(study, featureImage),
                    css: "",
                    theme: defaultLayoutTheme,
                }),
                featureImage,
                breadcrumbImage,
                seoTitle,
                seoDescription,
                seoKeywords,
                seoSchema: webPageSchema(
                    seoTitle.replace(" | CloudKodeForm", ""),
                    seoDescription,
                    `/case-studies/${study.slug}`
                ),
                isActive: true,
                isDeleted: false,
            };

            const exists = await CaseStudy.findOne({ slug: study.slug, isDeleted: false });

            if (exists) {
                exists.title = payload.title;
                exists.subtitle = payload.subtitle;
                exists.expertContent = payload.expertContent;
                exists.description = payload.description;
                exists.featureImage = payload.featureImage || exists.featureImage;
                exists.breadcrumbImage = payload.breadcrumbImage || exists.breadcrumbImage;
                exists.seoTitle = payload.seoTitle;
                exists.seoDescription = payload.seoDescription;
                exists.seoKeywords = payload.seoKeywords;
                exists.seoSchema = payload.seoSchema;
                exists.isActive = true;
                await exists.save();
                console.log(`Updated case study: ${study.slug}`);
            } else {
                await CaseStudy.create(payload);
                console.log(`Created case study: ${study.slug}`);
            }
        }

        console.log(`Done. ${caseStudies.length} case studies ready.`);
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedCaseStudies();
