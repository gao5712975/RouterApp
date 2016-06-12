/**
 * Created by moka on 16-5-30.
 */
 import {Page,Events} from 'ionic-angular'
 import {Http} from '@angular/http';
 import * as helpers from '../../helpers/helpers';

@Page({
    templateUrl:'build/business/config/hmdConfig.html'
})

export class HmdConfig{
    static get parameters(){
      return [
        [Http],[Events]
      ]
    }
    constructor(http,events){
      this.http = http;
      this.events = events;
      this.hmdConfig = [];

      this.internetMethod().then((res) => {
        this.events.publish('loading:close');
        if(res && res.code == 0){
          this.hmdConfig = res.macfilter;
        }
      })
    }

    /**
     * 获取黑名单
     */
     internetMethod() {
       let url = `/cheng/networkmanager/get_mac_filter`;
       return new Promise(resolve => {
         this.http.get(url).subscribe(res => {
           resolve(res);
         })
       })
     }

     removeHmd(mac){
       console.info(mac);
     }
}
