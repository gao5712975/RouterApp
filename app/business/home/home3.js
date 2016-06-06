/**
 * Created by moka on 16-5-26.
 */
import {Page,NavController} from 'ionic-angular'
import {Home4} from './home4'

@Page({
    templateUrl: 'build/business/home/home3.html'
})

export class Home3{
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
        this.inputType = 'password';
        this.src = './build/static/img/home/guidance-eye.png';
    }

    goToHome4(){
        this.nav.push(Home4,'123456789');
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
