import { Component } from '@angular/core';

@Component({
  selector: 'app-works',
  imports: [],
  templateUrl: './works.html',
  styleUrl: './works.css',
})
export class Works {
  projects = [
    {
        id: 2,
        title: "Music ME App",
        category: "Apps",
        description: "Immersive mobile audio experience with personalized algorithms and high fidelity sound architecture.",
        image: "assets/M2M.png",
        caseStudyPdf: "assets/MusicMe.pdf"
    },
    {
        id: 1,
        title: "Olivia Salon",
        category: "UI/UX",
        description: "Enterprise-grade dashboard tracking carbon footprint metrics and environmental impact analysis.",
        image: "assets/Branding.png",
        caseStudyPdf: "assets/olivia.pdf"
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
        category: "UI/UX", // changed from Branding to fit filters
        description: "Complete visual identity and design system for a modern, digital-first fintech banking platform.",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
        caseStudyPdf: "assets/neobank-brand-guidelines.pdf"
    }
  ];

  activeFilter = 'all';

  get filteredProjects() {
    if (this.activeFilter === 'all') return this.projects;
    return this.projects.filter(p => p.category.toLowerCase().includes(this.activeFilter.toLowerCase()));
  }

  setFilter(filter: string) {
    this.activeFilter = filter;
  }
}
