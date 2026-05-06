import { Component } from '@angular/core';
import { Hero } from '../hero/hero';
import { About } from '../about/about';
import { Services } from '../services/services';
import { Works } from '../works/works';
import { Resume } from '../resume/resume';
import { Skills } from '../skills/skills';
import { Contact } from '../contact/contact';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero, About, Services, Works, Resume, Skills, Contact],
  template: `
    <div data-aos="fade-up"><app-hero></app-hero></div>
    <div data-aos="fade-up" data-aos-delay="100"><app-about></app-about></div>
    <div data-aos="fade-up" data-aos-delay="100"><app-services></app-services></div>
    <div data-aos="fade-up" data-aos-delay="100"><app-works></app-works></div>
    <div data-aos="fade-up" data-aos-delay="100"><app-resume></app-resume></div>
    <div data-aos="fade-up" data-aos-delay="100"><app-skills></app-skills></div>
    <div data-aos="fade-up" data-aos-delay="100"><app-contact></app-contact></div>
  `
})
export class Home {}
