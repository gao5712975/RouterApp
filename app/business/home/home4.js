/**
 * Created by moka on 16-5-26.
 */
import {Page,NavController,NavParams} from 'ionic-angular'
import {Home5} from './home5'

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
        this.wifiPassword = this.navParams.data;
        console.info(this.navParams.data);
    }

    goToHome5(){
        this.nav.push(Home5);
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
