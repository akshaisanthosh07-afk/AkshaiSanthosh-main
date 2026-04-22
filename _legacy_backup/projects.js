/**
 * project.js - Dynamic Project Configuration
 * 
 * TO ADD A NEW PROJECT:
 * Simply add a new object to the `projectsData` array below.
 * Provide the title, category, description, and link to your PDF case study.
 * The website will automatically generate the UI for it!
 */

const projectsData = [
    {
        id: 1,
        title: "GreenOps ESG Tracker",
        category: "UI/UX",
        description: "Enterprise-grade dashboard tracking carbon footprint metrics and environmental impact analysis.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
        caseStudyPdf: "assets/greenops-case-study.pdf"
    },
    {
        id: 2,
        title: "Music ME App",
        category: "Apps",
        description: "Immersive mobile audio experience with personalized algorithms and high fidelity sound architecture.",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80",
        caseStudyPdf: "assets/musicme-case-study.pdf"
    },
    {
        id: 3,
        title: "Enterprise Resource Dashboard",
        category: "Web",
        description: "Scalable UI systems designed for B2B resource management and analytics operations.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
        caseStudyPdf: "assets/enterprise-dash-case-study.pdf"
    },
    {
        id: 4,
        title: "NeoBank Branding",
        category: "Branding",
        description: "Complete visual identity and design system for a modern, digital-first fintech banking platform.",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
        caseStudyPdf: "assets/neobank-brand-guidelines.pdf"
    }
];

window.PROJECTS = projectsData;
