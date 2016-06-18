/**
 * Created by moka on 16-5-30.
 */
import {Page} from 'ionic-angular';
import {Http} from '@angular/http';

import {SwitchName} from '../../pipe/switchName';
import * as helpers from '../../helpers/helpers';

@Page({
  templateUrl: 'build/business/config/qosConfig.html',
  pipes:[SwitchName]
})

export class QosConfig {
  /**
   * 默认值
   */
  private autoConfig:any;
  private autoConfigShow:boolean = true;//手动限速 显示用户列表
  private switchBlock:boolean = false;//禁用选择按钮 阻止重复提交
  private band:any = {upload:0,download:0};//外网宽带
  private userlist:any[] = [];//用户列表

  constructor(private http:Http) {

    /**
     * 状态初始化
     * @return {[type]} [description]
     */
    this.internetMethodStatus().then((res:any) => {
      if(res && res.code == 0){
        if(res.status.on == 0){
          this.autoConfig = -1;
        }else if(res.status.mode == 0 && res.status.on == 1){
          this.autoConfig = 0;
        }else if(res.status.mode == 2 && res.status.on == 1){
          this.autoConfig = 2;
          this.autoConfigShow = false;
          this.userlist = res.list;
        }
        this.band = res.band;
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
        Promise.all([this.internetMethodSwitch(0)]).then((res:any) => {
          this.internetMethodStatus().then((res:any) => {
            this.autoConfigShow = true;
            this.switchBlock = false;

            this.band = res.band;
          })
        })
        break;
      case '0':
        this.switchBlock = true;
        Promise.all([this.internetMethodSwitch(1),this.internetMethodMode(this.autoConfig)]).then((res:any) => {
          console.info(res);
          this.internetMethodStatus().then((res:any) => {
            this.autoConfigShow = true;
            this.switchBlock = false;

            this.band = res.band;
          })
        })
        break;
      case '2':
        this.switchBlock = true;
        Promise.all([this.internetMethodSwitch(1),this.internetMethodMode(this.autoConfig)]).then((res:any) => {
          console.info(res);
          this.internetMethodStatus().then((res:any) => {
            this.autoConfigShow = false;
            this.switchBlock = false;

            this.band = res.band;
            this.userlist = res.list;
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
