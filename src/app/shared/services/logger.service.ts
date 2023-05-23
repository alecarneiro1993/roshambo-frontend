import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  constructor() {
    //nothing
  }

  log(msg: string) {
    console.log(msg);
  }

  warn(msg: string) {
    console.warn(msg);
  }

  error(msg: string) {
    console.error(msg);
  }
}
