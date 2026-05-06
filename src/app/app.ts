import { Component, signal, HostListener, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import Lenis from 'lenis';
import AOS from 'aos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('personal-portfolio');
  showScrollToTop = false;

  // Cursor properties
  cursorPos = { x: 0, y: 0 };
  followerPos = { x: 0, y: 0 };
  isHovered = false;
  isPointer = false;
  isVisible = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (window.location.hash) {
        window.history.replaceState('', document.title, window.location.pathname + window.location.search);
      }
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);

      // Initialize Lenis for smooth scrolling
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      // Initialize AOS for reveal animations
      AOS.init({
        duration: 1000,
        easing: 'ease-out-quart',
        once: true,
        offset: 50,
        delay: 50,
        anchorPlacement: 'top-bottom',
      });
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollToTop = window.scrollY > 300;
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.cursorPos = { x: event.clientX, y: event.clientY };
    this.isVisible = true;
    
    // Check if hovering over a pointer element
    const target = event.target as HTMLElement;
    if (!target) return;

    this.isPointer = window.getComputedStyle(target).cursor === 'pointer' || 
                     target.tagName === 'A' || 
                     target.tagName === 'BUTTON' ||
                     target.closest('a') !== null ||
                     target.closest('button') !== null;
  }

  @HostListener('window:mouseleave')
  onMouseLeave() {
    this.isVisible = false;
  }

  @HostListener('window:mouseenter')
  onMouseEnter() {
    this.isVisible = true;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}

