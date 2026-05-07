import { Component, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrls: ['./hero.css']
})
export class Hero implements AfterViewInit {
  @ViewChild('heroVideo') videoRef!: ElementRef<HTMLVideoElement>;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser && this.videoRef && this.videoRef.nativeElement) {
      this.videoRef.nativeElement.muted = true;
      this.videoRef.nativeElement.play().catch(err => {
        console.error('Video autoplay failed:', err);
      });
    }
  }
}
