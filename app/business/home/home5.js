/**
 * Created by moka on 16-5-26.
 */
import {Page,NavController,NavParams} from 'ionic-angular'
import {Home6} from './home6'

import {Http} from '@angular/http';
import * as helpers from '../../helpers/helpers';
import {Home2} from './home2'

@Page({
    templateUrl: 'build/business/home/home5.html'
})

export class Home5{
    static get parameters() {
        return [
            [NavController],[Http],[NavParams]
        ];
    }

    constructor(nav,http,navParams){
        this.nav = nav;
        this.http = http;
        this.navParams = navParams;

        let data = this.navParams.data;
        this.internetMethod(data).then((res) => {
          if(res && res.code == 0){
            nav.setRoot(Home6,data);
          }
        })
    }

    internetMethod(body){
      let url = '/cheng/orangesystem/set_router';//路由器设置
      return new Promise(resolve => {
        this.http.post(url ,helpers.toBodyString(body)).subscribe(res => {
          resolve(res);
        })
      })
    }
}
