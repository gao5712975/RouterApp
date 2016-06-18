/**
 * Created by moka on 16-5-30.
 */
import {Page,Events} from 'ionic-angular'
import {Http} from '@angular/http';
import * as helpers from '../../helpers/helpers';
import {SwitchName} from '../../pipe/switchName';

@Page({
  templateUrl: 'build/business/config/wlConfig.html',
  pipes:[SwitchName]
})
export class WlConfigPage {

  /**
   * 默认值
   */
  private wifi:string = 'WAN';
  /**
   * 表单
   */
  private wlConfig:any = {};
  private wanConfig:any = {};
  private lanConfig:any = {};

  private lanConfigM:any = {};
  private wanConfigM:any = {};
  private wlConfigM:any = {};

  constructor(private http:Http, private events:Events) {

    Promise.all([
        this.internetMethodWifi().then((res:any) => {
          if (res && res.code == 0) {
            this.wlConfig = res.wifiinfo;
          }
        }),
        this.internetMethodWan().then((res:any) => {
          if (res && res.code == 0) {
            this.wanConfig.pppoePassword = res.pppoePassword;
            this.wanConfig.pppoeName = res.pppoeName;
            this.wanConfig.mtu = res.info.mtu;
            this.wanConfig.wanType = res.info.details.wanType;
            // this.wanConfig.service = res.info.details.service;
            this.wanConfig.dnsAddrs = res.info.dnsAddrs;
            this.wanConfig.dnsAddrs1 = res.info.dnsAddrs1;
          }
        }),
        this.internetMethodLan().then((res:any) => {
          if (res && res.code == 0) {
            this.lanConfig = res.info.lanIp[0];
          }
        })
      ]).then(() => {
        this.events.publish('loading:close');
      }).catch((err) => {
        // this.events.publish('loading:close');
        console.info('黑名单请求错误')
      })
      /**
       * 提交表单
       */

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
    var query = Object.assign({}, this.lanConfig);
    var query = Object.assign(query, this.lanConfigM);
    let body = helpers.toBodyString(query);
    return new Promise(resolve => {
      this.http.post(url, body).subscribe(res => {
        resolve(res);
      })
    })
  }

  /**
   * 修改WAN口上网配置信息
   */
  internetModifyWan() {
    let url = `/cheng/networkmanager/set_wan`;
    var query = Object.assign({}, this.wanConfig);
    var query = Object.assign(query, this.wanConfigM);
    console.info(query);
    let body = helpers.toBodyString(query);
    return new Promise(resolve => {
      this.http.post(url, body).subscribe(res => {
        resolve(res);
      })
    })
  }

  /**
   * 修改WIFI口上网配置信息
   */
  internetModifyWifi() {
    let url = `/cheng/networkmanager/set_wifi_setting`;
    var query = Object.assign({}, this.wlConfig);
    var query = Object.assign(query, this.wlConfigM);
    let body = helpers.toBodyString(query);
    return new Promise(resolve => {
      this.http.post(url, body).subscribe(res => {
        resolve(res);
      })
    })
  }

  /**
   * 提交 Lan修改
   * @return {[type]} [description]
   */
  applicationModifyLan() {
    this.internetModifyLan().then((res:any) => {
      if (res && res.code == 0) {
        this.events.publish('global:baseUrl', res.ip)
      }
    });
  }

  /**
   * 提交 Wan修改
   * @return {[type]} [description]
   */
  applicationModifyWan() {
    this.internetModifyWan().then((res:any) => {
      if (res && res.code == 0) {
        this.events.publish('global:baseUrl', res.ip)
      }
    });
  }

  /**
   * 提交 WIFI修改
   * @return {[type]} [description]
   */
  applicationModifyWifi() {
    this.internetModifyWifi().then((res:any) => {
      if (res && res.code == 0) {
        this.events.publish('global:baseUrl', res.ip)
      }
    });
  }

}
