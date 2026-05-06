import { Component, ElementRef, ViewChild, AfterViewInit, NgZone, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrls: ['./hero.css']
})
export class Hero implements AfterViewInit, OnDestroy {
  @ViewChild('heroCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private images: HTMLImageElement[] = [];
  private totalFrames = 240;
  private currentFrame = 0;
  private animationFrameId: number | null = null;
  private isBrowser: boolean;
  private lastDrawTime = 0;
  private fps = 30;
  private frameInterval = 1000 / this.fps;

  constructor(
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.preloadImages();
    }
  }

  preloadImages() {
    for (let i = 1; i <= this.totalFrames; i++) {
      const img = new Image();
      const frameNumber = i.toString().padStart(3, '0');
      img.src = `assets/hero/ezgif-frame-${frameNumber}.png`;
      this.images.push(img);
    }
    this.startAnimation();
  }

  startAnimation() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    this.ngZone.runOutsideAngular(() => {
      const draw = (timestamp: number) => {
        if (!this.lastDrawTime) this.lastDrawTime = timestamp;
        const elapsed = timestamp - this.lastDrawTime;

        if (elapsed > this.frameInterval) {
          const img = this.images[this.currentFrame];
          
          if (img.complete && img.naturalHeight !== 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Calculate object-cover dimensions with a 10% crop at the bottom to hide watermark
            const cropRatio = 0.90;
            const croppedHeight = img.height * cropRatio;
            
            const scale = Math.max(canvas.width / img.width, canvas.height / croppedHeight);
            const x = (canvas.width / 2) - (img.width / 2) * scale;
            const y = (canvas.height / 2) - (croppedHeight / 2) * scale;
            
            // Draw the cropped portion of the image
            ctx.drawImage(
              img, 
              0, 0, img.width, croppedHeight,
              x, y, img.width * scale, croppedHeight * scale
            );
          }
          
          this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
          this.lastDrawTime = timestamp - (elapsed % this.frameInterval);
        }
        
        this.animationFrameId = requestAnimationFrame(draw);
      };
      this.animationFrameId = requestAnimationFrame(draw);
    });
  }

  ngOnDestroy() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    // Clean up event listener
    window.removeEventListener('resize', () => {});
  }
}
