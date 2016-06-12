/**
 * Created by moka on 16-5-30.
 */
import {Page,Events} from 'ionic-angular'
import {Http} from '@angular/http';
import * as helpers from '../../helpers/helpers';

@Page({
  templateUrl: 'build/business/config/wlConfig.html'
})

export class WlConfigPage {
  static get parameters() {
    return [
      [Http],[Events]
    ]
  }
  constructor(http,events) {
    this.http = http;
    this.events = events;
    /**
     * 默认值
     */
    this.wifi = 'WAN';
    this.lwConfigShow = true;

    /**
     * 表单
     */
    this.wlConfig = {};
    this.wanConfig = {};
    this.lanConfig = {};

    Promise.all([
      this.internetMethodWifi().then((res) => {
        if (res && res.code == 0) {
          this.wlConfig = res.wifiinfo;
        }
      }),
      this.internetMethodWan().then((res) => {
        if (res && res.code == 0) {
          this.wanConfig.pppoePassword = res.pppoePassword;
          this.wanConfig.pppoeName = res.pppoeName;
          this.wanConfig.mtu = res.info.mtu;
          this.wanConfig.wanType = res.info.details.wanType;
          this.wanConfig.service = res.info.details.service;
          this.wanConfig.dnsAddrs = res.info.dnsAddrs;
          this.wanConfig.dnsAddrs1 = res.info.dnsAddrs1;
        }
      }),
      this.internetMethodLan().then((res) => {
        if (res && res.code == 0) {
          this.lanConfig = res.info.lanIp[0];
        }
      })
    ]).then(() => {
      this.events.publish('loading:close');
    }).catch((err) => {console.info('黑名单请求错误')})
    /**
     * 提交表单
     */
    this.lanConfigM = {};
  }

  /**
   * 	获取网络设置
   * @return {[type]} [description]
   */
  internetMethodWifi() {
      let url = `/cheng/networkmanager/get_wifi_setting?index=1`;
      return new Promise(resolve => {
        this.http.get(url).subscribe(res => {
          resolve(res);
        })
      })
    }
    /**
     * 获取WAN口上网配置信息
     */
  internetMethodWan() {
      let url = `/cheng/networkmanager/get_wan_info`;
      return new Promise(resolve => {
        this.http.get(url).subscribe(res => {
          resolve(res);
        })
      })
    }
    /**
     * 获取LAN口上网配置信息
     */
  internetMethodLan() {
      let url = `/cheng/networkmanager/get_lan_dhcp`;
      return new Promise(resolve => {
        this.http.get(url).subscribe(res => {
          resolve(res);
        })
      })
    }
    /**
     * 修改LAN口上网配置信息
     */

  internetModifyLan() {
    let url = `/cheng/networkmanager/set_lan_ip_and_mask`;
    var query = this.lanConfigM;
    query.mask == undefined?(query.mask = this.lanConfig.mask):(void 0);
    let body = helpers.toBodyString(this.lanConfigM);
    return new Promise(resolve => {
      this.http.post(url, body).subscribe(res => {
        resolve(res);
      })
    })
  }

  applicationModifyLan() {
    this.internetModifyLan().then((res) => {
      if(res && res.code == 0){
        this.events.publish('global:baseUrl',res.ip)
      }
    });
  }

}
