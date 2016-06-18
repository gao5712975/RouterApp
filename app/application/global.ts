import {Injectable} from '@angular/core';
import {Events} from 'ionic-angular';

@Injectable()
export class Global {

  static baseUrl:string;
  static token:string;
  static deviceMac:string = '00:e0:4c:36:49:8e'
  constructor(private events:Events) {
    
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
