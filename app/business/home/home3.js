/**
 * Created by moka on 16-5-26.
 */
import {Page,NavController,NavParams} from 'ionic-angular'
import {Home4} from './home4'

import {Http} from '@angular/http';
import * as helpers from '../../helpers/helpers';

@Page({
    templateUrl: 'build/business/home/home3.html'
})

export class Home3{
    static get parameters() {
        return [
            [NavController],[Http],[NavParams]
        ];
    }

    constructor(nav,http,navParams){
        this.nav = nav;
        this.http = http;
        this.navParams = navParams
        /**
         * 默认参数
         * @type {String}
         */
        this.inputType = 'password';
        this.src = './build/static/img/home/guidance-eye.png';

        /**
         * 表单
         */
        this.wifiConfig = {};
        this.wifiConfig.ssid = 'xiaochengluyouqi';
    }

    // internetMethod(body){
    //   let url = '/cheng/networkmanager/set_wifi_setting';
    //   body = helpers.toBodyString(body);
    //   return new Promise(resolve => {
    //     this.http.post(url ,body).subscribe(res => {
    //       resolve(res);
    //     })
    //   })
    // }

    goToHome4(){
      let data = this.navParams.data;
      this.wifiConfig.encryption = 'psk2';//加密方式
      Object.assign(data,this.wifiConfig);
      this.nav.push(Home4,data);
      // this.internetMethod(this.wifiConfig).then(res => {
      //   if(res && res.code == 0){
      //     this.nav.push(Home4,this.wifiConfig.wifipwd);
      //   }
      // });
    }
    /**
     * 密码显示
     * @return {[type]} [description]
     */
    updateImg(){
      if(this.inputType == 'password'){
        this.inputType = 'text';
        this.src = './build/static/img/home/guidance-eye1.png';
      }else{
        this.inputType = 'password';
        this.src = './build/static/img/home/guidance-eye.png';
      }
    }
}
