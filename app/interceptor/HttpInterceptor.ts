// import {bootstrap} from '@angular/platform-browser/browser';
import {HTTP_PROVIDERS, XHRBackend, BrowserXhr, BaseRequestOptions, RequestOptions, ResponseOptions, BaseResponseOptions, Http, Response, Request, XHRConnection, XSRFStrategy} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {provide, Injectable, Inject} from '@angular/core';

import {Global} from '../application/global';
import {Storage, LocalStorage} from 'ionic-angular';

/**
 * 请求统一处理
 */
class YRequestObtions extends BaseRequestOptions {
    constructor() {
        super();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    }
}

/**
 * 响应统一处理
 */
class YResponseObtions extends BaseResponseOptions {
    constructor() {
        super();
    }
}

/**
 * 监听所有的请求和响应 重写父类方法
 */
class YXHRBackend extends XHRBackend {
    constructor(private browserXhr: BrowserXhr, private responseOptions: ResponseOptions, private xsrFStrategy: XSRFStrategy) {
        super(browserXhr, responseOptions, xsrFStrategy);
    }
    createConnection(request: Request): XHRConnection {
        /**
         * request 每次请求修改url地址；
         */
        let token = Global.getToken();
        if (token) {
            request.url = Global.getBaseUrl() + '/;stok=' + token + request.url;
        } else {
            request.url = Global.getBaseUrl() + request.url;
        }

        let xhrConnection = super.createConnection(request);
        xhrConnection.response = xhrConnection.response.catch((error) => {
            return Observable.throw(error);
        });

        //请求结果的预处理，统一处理业务状态！！！！！！
        xhrConnection.response = xhrConnection.response.map((data: any) => {
            try {
                return data.json();
            } catch (e) {
                return data._body;
            }
        });
        return xhrConnection;
    }
}

var Interceptor: any[] = [
    provide(RequestOptions, { useClass: YRequestObtions }),
    provide(ResponseOptions, { useClass: YResponseObtions }),
    provide(XHRBackend, { useClass: YXHRBackend })
];

export {Interceptor};

