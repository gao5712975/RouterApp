/**
 * Created by moka on 16-5-30.
 */
import {
  Page
} from 'ionic-angular';
import {
  Http
} from '@angular/http';

import * as helpers from '../../helpers/helpers';

@Page({
  templateUrl: 'build/business/config/qosConfig.html'
})

export class QosConfig {
  static get parameters() {
    return [
      [Http]
    ]
  }

  constructor(http) {
    this.http = http;

    /**
     * 默认值
     * @type {Number}
     */
    this.autoConfigShow = true;

    this.switchBlock = false;

    /**
     * 状态初始化
     * @return {[type]} [description]
     */
    this.internetMethodStatus().then((res) => {
      if(res && res.code == 0){
        if(res.status.on == 0){
          this.autoConfig = -1;
        }else if(res.status.mode == 0 && res.status.on == 1){
          this.autoConfig = 0;
        }else if(res.status.mode == 2 && res.status.on == 1){
          this.autoConfig = 2;
          this.autoConfigShow = false;
        }
      }
    })
  }
  /**
   * 自动手动切换
   * @return {[type]} [description]
   */
  autoConfigChange() {
    if(this.switchBlock){
      return
    }
    switch (this.autoConfig) {
      case '-1':
        this.switchBlock = true;
        Promise.all([this.internetMethodSwitch(0)]).then((res) => {
          console.info(res);
          this.internetMethodStatus().then((res) => {
            console.info(res);
            this.autoConfigShow = true;
            this.switchBlock = false;
          })
        })
        break;
      case '0':
        this.switchBlock = true;
        Promise.all([this.internetMethodSwitch(1),this.internetMethodMode(this.autoConfig)]).then((res) => {
          console.info(res);
          this.internetMethodStatus().then((res) => {
            console.info(res);
            this.autoConfigShow = true;
            this.switchBlock = false;
          })
        })
        break;
      case '2':
        this.switchBlock = true;
        Promise.all([this.internetMethodSwitch(1),this.internetMethodMode(this.autoConfig)]).then((res) => {
          console.info(res);
          this.internetMethodStatus().then((res) => {
            console.info(res);
            this.autoConfigShow = false;
            this.switchBlock = false;
          })
        })
        break;
    }
  }

  /**
   * 获取限速状态详情
   * @return {[type]} [description]
   */
  internetMethodStatus(){
    let url = `/cheng/networkmanager/qos_info`;
    return new Promise(resolve => {
      this.http.get(url).subscribe(res => {
        resolve(res);
      })
    })
  }

  /**
   * 限速开关
   * @param  {[type]} auto [description]
   * @return {[type]}      [description]
   */
  internetMethodSwitch(auto) {
    let url = `/cheng/networkmanager/qos_switch?on=${auto}`;
    return new Promise(resolve => {
      this.http.get(url).subscribe(res => {
        resolve(res);
      })
    })
  }

  /**
   * 更改模式 手动2 自动0
   * @param  {[type]} mode [description]
   * @return {[type]}      [description]
   */
  internetMethodMode(mode){
    let url = `/cheng/networkmanager/qos_mode?mode=${mode}`;
    return new Promise(resolve => {
      this.http.get(url).subscribe(res => {
        resolve(res);
      })
    })
  }
}
