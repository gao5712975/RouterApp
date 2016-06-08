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
        this.identical = true;
        this.submitted = false;
        /**
         * 表单
         */
        console.info(this.navParams.data);
        this.adminConfig = {};
        this.adminConfig.name = "Cheng-C999";
        this.adminConfig.newPwd = this.navParams.data.wifipassword;
    }

    identicalChange(){
      if(this.identical){
        this.adminConfig.newPwd = this.navParams.data.wifipassword;
      }else{
        this.adminConfig.newPwd = "";
      }
    }

    goToHome5(form){
      this.submitted = true;
      if(form){
        let newPwdShow = this.adminConfig.newPwd;
        this.adminConfig.newPwd = helpers.encrypt.newPwd('admin',this.adminConfig.newPwd);

        let data = Object.assign(this.navParams.data,this.adminConfig);
        data.oldPwd = helpers.encrypt.encPwd('admin');
        data.nonce = helpers.encrypt.init();
        data.newPwdShow = newPwdShow;
        this.nav.push(Home5,data);
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
