import webDevImage from '../assets/images/services/web2.webp';
import cloudImage from '../assets/images/services/cloud2.webp';
import csd2Image from '../assets/images/services/csd2.webp';
import appDevImage from '../assets/images/services/appdevelopmentservice2.webp';
import migrationImage from '../assets/images/services/migration2.webp';
import MicroservicesImage from '../assets/images/services/microservices2.webp';
import devopsImage from '../assets/images/services/devops2.webp';
import aiImage from '../assets/images/services/aiservice2.webp';
import internshipImage from '../assets/images/services/internship2.webp';
import consultingImage from '../assets/images/services/itsupport2.webp';
import uiUxImage from '../assets/images/services/conten12.webp';

export const serviceHighlights = {
  'web-development': {
    title: 'From Concept to Launch: Our Engineering Pipeline',
    description:
      'We don\'t believe in guesswork or unexpected delays. To deliver a secure, high-performance web application on schedule, we follow a transparent, multi-phased pipeline where you always know exactly where your project stands.',
    steps: [
      {
        title: 'Phase 1: Architecture & Technical Discovery',
        text: 'Before we write a single line of code, we align on your business logic. We sit down with your team to map out feature requirements, database needs, third-party integrations, and target user personas. This phase clarifies the scope and determines the absolute best technology stack for your platform.',
      },
      {
        title: 'Phase 2: User Interface (UI/UX) Prototyping',
        text: 'Our design team transforms your functional goals into interactive visual blueprints. We build clean, modern user interfaces focused heavily on user intuition and clear conversion paths. You get to review, click through, and approve the wireframes before any backend engineering begins.',
      },
      {
        title: 'Phase 3: Full-Stack Production & Clean Coding',
        text: 'Once the architecture and layouts are approved, our developers go to work. We build a fast, pixel-perfect frontend that matches the approved design, while simultaneously setting up a rock-solid, secure server backend and database framework. All code is written modularly so it is easy to update later.',
      },
      {
        title: 'Phase 4: Rigorous Quality Assurance & Speed Testing',
        text: 'We don\'t use our clients as beta testers. Before anything goes live, your platform undergoes comprehensive automated and manual testing. We audit mobile responsiveness, run cross-browser security checks, and run performance optimization scripts to ensure your site loads instantly.',
      },
      {
        title: 'Phase 5: Cloud Deployment & Continuous Monitoring',
        text: 'We securely deploy your finished application to your cloud infrastructure (AWS, Azure, or Google Cloud) and handle all domain mappings. Post-launch, we monitor system stability to ensure a seamless transition and zero operational downtime for your business.',
      },
    ],
    image: webDevImage,
    ctaText: 'Start With Us',
  },
  aiml: {
    title: 'Transform Your Data into Real Decisions with a Top AI Solutions Company in India',
    description:
      'Most businesses have plenty of data, but they struggle to actually use it to make everyday choices. At CloudKodeForm, we focus on changing that. As an AI solutions provider company in India, we help you use artificial intelligence to automate manual work, find useful patterns in your operations, and build better software for your users. We don\'t talk in vague concepts; we build practical setups that handle your workflow smoothly.',
    points: [
      'How We Build Things on Our AI Solutions Website: Our work focuses on three main things: machine learning, advanced analytics, and automation. If you need to understand customer behavior, clean up your internal workflows, or get a clear forecast on product demand, we build systems that turn messy data into straightforward answers.',
      'We know it\'s hard to pick the right team when looking through different artificial intelligence companies in India. We focus on proving our engineering experience through reliable, secure work. Our developers and data scientists write clean code using tools you already trust, like TensorFlow, PyTorch, and AWS AI services. We keep data privacy and security at the center of every project, which is exactly what you should look for when hiring a top 10 AI solutions company in India.',
    ],
    image: aiImage,
    ctaText: 'Start With Us',
  },
  cloudservice: {
    title: 'Scale Faster with Cloud-Powered Infrastructure',
    description:
      'Most businesses enter the cloud looking for agility, but they quickly end up trapped in overly complex architectures and skyrocketing data transfer fees. Whether you are looking for an expert team to audit your current multi-cloud setup or a localized cloud server providers in India hub to anchor your primary user databases, the way your environment is built determines your long-term ROI.',
    points: [
      'At CloudKodeForm, we cut through the corporate fluff. We design, deploy, and manage production-ready cloud infrastructure in cloud computing frameworks that focus on high runtime performance without the hidden billing traps.',
    ],
    steps: [
      {
        title: 'Eliminating Cloud Budget Bleed',
        text: 'We stand out from other standard cloud infrastructure companies because we actively fight resource waste. We find the cheapest cloud service provider in India to host your cold data storage while keeping your high-traffic application layers running on premium, lightning-fast networks.',
      },
      {
        title: 'Zero-Vendor Lock-in',
        text: 'We map your entire environment in clean, version-controlled Infrastructure as Code (IaC) scripts. This allows us to migrate, replicate, or back up your entire software stack across the top cloud companies in India (like AWS, Azure, or GCP) in a matter of minutes.',
      },
      {
        title: 'Localized Latency Optimization',
        text: 'By strategically deploying your assets with specialized cloud infrastructure companies in India, we drop your network ping times to near-zero for local users in tech hubs like Mumbai, Bangalore, and Delhi—ensuring crisp performance and total regional data compliance.',
      },
    ],
    image: cloudImage,
    ctaText: 'Start With Us',
  },
  'application-development': {
    title: 'Build Seamless Mobile Experiences, The Smart Way',
    description:
      'From MVPs to enterprise apps, we design and develop mobile solutions that are fast, intuitive, and scalable. At CloudKodeForm Technologies, we turn app ideas into business-ready products that engage users and deliver results.',
    points: [
      'A Team That Knows the Tech: Our engineers are experts in modern frameworks, allowing us to deliver top-tier mobile app development services that perform perfectly under heavy use.',
      'Built Around Your Specific Workflows: We know every business is different. We tailor our custom mobile app development services around your exact business model, rather than forcing you into a standard template.',
      'Testing Before Going Live: We don\'t launch buggy software. We run your code through continuous testing cycles so your users get a smooth, clean experience from day one.',
      'Deadlines You Can Depend On: We value your time. We plan our project milestones carefully so we can launch your software on schedule without cutting corners on quality.',
      'Support Long After the Launch: We don\'t just hand over the app and vanish. We stick around to manage server updates, fix security patches, and keep your software running perfectly as your user base grows.',
    ],
    image: appDevImage,
    ctaText: 'Start With Us',
  },
  'system-migration-integration': {
    title: 'Migrate Smarter. Modernize Your Infrastructure Without Disruption.',
    description:
      'Outdated systems shouldn\'t hold your business back. At CloudKodeform, we help you transition away from obsolete technology into high-performance infrastructure with minimal downtime. Whether you are moving applications to the cloud or completely rearchitecting your backend, we ensure a clean, secure transition that keeps your daily operations running smoothly.',
    points: [
      'A successful upgrade requires a deep understanding of how your data, code, and live processes interact. We build your entire migration strategy around your specific business goals, ensuring every asset moves safely without halting everyday work.',
      'Data Migration from Legacy Systems: Old platforms are notorious for unmapped schemas, corrupt rows, and broken database relationships. We audit your older databases, clean the incoming data streams, and validate every record so it fits perfectly into your new modern system with zero data loss.',
      'Code Migration in Distributed Systems: Moving monolithic applications into decentralized cloud setups requires refactoring your software logic. We help adapt your codebase to handle asynchronous message queues, microservices, and network partitions across AWS, Azure, or GCP.',
      'Process Migration with Zero Downtime: If your business runs high-availability workloads that can\'t be turned off, we use dynamic process migration strategies to shift active computational tasks from one node to another without dropping live user sessions or interrupting active transactions.',
      'End-to-End Tracking & Monitoring: We install dedicated migration tracking and monitoring systems from day one, giving you absolute visibility over the progress of your assets and real-time system health during the final cutover.',
    ],
    closing:
      'Security isn\'t an afterthought for us. We implement strict data protection standards and continuous system audits throughout the entire lifecycle. By combining detailed pre-migration planning with thorough post-migration tuning, we ensure your new environment is faster, highly secure, and optimized to keep your operational cloud costs as low as possible. Let\'s take the risk out of your technology transition. Contact CloudKodeform today to discuss your system migration goals.',
    image: migrationImage,
    ctaText: 'Start With Us',
  },
  devops: {
    title: 'Automate, Deploy, Deliver — Enterprise DevOps Services & Solutions',
    description:
      'Supercharge your engineering velocity with our premium devops services. We implement automated validation gates, Infrastructure as Code (IaC) templates, and secure cloud-native environments to accelerate software delivery, lower post-deployment incident rates, and improve release confidence.',
    points: [
      'In today\'s hyper-competitive digital landscape, fast-growing companies need to ship features rapidly without compromising architectural stability. This is where CloudKodeForm\'s specialized devops automation services make a definitive difference. We partner with startups and enterprises to seamlessly unify development workflows and operations, utilizing robust automated frameworks to eliminate delivery friction.',
      'Our team of SRE specialists delivers hands-on devops engineering services designed to build resilient, self-healing platforms. We eradicate manual configuration errors, minimize system downtime, and orchestrate modern CI/CD setups so that every application update is rapid, predictable, and aligned with your core operational goals.',
      'At CloudKodeForm Technologies, we believe modern devops professional services should do more than just manage pipelines—they must establish standard, automated "Golden Paths." By integrating industry-standard tools like Docker, Kubernetes, Jenkins, and Ansible, we simplify deployment tasks and remove system blockages. This lets your engineering group build, scale, and launch updates with absolute confidence.',
      'Choose a dedicated DevOps solutions partner focused on security, speed, and continuous, measurable performance gains.',
    ],
    image: devopsImage,
    ctaText: 'Start With Us',
  },
  'custom-software-development': {
    title: 'How We Work',
    description:
      'We follow a clear, phased delivery model so you always know what is being built, when it ships, and how your budget is being used.',
    steps: [
      {
        title: 'Step 1: The Blueprint',
        text: 'We talk through your business goals, map out user paths, and choose the database structure.',
      },
      {
        title: 'Step 2: Two-Week Sprints',
        text: 'We write code in short, manageable blocks. Every two weeks, we show you a working demo of the progress.',
      },
      {
        title: 'Step 3: Continuous Testing',
        text: 'Our QA engineers test the code on multiple devices and browsers to catch bugs before they reach production.',
      },
      {
        title: 'Step 4: Deployment & Launch',
        text: 'We set up secure cloud hosting environments and handle the live launch to the app stores or web servers.',
      },
    ],
    image: csd2Image,
    ctaText: 'Start With Us',
  },
  micro: {
    title: 'Break the Monolith. Build the Future.',
    description:
      'Switch to a flexible, scalable infrastructure with Microservices Architecture Services. At CloudKodeForm Technologies, we break legacy monolithic systems into small, self-contained components. This helps your business build faster, run smoother, and scale smarter without system-wide crashes.',
    points: [
      'Microservices give your team true agility. You can build, test, and launch individual features on the fly without impacting your entire application.',
      'Isolate Failures: If your payment gateway or search feature goes down, the rest of your app keeps running smoothly.',
      'Mix and Match Tech Stacks: Your team can use the exact language or database that makes sense for each individual service.',
      'Deploy Daily: Automated CI/CD pipelines mean you can ship new features to your users every single day instead of waiting for massive monthly releases.',
      'Clear Visibility: We build in distributed tracing and monitoring from day one, so you always know exactly how your services are performing.',
    ],
    image: MicroservicesImage,
    ctaText: 'Start With Us',
  },
  'internship-programs': {
    title: 'Learn by Building — Not Just Watching',
    description:
      'Stop wasting time on tutorials that don\'t get you hired. At CloudKodeForm Technologies, interns join real engineering teams, ship actual code, and graduate with portfolios that hiring managers notice.',
    points: [
      'A Real Certificate: Verified proof of completion with the exact technical skills you mastered.',
      'A Killer GitHub Portfolio: Clean, professional repositories you can proudly show in interviews.',
      '1-on-1 Mentorship: Regular feedback from senior developers who know what it takes to win in tech.',
      'Job Readiness: Resume help, LinkedIn tips, and practice interviews so you feel completely confident.',
      'Path to Full-Time: Many of our paid internship programs lead straight to permanent job offers.',
    ],
    image: internshipImage,
    ctaText: 'Apply Now',
  },
  'it-consulting-support': {
    title: 'Migrate Smarter. Modernize Without Disruption.',
    description:
      'Let\'s be honest about migrations: they are usually a mess. Most companies dread them because they\'ve been burned before by engineers who promised a "seamless transition," only to leave them dealing with broken databases, missing files, and unplanned downtime that lasts for days. At CloudKodeForm Technologies, we look at migrations as a serious engineering challenge, not a copy-and-paste job.',
    points: [
      'If you just take an old, unoptimized server setup and move it directly onto AWS or Azure without changing how it works, you aren\'t fixing anything. You\'re just paying a premium to host your old problems on someone else\'s hardware.',
      'We don\'t guess. Before we touch a single live server, we audit your entire setup to find hidden dependencies. We find out exactly what will break if a specific database moves, and we fix it beforehand.',
      'No missing records. We use parallel sync pipelines. This means your old system and your new system run at the same time, checking each other\'s data constantly. When we finally flip the switch, the new system has every single piece of data up to the exact millisecond.',
      'We cut over when your users are asleep. We don\'t do major updates in the middle of a workday. We schedule the final move during your lowest-traffic hours, meaning your team and your customers won\'t even notice the change happened.',
      'We lock down the security first. We don\'t build a cloud setup and then figure out firewalls and user permissions later. Security controls, encryption, and access logs are written into the very first layer of the new infrastructure.',
    ],
    closing:
      'We don\'t just hand you the keys to a new cloud account and leave. We stay attached to your team post-migration to fine-tune your resource settings so you aren\'t overpaying for server power you don\'t use. The goal isn\'t just to move your data—it\'s to give your developers a modern, fast environment where they can deploy updates in minutes instead of days, without worrying about the system crashing. If you have a migration coming up and want to avoid the typical headaches, let\'s talk. We\'ll jump on a call with one of our lead architects, look at your current setup, and give you a straightforward, realistic plan to get it done right.',
    image: consultingImage,
    ctaText: 'Start With Us',
  },
  'ui-ux-design': {
    title: 'Good Design is Just Good Business',
    description:
      'A flashy application doesn\'t mean anything if your users can\'t figure out how to order a product or find a simple setting. When software feels like a chore, people drop it and find a competitor who makes things simpler. We focus entirely on the practical side of design: how to arrange your layout to cut down on user mistakes, eliminate confusion, and make daily tasks fast and easy.',
    points: [
      'Operating as a hands-on ui ux design agency, CloudKodeform blends real human habits with clean layout aesthetics. Because we manage our primary design studios in major technology centers, we rank comfortably among the top UI/UX companies in India.',
      'This business structure allows us to deliver high-tier corporate design strategy without the massive agency markups you typically see in western markets.',
    ],
    steps: [
      {
        title: '1. Research & Discovery',
        text: 'We talk to your users, review your competition, and find the shortest path for a user to complete a goal.',
      },
      {
        title: '2. Wireframes',
        text: 'We create simple, black-and-white layout maps to fix the structural flow before worrying about the look.',
      },
      {
        title: '3. Visual Design',
        text: 'We apply your exact brand colors, modern fonts, clean iconography, and high-quality graphics to make the app look sharp.',
      },
      {
        title: '4. Clickable Prototype',
        text: 'We link your screens together so you can click through a live preview and test the feel before spending money on code.',
      },
      {
        title: '5. Developer Handoff',
        text: 'We clean up the Figma source files, organize the layers, and export your visual assets cleanly so your developers can build it fast.',
      },
    ],
    image: uiUxImage,
    ctaText: 'Start With Us',
  },
};

export function getServiceHighlight(slug) {
  return serviceHighlights[slug] ?? null;
}
