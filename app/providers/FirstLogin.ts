import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import * as helpers from '../helpers/helpers';
import {Global} from '../application/global';

@Injectable()
export class FirstLogin {

    constructor(private http: Http) {}
    /**
     * 初始化 默认登陆
     * @return {[type]} [description]
     */
    login() {
        let url = "/cheng/orangesystem/login";
        let body = {
            username: "admin",
            nonce: helpers.encrypt.init(),
            password: helpers.encrypt.encPwd("admin"),
            init: 1
        }
        return new Promise(resolve => {
            this.http.post(url, helpers.toBodyString(body)).subscribe((res: any) => {
                if (res && res.code == 0) {
                    //默认登陆成功 保存token
                    if (res.token) {
                        Global.setToken(res.token);
                    }
                }
                resolve(res);
            })
        })
    }

    checkLogin() {
        let url = "/cheng/orangesystem/check_login";
        let body = {
            username: "admin",
            nonce: helpers.encrypt.init(),
            password: helpers.encrypt.encPwd("123456789"),
            init: 0
        }
        return new Promise(resolve => {
            this.http.post(url, helpers.toBodyString(body)).subscribe((res: any) => {
                if (res && res.code == 0) {
                    //登陆成功 保存token
                    if (res.token) {
                        Global.setToken(res.token);
                    }
                }
                resolve(res);
            })
        })
    }

    /**
     * 检测是否初始化
     * @return {[type]} [description]
     */
    firstLogin() {
        let url = '/cheng/orangesystem/is_inited';
        return new Promise(resolve => {
            this.http.get(url).subscribe(res => {
                resolve(res);
            })
        })
    }
}
