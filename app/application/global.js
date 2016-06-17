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
    this.deviceMac = '00:e0:4c:36:49:8e';
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

  static setDeviceMac(mac) {
    this.deviceMac = mac;
  }
  static getDeviceMac() {
    return this.deviceMac;
  }
}
