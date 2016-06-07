/**
 * Created by moka on 16-5-26.
 */
import {Page,NavController,NavParams} from 'ionic-angular'
import {Home5} from './home5';
import * as helpers from '../../helpers/helpers';

@Page({
    templateUrl: 'build/business/home/home4.html'
})

export class Home4{
    static get parameters() {
        return [
            [NavController],[NavParams]
        ];
    }

    constructor(nav,navParams){
        this.nav = nav;
        this.navParams = navParams;
        /**
         * 默认参数
         * @type {String}
         */
        this.inputType = 'password';
        this.src = './build/static/img/home/guidance-eye.png';
        this.identical = true;
        /**
         * 表单
         */
        this.adminConfig = {};
        this.adminConfig.name = "Cheng-C9";
        this.adminConfig.newPwd = this.navParams.data.wifipassword;
    }

    identicalChange(){
      if(this.identical){
        this.adminConfig.newPwd = this.navParams.data.wifipassword;
      }else{
        this.adminConfig.newPwd = "";
      }
    }

    goToHome5(){
      let data = this.navParams.data;
      data.txpwr = 1;
      data.oldPwd = helpers.encrypt.encPwd('admin');
      data.nonce = helpers.encrypt.init();
      this.adminConfig.newPwd = helpers.encrypt.newPwd(data.oldPwd,this.adminConfig.newPwd);
      Object.assign(data,this.adminConfig);
      console.info(data);
      this.nav.push(Home5,data);
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
