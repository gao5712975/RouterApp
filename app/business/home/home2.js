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

    constructor(nav){
        this.nav = nav;
        /**
         * 默认参数
         * @type {String}
         */
        this.wifi = 'autoIp';
        this.inputType = 'password';
        this.src = './build/static/img/home/guidance-eye.png';

    }

    goToHome3(){
        this.nav.push(Home3)
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
