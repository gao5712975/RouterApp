/**
 * Created by moka on 16-5-26.
 */
import {Page, NavController, Alert} from 'ionic-angular';
import {Http} from '@angular/http';
//import {Home2} from './gzConfig2'

@Page({
    templateUrl: 'build/business/config/gzConfig1.html'
})

export class GzConfig1 {

    constructor(private nav: NavController, private http: Http) {

    }

	/**
	 * 有线中继
	 * @return {[type]} [description]
	 */
    internetMethod() {
        let url = `/cheng/networkmanager/detect_wan_type`;
        return new Promise((resolve) => {
            this.http.get(url).subscribe((res) => {
                resolve(res);
            })
        })
    }

	/**
	 * 提交 有线中继
	 * @return {[type]} [description]
	 */
    goRelay() {
        let alter = this.showAlert();
        this.internetMethod().then((res: any) => {
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
