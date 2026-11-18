import { Component } from '@angular/core';
import { checkBirthdayStatus } from '../utils/birthday';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrls: ['./hero.css']
})
export class Hero {
  isBirthdayPeriod = false;
  isBirthdayDay = false;

  constructor() {
    const birthdayInfo = checkBirthdayStatus();
    this.isBirthdayPeriod = birthdayInfo.isBirthdayPeriod;
    this.isBirthdayDay = birthdayInfo.isBirthdayDay;
  }
}
