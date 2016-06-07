/**
 * Created by moka on 16-5-26.
 */
import {Page,NavController} from 'ionic-angular'
import {Home3} from './home3'

// import {Http} from '@angular/http';
// import * as helpers from '../../helpers/helpers';

@Page({
    templateUrl: 'build/business/home/home2.html'
})

export class Home2{
    static get parameters() {
        return [
            [NavController]
        ];
    }

    constructor(nav,http){
        this.nav = nav;
        /**
         * 默认参数
         * @type {String}
         */
        this.wifi = 'autoIp';
        this.inputType = 'password';
        this.src = './build/static/img/home/guidance-eye.png';

        /**
         * 表单
         */
        this.pppoe = {};
        this.manualIp = {};
        this.autoIp = {};

    }

    // internetMethod(body){
    //   let url = '/cheng/networkmanager/set_wan';
    //   body = helpers.toBodyString(body);
    //   return new Promise(resolve => {
    //     this.http.post(url ,body).subscribe(res => {
    //       resolve(res);
    //     })
    //   })
    // }

    goToHome3(){
      let data = undefined;
      switch (this.wifi) {
        case 'autoIp':
          this.autoIp.wanType = 'dhcp';
          this.autoIp.autoset = 0;
          data = this.autoIp;
          // this.internetMethod(this.autoIp).then(res => {
          //   console.info(res)
          //   if(res && res.code == 0){
          //     this.nav.push(Home3)
          //   }
          // })
          break;
        case 'pppoe':
          this.pppoe.wanType = 'pppoe';
          this.pppoe.autoset = 1;
          data = this.pppoe;
          // this.internetMethod(this.pppoe).then(res => {
          //   console.info(res)
          //   if(res && res.code == 0){
          //     this.nav.push(Home3)
          //   }
          // })
          break;
        case 'manualIp':
          if(!this.manualIp.mask){
            this.manualIp.mask = '255.255.255.0'
          }
          this.manualIp.wanType = 'static';
          data = this.manualIp;
          // this.internetMethod(this.manualIp).then(res => {
          //   console.info(res)
          //   if(res && res.code == 0){
          //     this.nav.push(Home3)
          //   }
          // })
          break;
      }
      this.nav.push(Home3,data)
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
