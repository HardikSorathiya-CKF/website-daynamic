import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

import connectDB from "../config/db.js";
import Page from "../models/Page.js";
import Service from "../models/Service.js";

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

const services = [
    {
        title: "Our Services",
        slug: "services",
        heading: "Solutions That Drive Your Business Forward",
        image: "service.webp",
        seoTitle: "Our Services - Cloud, Mobile App, Web Development",
        seoDescription:
            "Explore our wide range of services including cloud development, mobile apps, websites, ERP integration, and AI-powered solutions.",
        seoKeywords: "IT services, mobile app services, cloud platform, ERP solutions, AI services",
        seoSchema: webPageSchema(
            "Our Services",
            "Explore CloudKodeForm services including cloud, mobile apps, websites, and AI solutions.",
            "/services"
        ),
    },
    {
        title: "Web Development",
        slug: "web-development",
        heading: "Build High-Performance Websites & Web Apps",
        image: "webdevelopment.webp",
        seoTitle: "Web Development Services | Custom Websites by CloudKodeForm",
        seoDescription:
            "Get custom web development services for fast, secure, and responsive websites. CloudKodeForm builds business websites, web apps, and eCommerce solutions.",
        seoKeywords:
            "web development services, website development company, custom web , Best website development company in India, development, web application development, website development services",
        seoSchema: webPageSchema(
            "Web Development Services",
            "Custom web development for fast, secure, and responsive websites.",
            "/services/web-development"
        ),
    },
    {
        title: "Artificial Intelligence",
        slug: "aiml",
        heading: "Top AI Solutions Company in India",
        image: "ai.webp",
        seoTitle: "AI Solutions Company in India for Smarter Business Growth",
        seoDescription:
            "Transform your business with tailored AI solutions from our India-based experts. We build intelligent, scalable solutions that improve efficiency and support growth.",
        seoKeywords:
            "AI solutions company,AI solutions services,AI solutions Website,AI solutions company in India,Best ai solutions company in india,Top ai solutions company in india,Top 10 ai solutions company in india,Best ai solutions provider company in india",
        seoSchema: webPageSchema(
            "AI Solutions Company in India",
            "Tailored AI solutions that improve efficiency and support business growth.",
            "/technology/aiml"
        ),
    },
    {
        title: "Cloud Services",
        slug: "cloudservice",
        heading: "Cloud Infrastructure in Cloud Computing: Engineering for Scale",
        image: "cloudservices.webp",
        seoTitle: "Cloud Migration And Managed Cloud Services | CloudKodeForm",
        seoDescription:
            "Looking for reliable cloud services? CloudKodeForm helps you move your existing setup, manage, and grow in the cloud with solutions built around your business needs",
        seoKeywords:
            "Cloud infrastructure companies,Cloud infrastructure in cloud computing,Cloud infrastructure services,Cloud server providers in India, Cheapest cloud service provider in India,Top cloud companies in India",
        seoSchema: webPageSchema(
            "Cloud Migration And Managed Cloud Services",
            "Move, manage, and grow in the cloud with CloudKodeForm.",
            "/services/cloudservice"
        ),
    },
    {
        title: "Application Development",
        slug: "application-development",
        heading: "Custom Application Development Services",
        image: "mobileapp.webp",
        seoTitle: "Application Development Company in India for Every Business",
        seoDescription:
            "Build powerful mobile and web applications with our expert development team. We create Android, iOS, hybrid, eCommerce, and custom business apps that scale.",
        seoKeywords:
            "Application development company in India,Top application development agency,E-commerce application development,Mobile app development services,Full stack application development,iOS and Android app development,Hybrid app development company",
        seoSchema: webPageSchema(
            "Application Development Company in India",
            "Android, iOS, hybrid, eCommerce, and custom business apps that scale.",
            "/services/application-development"
        ),
    },
    {
        title: "Custom Software Development",
        slug: "custom-software-development",
        heading: "Custom Software Development Services",
        image: "customsoftware.webp",
        seoTitle: "Custom Software Development Company in India | CloudKodeForm",
        seoDescription:
            "Looking for a custom software development company in India? We build bespoke software, offer development consulting, and create solutions that fit your business.",
        seoKeywords:
            "Custom software development company,Custom software development company in India,Custom software development services,software development consulting services,bespoke software development,bespoke software development company",
        seoSchema: webPageSchema(
            "Custom Software Development Company in India",
            "Bespoke software and development consulting that fits your business.",
            "/services/custom-software-development"
        ),
    },
    {
        title: "Microservices Architecture",
        slug: "micro",
        heading: "Simplify. Scale. Innovate — with Microservices Architecture",
        image: "microservice.webp",
        seoTitle: "Microservices Development Company for Growing Businesses",
        seoDescription:
            "Modernize your applications with custom microservices built for speed, reliability, and growth. We help businesses design, develop, and migrate with confidence.",
        seoKeywords:
            "Microservices Architecture Services,Microservices Consulting Services ,Microservices Development Company ,Enterprise Microservices Solutions,Microservices Migration Services ,Custom Microservices Development,Custom microservices development java",
        seoSchema: webPageSchema(
            "Microservices Development Company",
            "Custom microservices built for speed, reliability, and growth.",
            "/services/micro"
        ),
    },
    {
        title: "DevOps Solutions",
        slug: "devops",
        heading: "High-Stakes DevOps: Engineering Infrastructure That Doesn't Break",
        image: "devops.webp",
        seoTitle: "Best DevOps Services Company in India | CloudKodeForm Experts",
        seoDescription:
            "CloudKodeForm is a DevOps services company helping businesses simplify automation, speed up software delivery, and build reliable cloud environments.",
        seoKeywords:
            "devops services providers,devops services,devops automation services,devops services india,DevOps services company,Top devops services in india,Best devops services in india,devops engineering services",
        seoSchema: webPageSchema(
            "DevOps Services Company in India",
            "Automation, faster delivery, and reliable cloud environments.",
            "/services/devops"
        ),
    },
    {
        title: "System Migration & Integration",
        slug: "system-migration-integration",
        heading: "Seamless System Migration & Modern Integration",
        image: "migration.webp",
        seoTitle: "Database and Cloud Migration Services for Business Growth",
        seoDescription:
            "Move your database, cloud, server, website, ERP, CRM, and applications with expert migration services. Secure, reliable, and built to minimize downtime.",
        seoKeywords:
            "Database Migration,Cloud Migration,Server Migration,Website Migration,Application Migration,ERP Migration,CRM Migration, Data Center Migration,Software Platform Migration, process migration in distributed system",
        seoSchema: webPageSchema(
            "Database and Cloud Migration Services",
            "Secure, reliable migration with minimal downtime.",
            "/services/system-migration-integration"
        ),
    },
    {
        title: "UI/UX Design",
        slug: "ui-ux-design",
        heading: "UI/UX Design Agency for Modern Software & Apps",
        image: "uiux.webp",
        seoTitle: "UI UX Design Company in India for Better Digital Experiences",
        seoDescription:
            "Create better digital experiences with our UI UX design services. We design user-friendly websites and apps that improve engagement, boost conversions, and grow your business.",
        seoKeywords:
            "ui ux design agency,ui ux design services company,Top UI/UX companies in India,user interface design services,professional web design services,hire ui ux designers,Conversion rate optimization service,ui ux design company in india",
        seoSchema: webPageSchema(
            "UI UX Design Company in India",
            "User-friendly websites and apps that improve engagement and conversions.",
            "/services/ui-ux-design"
        ),
    },
    {
        title: "IT Consulting & Support",
        slug: "it-consulting-support",
        heading: "Enterprise IT Consulting, System Migration & Integration Services",
        image: "itsupport.webp",
        seoTitle: "IT Consulting & Support Services for Growing Businesses India",
        seoDescription:
            "Get reliable IT consulting and support services for your business. We help improve IT systems, security, performance, and growth with expert guidance.",
        seoKeywords:
            "it consulting support,it services and consulting companies in India,technical consulting services,it support and consulting, it consulting services company",
        seoSchema: webPageSchema(
            "IT Consulting & Support Services",
            "Expert guidance to improve IT systems, security, and performance.",
            "/services/it-consulting-support"
        ),
    },
    {
        title: "Internship Programs",
        slug: "internship-programs",
        heading: "Tech Internships That Build Real Software Skills",
        image: "internship.webp",
        seoTitle: "Internship Programs for Students, Freshers & Graduates India",
        seoDescription:
            "Join practical internship programs for students and freshers in India. Learn real-world skills, work on live projects, and build your career with expert guidance.",
        seoKeywords:
            "Internship for students,Paid internship programs,Online internship for students,Internship for college students,Internship programs in india,Internship programs for students,Internship for freshers",
        seoSchema: webPageSchema(
            "Internship Programs for Students",
            "Practical internships with live projects and expert guidance.",
            "/services/internship-programs"
        ),
    },
];

const seedServices = async () => {
    try {
        await connectDB();

        for (const item of services) {
            const page = await Page.findOne({ slug: item.slug });
            const breadcrumbImage = page?.breadcrumbImage || toDataUrl(item.image);

            const payload = {
                title: page?.title || item.title,
                slug: item.slug,
                heading: page?.heading || item.heading || "",
                breadcrumbImage,
                seoTitle: page?.seoTitle || item.seoTitle,
                seoDescription: page?.seoDescription || item.seoDescription,
                seoKeywords: page?.seoKeywords || item.seoKeywords,
                seoSchema: page?.seoSchema || item.seoSchema,
                isActive: page ? page.isActive !== false : true,
                isDeleted: false,
            };

            const exists = await Service.findOne({ slug: item.slug });

            if (exists) {
                exists.title = payload.title;
                exists.heading = payload.heading;
                exists.breadcrumbImage = payload.breadcrumbImage || exists.breadcrumbImage;
                exists.seoTitle = payload.seoTitle;
                exists.seoDescription = payload.seoDescription;
                exists.seoKeywords = payload.seoKeywords;
                exists.seoSchema = payload.seoSchema;
                exists.isActive = payload.isActive;
                await exists.save();
                console.log(`Updated service: ${item.slug}`);
            } else {
                await Service.create(payload);
                console.log(`Created service: ${item.slug}`);
            }

            if (page) {
                await Page.deleteOne({ _id: page._id });
                console.log(`Removed page: ${item.slug}`);
            }
        }

        console.log(`Done. ${services.length} services ready.`);
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedServices();
