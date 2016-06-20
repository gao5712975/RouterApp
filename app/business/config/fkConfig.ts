/**
 * Created by moka on 16-5-30.
 */
import {Page} from 'ionic-angular'
import {Http} from '@angular/http';

import {SwitchName} from '../../pipe/switchName';
import * as helpers from '../../helpers/helpers';

@Page({
    templateUrl: 'build/business/config/fkConfig.html',
    pipes: [SwitchName]
})

export class FkConfig {
    private fkStatusShow: boolean = false;

    private fkEncrypShow: boolean = false;//加密
    private wifiinfo: any = {};//wifi访客状态
    constructor(private http: Http) {
        this.internetMethodStatus().then((res: any) => {
            if (res && res.code == 0) {
                this.wifiinfo = res.wifiinfo;
            }
        })
    }

    /**
     * 访客网络状态
     */
    internetMethodStatus() {
        let url = `/cheng/networkmanager/get_wifi_setting?index=3`;
        return new Promise(resolve => {
            this.http.get(url).subscribe(res => {
                resolve(res);
            })
        })
    }

    /**
     * 关闭访客网络
     */
    internetMethodClose(on) {
        let url = `/cheng/networkmanager/set_wifi_setting`;
        var query: any = {};
        query.index = 3;
        query.ssid = this.wifiinfo.ssid;
        query.password = this.wifiinfo.password;
        query.encryption = this.wifiinfo.encryption;
        query.on = on;
        return new Promise(resolve => {
            this.http.post(url, helpers.toBodyString(query)).subscribe(res => {
                resolve(res);
            })
        })
    }

    /**
     * 保存访客网络设置
     */
    configSave() {
        this.internetMethodClose(1).then((res: any) => {
            if(res && res.code == 0){
                
            }
        })
    }

    closeFkWifi() {
        if (isNaN(parseInt(this.wifiinfo.status))) {
            this.fkStatusShow = true;
            if (!this.wifiinfo.status) {
                this.internetMethodClose(0).then((res: any) => {
                    if (res && res.code == 0) {
                        this.fkStatusShow = false;
                    }
                })
            } else {
                this.fkStatusShow = false;
            }
        }
    }
}