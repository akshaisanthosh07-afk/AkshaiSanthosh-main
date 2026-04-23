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
    <app-hero></app-hero>
    <app-about></app-about>
    <app-services></app-services>
    <app-works></app-works>
    <app-resume></app-resume>
    <app-skills></app-skills>
    <app-contact></app-contact>
  `
})
export class Home {}
