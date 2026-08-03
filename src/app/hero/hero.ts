import { Component, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { checkBirthdayStatus } from '../utils/birthday';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrls: ['./hero.css']
})
export class Hero implements AfterViewInit {
  @ViewChild('heroVideo') videoRef!: ElementRef<HTMLVideoElement>;
  private isBrowser: boolean;

  isBirthdayPeriod = false;
  isBirthdayDay = false;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);

    const birthdayInfo = checkBirthdayStatus();
    this.isBirthdayPeriod = birthdayInfo.isBirthdayPeriod;
    this.isBirthdayDay = birthdayInfo.isBirthdayDay;
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

