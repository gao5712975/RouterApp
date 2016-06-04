// import {bootstrap} from '@angular/platform-browser/browser';
import {Request ,BaseRequestOptions,RequestOptions,ResponseOptions,BaseResponseOptions} from '@angular/http';
import {provide,Injectable} from '@angular/core';
var platform = require('@angular/platform-browser-dynamic');

/**
* 请求统一处理
*/
export class YRequestObtions extends BaseRequestOptions {
  constructor(){
    super();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
  }
}

/**
* 响应统一处理
*/
export class YResponseObtions extends BaseResponseOptions {
  constructor(){
    super();
  }
}

@Injectable()
class AutoAuthenticator {
  constructor() {}
  
}

exports.interceptor =  [
  provide(RequestOptions,{useClass: YRequestObtions}),
  provide(ResponseOptions,{useClass: YResponseObtions})
]
