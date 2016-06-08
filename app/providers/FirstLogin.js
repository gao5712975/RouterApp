import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import * as helpers from '../helpers/helpers';

import {Storage, LocalStorage} from 'ionic-angular';

@Injectable()
export class FirstLogin{
  static get parameters(){
    return[
      [Http]
    ]
  }
  constructor(http) {
    this.http = http;
    this.storage = new Storage(LocalStorage);
  }

  login(){
    let url = "/cheng/orangesystem/login";
    // let url = "/cheng/orangesystem/check_login";
    let body = {
      username:"admin",
      nonce:helpers.encrypt.init(),
      password:helpers.encrypt.encPwd("admin"),
      init:1
    }
    return new Promise(resolve => {
      this.http.post(url,helpers.toBodyString(body)).subscribe(res => {
        if(res && res.code == 0){
          //默认登陆成功 保存token
          if(res.token){
            this.storage.set('token',res.token);
          }
        }
        resolve(res);
      })
    })
  }
}
