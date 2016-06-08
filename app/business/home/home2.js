/**
 * Created by moka on 16-5-26.
 */
import {Page,NavController} from 'ionic-angular'
import {Home3} from './home3'

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
        this.backgroundImg = false;
        this.submitted = false;
        /**
         * 表单
         */
        this.pppoe = {};
        this.manualIp = {};
        this.autoIp = {};

    }

    goToHome3(form){
      if(form == undefined){
        this.nav.push(Home3);
      }else if(!form){
        this.submitted = true;
      }else if(form){
        let data = undefined;
        switch (this.wifi) {
          case 'autoIp':
            this.autoIp.wanType = 'dhcp';
            // this.autoIp.autoset = 0;
            data = this.autoIp;
            break;
          case 'pppoe':
            this.pppoe.wanType = 'pppoe';
            // this.pppoe.autoset = 1;
            data = this.pppoe;
            break;
          case 'manualIp':
            if(!this.manualIp.mask){
              this.manualIp.mask = '255.255.255.0'
            }
            this.manualIp.wanType = 'staticip';
            data = this.manualIp;
            break;
        }
        this.nav.push(Home3,data)
      }
    }
    /**
     * 密码显示
     * @return {[type]} [description]
     */
    touchstart(){
      this.inputType = 'text';
      this.backgroundImg = true;
    }
    touchend(){
      this.inputType = 'password';
      this.backgroundImg = false;
    }
}
