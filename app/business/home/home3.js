/**
 * Created by moka on 16-5-26.
 */
import {Page,NavController,NavParams} from 'ionic-angular'
import {Home4} from './home4'

@Page({
    templateUrl: 'build/business/home/home3.html'
})

export class Home3{
    static get parameters() {
        return [
            [NavController],[NavParams]
        ];
    }

    constructor(nav,navParams){
        this.nav = nav;
        this.navParams = navParams
        /**
         * 默认参数
         * @type {String}
         */
        this.inputType = 'password';
        this.submitted = false;

        /**
         * 表单
         */
        this.wifiConfig = {};
        this.wifiConfig.ssid = 'xiaocheng';
    }

    goToHome4(form){
      if(form == undefined){
        this.nav.push(Home4);
      }else if(!form){
        this.submitted = true;
      }else if(form){
        this.wifiConfig.encryption = 'mixed-psk';//加密方式
        let data = Object.assign(this.navParams.data,this.wifiConfig);
        this.nav.push(Home4,data);
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
