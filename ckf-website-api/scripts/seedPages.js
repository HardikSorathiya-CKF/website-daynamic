import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

import connectDB from "../config/db.js";
import Page from "../models/Page.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGE_DIR = path.resolve(
    __dirname,
    "../../ckf-website-front/src/assets/images/common"
);
const SITE = "https://cloudkodeform.com";

const toDataUrl = (fileName) => {
    if (!fileName) return "";
    const filePath = path.join(IMAGE_DIR, fileName);
    if (!fs.existsSync(filePath)) return "";
    const ext = path.extname(fileName).slice(1) || "webp";
    return `data:image/${ext};base64,${fs.readFileSync(filePath).toString("base64")}`;
};

const webPageSchema = (name, description, urlPath) => ({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: `${SITE}${urlPath}`,
});

const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CloudKodeForm",
    alternateName: "CLOUDKODEFORM TECHNOLOGIES PRIVATE LIMITED",
    url: `${SITE}/`,
    logo: `${SITE}/logo.webp`,
    contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-96507-92424",
        contactType: "customer service",
        email: "info@cloudkodeform.com",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
    },
    address: {
        "@type": "PostalAddress",
        streetAddress: "Vill-Darawadha Madhopur, Madhu Ban",
        addressLocality: "Mau",
        addressRegion: "Uttar Pradesh",
        postalCode: "221603",
        addressCountry: "IN",
    },
    sameAs: [`${SITE}/`],
    description:
        "CloudKodeForm is a technology partner focused on helping businesses transform with AI, custom software, and cloud engineering.",
};

const pages = [
    {
        title: "Home",
        slug: "home",
        heading: "",
        image: "",
        seoTitle: "CloudKodeForm - Expert Cloud & App Development Services",
        seoDescription:
            "CloudKodeForm offers custom cloud solutions, mobile app development, and digital transformation services to help your business scale and innovate.",
        seoKeywords:
            "cloud solutions, AI development, full-stack development, digital transformation, app development company, cloud consulting",
        seoSchema: organizationSchema,
        path: "/",
    },
    {
        title: "About Us",
        slug: "about-us",
        heading: "Building Smart Digital Solutions for Growing Businesses",
        image: "breadcrumb-about.webp",
        seoTitle: "About CloudKodeForm - Your Trusted Tech Partner",
        seoDescription:
            "Learn more about CloudKodeForm Technologies, our mission, our team, and our experience in delivering successful digital solutions globally.",
        seoKeywords:
            "about CloudKodeForm, software company profile, tech team, IT services company",
        seoSchema: organizationSchema,
        path: "/about",
    },
    {
        title: "Contact Us",
        slug: "contact",
        heading: "Get in Touch with CloudKodeForm",
        image: "contact.webp",
        seoTitle: "Contact CloudKodeForm - Get in Touch with Us",
        seoDescription:
            "Reach out to CloudKodeForm for cloud services, app development, or to discuss your next digital project. We're here to help.",
        seoKeywords:
            "contact CloudKodeForm, tech support, IT services contact, app development inquiries",
        seoSchema: webPageSchema(
            "Contact CloudKodeForm",
            "Reach out to CloudKodeForm for cloud services, app development, or to discuss your next digital project.",
            "/contact"
        ),
        path: "/contact",
    },
    {
        title: "Case Studies",
        slug: "case-studies",
        heading: "Real Projects, Real Results",
        image: "breadcrumb-about.webp",
        seoTitle: "Case Studies - Our Work at CloudKodeForm",
        seoDescription:
            "Discover real-world success stories from clients who partnered with CloudKodeForm to transform their digital vision into reality.",
        seoKeywords: "IT case studies, client success, software implementation stories",
        seoSchema: webPageSchema(
            "Case Studies",
            "Real-world success stories from CloudKodeForm clients.",
            "/case-studies"
        ),
    },
    {
        title: "Building Smarter Mobile Apps",
        slug: "building-smarter-mobile-apps",
        heading: "How to Integrate AI Features into Your Current Application",
        image: "mobileapp.webp",
        seoTitle:
            "Building Smarter Mobile Apps | CloudKodeForm",
        seoDescription:
            "Learn how to retrofit AI into an existing mobile app without rebuilding from scratch — target friction points, pick the right infrastructure, and protect your codebase.",
        seoKeywords: "case study, CloudKodeForm, software insights, technology blog",
        seoSchema: webPageSchema(
            "Building Smarter Mobile Apps",
            "Learn how to retrofit AI into an existing mobile app without rebuilding from scratch.",
            "/case-studies/building-smarter-mobile-apps"
        ),
    },
    {
        title: "Shifting to the Edge",
        slug: "shifting-to-the-edge",
        heading:
            "Why Modern Full-Stack Applications Are Moving Away from Centralized Cloud Hosting",
        image: "cloudservices.webp",
        seoTitle: "Shifting to the Edge | CloudKodeForm",
        seoDescription:
            "Discover why enterprise teams are leaving centralized cloud hosting for edge architecture — faster delivery, lower latency, and resilient global scaling.",
        seoKeywords: "case study, CloudKodeForm, software insights, technology blog",
        seoSchema: webPageSchema(
            "Shifting to the Edge",
            "Why enterprise teams are moving from centralized cloud hosting to edge architecture.",
            "/case-studies/shifting-to-the-edge"
        ),
    },
    {
        title: "DevSecOps by Default",
        slug: "devsecops-policy-as-code",
        heading: "Integrating Automated Policy-as-Code Into Your Deployment Pipelines",
        image: "devops.webp",
        seoTitle: "DevSecOps by Default | CloudKodeForm",
        seoDescription:
            "Replace slow manual security audits with automated Policy-as-Code guardrails that catch violations in your pipeline before they reach production.",
        seoKeywords: "case study, CloudKodeForm, software insights, technology blog",
        seoSchema: webPageSchema(
            "DevSecOps by Default",
            "Automated Policy-as-Code guardrails for deployment pipelines.",
            "/case-studies/devsecops-policy-as-code"
        ),
    },
    {
        title: "Beyond Right-Sizing",
        slug: "modern-finops-cloud-cost",
        heading: "Implementing Modern FinOps to Halt Hidden Cloud Cost Runaways",
        image: "cloudservices.webp",
        seoTitle: "Beyond Right-Sizing | CloudKodeForm",
        seoDescription:
            "Move beyond basic right-sizing with a proactive FinOps framework that stops hidden cloud leaks, enforces real-time governance, and keeps engineering teams in control.",
        seoKeywords: "case study, CloudKodeForm, software insights, technology blog",
        seoSchema: webPageSchema(
            "Beyond Right-Sizing",
            "A proactive FinOps framework to stop hidden cloud cost runaways.",
            "/case-studies/modern-finops-cloud-cost"
        ),
    },
    {
        title: "Beyond the Prompt",
        slug: "multi-agent-ai-enterprise-apps",
        heading: "Building Multi-Agent AI Systems Into Custom Enterprise Applications",
        image: "ai.webp",
        seoTitle: "Beyond the Prompt | CloudKodeForm",
        seoDescription:
            "Move past passive chatbots and deploy multi-agent AI networks that coordinate workflows, connect to your stack, and execute real business operations autonomously.",
        seoKeywords: "case study, CloudKodeForm, software insights, technology blog",
        seoSchema: webPageSchema(
            "Beyond the Prompt",
            "Multi-agent AI systems for custom enterprise applications.",
            "/case-studies/multi-agent-ai-enterprise-apps"
        ),
    },
    {
        title: "Event-Driven First",
        slug: "event-driven-microservices",
        heading:
            "Why Modern Microservices Are Transitioning Away From Synchronous REST",
        image: "microservice.webp",
        seoTitle: "Event-Driven First | CloudKodeForm",
        seoDescription:
            "Learn why enterprise teams are replacing synchronous REST chains with event-driven architecture for resilient, decoupled microservices at scale.",
        seoKeywords: "case study, CloudKodeForm, software insights, technology blog",
        seoSchema: webPageSchema(
            "Event-Driven First",
            "Why microservices are moving from synchronous REST to event-driven architecture.",
            "/case-studies/event-driven-microservices"
        ),
    },
];

const seedPages = async () => {
    try {
        await connectDB();

        for (const item of pages) {
            const payload = {
                title: item.title,
                slug: item.slug,
                heading: item.heading || "",
                breadcrumbImage: toDataUrl(item.image),
                seoTitle: item.seoTitle,
                seoDescription: item.seoDescription,
                seoKeywords: item.seoKeywords,
                seoSchema: item.seoSchema,
                isActive: true,
                isDeleted: false,
            };

            const exists = await Page.findOne({ slug: item.slug, isDeleted: false });

            if (exists) {
                exists.title = payload.title;
                exists.heading = payload.heading;
                exists.seoTitle = payload.seoTitle;
                exists.seoDescription = payload.seoDescription;
                exists.seoKeywords = payload.seoKeywords;
                exists.seoSchema = payload.seoSchema;
                exists.isActive = true;
                if (payload.breadcrumbImage && !exists.breadcrumbImage) {
                    exists.breadcrumbImage = payload.breadcrumbImage;
                } else if (payload.breadcrumbImage && item.slug !== "about-us") {
                    exists.breadcrumbImage = payload.breadcrumbImage;
                }
                await exists.save();
                console.log(`Updated page: ${item.slug}`);
            } else {
                await Page.create(payload);
                console.log(`Created page: ${item.slug}`);
            }
        }

        console.log(`Done. ${pages.length} pages ready.`);
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedPages();
