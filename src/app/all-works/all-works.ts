import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-works',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './all-works.html',
  styleUrl: './all-works.css'
})
export class AllWorks {
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
        title: "Tracker.io",
        category: "Web | UI/UX",
        description: "An employee tracking management system",
        image: "assets/tracker.png",
        caseStudyPdf: "assets/enterprise-dash-case-study.pdf",
        comingSoon: true
    },
    {
        id: 4,
        title: "CashNest",
        category: "Apps | UI/UX",
        description: "A secure and simplified petty cash tracking and management mobile application.",
        image: "assets/cashnest.png",
        caseStudyPdf: "assets/neobank-brand-guidelines.pdf",
        comingSoon: true
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
