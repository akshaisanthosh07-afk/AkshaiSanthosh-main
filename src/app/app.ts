import { Component, signal, HostListener } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('personal-portfolio');
  showScrollToTop = false;

  // Cursor properties
  cursorPos = { x: 0, y: 0 };
  followerPos = { x: 0, y: 0 };
  isHovered = false;
  isPointer = false;
  isVisible = false;

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

