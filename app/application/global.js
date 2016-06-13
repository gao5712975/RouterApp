import {Injectable} from '@angular/core';
import {Events} from 'ionic-angular';

@Injectable()
export class Global {
  static get parameters(){
    return [
      [Events]
    ]
  }
  constructor(events) {
    this.events = events;
    this.baseUrl = "";
    this.token = "";
  }
  static setBaseUrl(ip) {
    this.baseUrl = `//${ip}/cgi-bin/luci`;
  }
  static getBaseUrl() {
    return this.baseUrl;
  }

  static setToken(token) {
    this.token = token;
  }
  static getToken() {
    return this.token;
  }
}
