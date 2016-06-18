/**
 * Created by moka on 16-5-26.
 */
import {Page, NavController, Alert} from 'ionic-angular'
import {Http} from '@angular/http';
import * as helpers from '../../helpers/helpers';

@Page({
    templateUrl: 'build/business/config/gzConfig2.html'
})

export class GzConfig2 {
    /**
     * 默认值
     */
    private wtfmbpEquallyShow: boolean = true;
    /**
     * 表单
     * @type {Object}
     */
    private wtfmbp: any = {};

    private routerWifiList: any[] = [];

    constructor(private nav: NavController, private http: Http) {

        this.internetMethodList().then((res: any) => {
            if (res && res.code == 0) {
                this.routerWifiList = res.list;
                this.wtfmbp.remotessid = this.routerWifiList[0].ssid;
                this.wtfmbp.remoteencryption = this.routerWifiList[0].encryption;
            }
        })
    }

    internetMethodList() {
        let url = `/cheng/networkmanager/get_wifi_scan_result?index=1`;
        return new Promise((resolve) => {
            this.http.get(url).subscribe((res) => {
                resolve(res);
            })
        })
    }

    internetMethodInfo() {
        let url = `/cheng/networkmanager/get_wifi_setting?index=1`;
        return new Promise((resolve) => {
            this.http.get(url).subscribe((res) => {
                resolve(res);
            })
        })
    }

    internetMethodConfig(body) {
        let url = `/cheng/networkmanager/set_wifi_repeater`;
        return new Promise((resolve) => {
            this.http.post(url, helpers.toBodyString(body)).subscribe((res) => {
                resolve(res);
            })
        })
    }



    /**
     * 是否使用主路由器配置
     * @return {[type]} [description]
     */
    wtfmbpEqually() {
        if (!this.wtfmbpEquallyShow) {
            this.internetMethodInfo().then((res: any) => {
                if (res && res.code == 0) {
                    this.wtfmbp.APssid = res.wifiinfo.ssid;
                    this.wtfmbp.APencryption = res.wifiinfo.encryption;
                    this.wtfmbp.APpassword = res.wifiinfo.password;
                }
            })
        } else {
            delete this.wtfmbp.APssid;
            delete this.wtfmbp.APencryption;
            delete this.wtfmbp.APpassword;
        }
    }
    /**
     * 开始中继
     * @return {[type]} [description]
     */
    goRelay() {
        let alter = this.showAlert();
        this.internetMethodConfig(this.wtfmbp).then((res: any) => {
            if (res && res.code == 0) {
                alter.setMessage(`<div style="font-size: 1.8rem;color: #000;padding-top: 4rem;height: 16rem;"><img style='width: 6rem;' src='./build/static/img/config/wf-true.png'><p>中继成功<br>请重新打开小橙管理应用</p></div>`);
                setTimeout(() => {
                    alter.dismiss();
                }, 800);
            }
        })
    }


    /**
     * 开始中继 alert
     * @return {[type]} [description]
     */
    showAlert() {
        let alert = Alert.create({
            message: `<div style="font-size: 1.8rem;color: #000;padding-top: 4rem;height: 16rem;"><img style='width: 6rem;' src='./build/static/img/config/wf-await.gif'><p>操作生效中<br>请不要关闭页面或断开路由器</p></div>`,
            enableBackdropDismiss: false
        })
        this.nav.present(alert);
        return alert;
    }

}
