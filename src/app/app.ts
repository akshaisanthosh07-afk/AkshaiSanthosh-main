import { Component, signal, HostListener, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import Lenis from 'lenis';
import AOS from 'aos';
import { checkBirthdayStatus } from './utils/birthday';

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

  // Birthday properties
  isBirthdayPeriod = false;
  isBirthdayDay = false;
  confettiActive = false;

  // Cursor properties
  cursorPos = { x: 0, y: 0 };
  followerPos = { x: 0, y: 0 };
  isHovered = false;
  isPointer = false;
  isVisible = false;

  private canvasCtx!: CanvasRenderingContext2D;
  private particles: any[] = [];
  private animationId?: number;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const birthdayInfo = checkBirthdayStatus();
      this.isBirthdayPeriod = birthdayInfo.isBirthdayPeriod;
      this.isBirthdayDay = birthdayInfo.isBirthdayDay;

      if (this.isBirthdayPeriod) {
        setTimeout(() => {
          this.triggerConfettiRain();
        }, 1200);
      }

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

    if (this.isBirthdayPeriod && Math.random() < 0.15) {
      this.createSparkle(event.clientX, event.clientY);
    }
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

  @HostListener('window:resize', [])
  onResize() {
    if (this.confettiActive && isPlatformBrowser(this.platformId)) {
      const canvas = document.getElementById('birthday-confetti') as HTMLCanvasElement;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    }
  }

  createSparkle(x: number, y: number) {
    if (!isPlatformBrowser(this.platformId)) return;
    const sparkle = document.createElement('div');
    sparkle.className = 'cursor-sparkle';
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    
    const sparklesList = ['✨', '⭐', '🎈', '🎉', '🎂'];
    sparkle.innerText = sparklesList[Math.floor(Math.random() * sparklesList.length)];
    
    const scale = 0.5 + Math.random() * 0.8;
    const dx = (Math.random() - 0.5) * 40;
    const dy = (Math.random() - 0.5) * 40 - 20;
    
    sparkle.style.setProperty('--scale', scale.toString());
    sparkle.style.setProperty('--dx', `${dx}px`);
    sparkle.style.setProperty('--dy', `${dy}px`);
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
      sparkle.remove();
    }, 1000);
  }

  triggerConfettiRain() {
    if (!isPlatformBrowser(this.platformId)) return;
    const canvas = document.getElementById('birthday-confetti') as HTMLCanvasElement;
    if (!canvas) return;

    this.confettiActive = true;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.canvasCtx = canvas.getContext('2d')!;

    const colors = ['#facc15', '#ca8a04', '#ff4b82', '#3b82f6', '#10b981', '#a855f7'];
    for (let i = 0; i < 80; i++) {
      this.particles.push({
        x: Math.random() * window.innerWidth,
        y: -20 - Math.random() * 100,
        size: 5 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 3,
        speedY: 2 + Math.random() * 5,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 5,
        opacity: 1
      });
    }

    if (!this.animationId) {
      this.animateConfetti(canvas);
    }
  }

  triggerConfettiBurst() {
    if (!isPlatformBrowser(this.platformId)) return;
    const canvas = document.getElementById('birthday-confetti') as HTMLCanvasElement;
    if (!canvas) return;

    this.confettiActive = true;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.canvasCtx = canvas.getContext('2d')!;

    const colors = ['#facc15', '#ca8a04', '#ff4b82', '#3b82f6', '#10b981', '#a855f7'];
    const startX = window.innerWidth - 80;
    const startY = window.innerHeight - 80;

    for (let i = 0; i < 100; i++) {
      this.particles.push({
        x: startX,
        y: startY,
        size: 5 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: -2 - Math.random() * 12,
        speedY: -8 - Math.random() * 16,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        opacity: 1
      });
    }

    if (!this.animationId) {
      this.animateConfetti(canvas);
    }
  }

  private animateConfetti(canvas: HTMLCanvasElement) {
    if (!this.canvasCtx) return;
    
    this.canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    let activeParticles = 0;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      if (p.opacity <= 0) continue;

      activeParticles++;
      p.x += p.speedX;
      p.y += p.speedY;
      p.speedY += 0.2;
      p.speedX *= 0.98;
      p.rotation += p.rotationSpeed;
      
      if (p.y > canvas.height) {
        p.opacity -= 0.05;
      }
      
      this.canvasCtx.save();
      this.canvasCtx.translate(p.x, p.y);
      this.canvasCtx.rotate((p.rotation * Math.PI) / 180);
      this.canvasCtx.fillStyle = p.color;
      this.canvasCtx.globalAlpha = p.opacity;
      
      this.canvasCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
      this.canvasCtx.restore();
    }

    if (activeParticles > 0) {
      this.animationId = requestAnimationFrame(() => this.animateConfetti(canvas));
    } else {
      this.confettiActive = false;
      this.animationId = undefined;
      this.particles = [];
      this.canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
}

