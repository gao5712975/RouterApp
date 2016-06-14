/**
 * Created by moka on 16-5-30.
 */
 import {Page,Events,Alert,NavController} from 'ionic-angular'
 import {Http} from '@angular/http';
 import * as helpers from '../../helpers/helpers';

@Page({
    templateUrl:'build/business/config/hmdConfig.html'
})

export class HmdConfig{
    static get parameters(){
      return [
        [Http],[Events],[NavController]
      ]
    }
    constructor(http,events,nav){
      /**
       * 默认值
       * @type {[type]}
       */
      this.http = http;
      this.events = events;
      this.nav = nav;
      this.hmdConfig = [];

      this.internetMethodList().then((res) => {
        this.events.publish('loading:close');
        if(res && res.code == 0){
          this.hmdConfig = res.macfilter;
        }
      })
    }

    /**
     * 获取黑名单
     */
     internetMethodList() {
       let url = '/cheng/networkmanager/get_mac_filter';
       return new Promise(resolve => {
         this.http.get(url).subscribe(res => {
           resolve(res);
         })
       })
     }

     /**
      * 删除黑名单
      */
      internetMethodDelete(body) {
        let url = '/cheng/networkmanager/modify_mac_filter';
        return new Promise(resolve => {
          this.http.post(url,helpers.toBodyString(body)).subscribe(res => {
            resolve(res);
          })
        })
      }

      /**
       * 提交 删除黑名单
       */
     removeHmd(mac,index,event){
       event.stopPropagation();
       let body = {
         mac:mac,
         option:1,
         mode:0
       };
       this.internetMethodDelete(body).then((res) => {
         if(res && res.code == 0){
           this.showAlertSuccess();
           this.hmdConfig.splice(index,1);
         }else{
           this.showAlertError();
         }
       });
     }

     showRemoveBtn(co){
       this.hmdConfig.forEach((da,i) => {
         if(co != da){
           da.removeBtn = false;
         }
       })
       co.removeBtn = !co.removeBtn;
     }

     /**
      * 黑名单 删除成功提示
      * @return {[type]} [description]
      */
     showAlertSuccess(){
         let alert = Alert.create({
             message:`<div style="font-size: 1.8rem;color: #000;padding-top: 4rem;height: 16rem;"><img style='width: 6rem;' src='./build/static/img/config/wf-await.gif'><p>解除拉黑成功</p></div>`
         })
         this.nav.present(alert);
     }

     /**
      * 黑名单 删除失败提示
      * @return {[type]} [description]
      */
     showAlertError(){
         let alert = Alert.create({
             message:`<div style="font-size: 1.8rem;color: #000;padding-top: 4rem;height: 16rem;"><img style='width: 6rem;' src='./build/static/img/config/wf-await.gif'><p>操作失败，请重试</p></div>`
         })
         this.nav.present(alert);
     }
}
