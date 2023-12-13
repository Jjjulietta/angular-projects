import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class TimerService {
  timer = new BehaviorSubject<number>(0);
  timerPeople = new BehaviorSubject<number>(0);
  timerGroup = new BehaviorSubject<number>(0);
  timerConversation = new BehaviorSubject<number>(0);
  disable = new BehaviorSubject<boolean>(false);
  disableGroup = new BehaviorSubject<boolean>(false);
  disablePeople = new BehaviorSubject<boolean>(false);
  disableConversation = new BehaviorSubject<boolean>(false);
  clicked = new BehaviorSubject<boolean>(false);
  second: number = 59;
  constructor() {}

  getTimer$() {
    return this.timer.asObservable();
  }

  getTimerPeople$() {
    return this.timerPeople.asObservable();
  }
  getTimerGroup$() {
    return this.timerGroup.asObservable();
  }

  getTimerConversation$() {
    return this.timerConversation.asObservable();
  }

  getDisable$() {
    return this.disable.asObservable();
  }

  getDisableGroup$() {
    return this.disableGroup.asObservable();
  }
  getDisablePeople$() {
    return this.disablePeople.asObservable();
  }

  getDisableConversation$() {
    return this.disableConversation.asObservable();
  }
  getClicked$() {
    return this.clicked.asObservable();
  }
  set disable$(val: boolean) {
    console.log(val);
    this.disable.next(val);
  }

  set disableGroup$(val: boolean) {
    console.log(val);
    this.disableGroup.next(val);
  }
  set disablePeople$(val: boolean) {
    console.log(val);
    this.disablePeople.next(val);
  }

  set disableConversation$(val: boolean) {
    console.log(val);
    this.disableConversation.next(val);
  }

  set clicked$(val: boolean) {
    console.log(val);
    this.clicked.next(val);
  }

  set timer$(val: number) {
    console.log(val);
    this.timer.next(val);
  }

  set timerGroup$(val: number) {
    console.log(val);
    this.timerGroup.next(val);
  }

  set timerPeople$(val: number) {
    console.log(val);
    this.timerPeople.next(val);
  }

  set timerConversation$(val: number) {
    console.log(val);
    this.timerConversation.next(val);
  }
}
