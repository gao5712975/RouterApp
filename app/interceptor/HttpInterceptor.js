// import {bootstrap} from '@angular/platform-browser/browser';
import {HTTP_PROVIDERS,XHRBackend,BrowserXhr,BaseRequestOptions,RequestOptions,ResponseOptions,BaseResponseOptions,Http,Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {provide,Injectable} from '@angular/core';

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

/**
 * 占时不需要！！！！！！！！ 不要删除
 */
// export class YHttp extends Http {
//   static get parameters() {
//       return [
//           [XHRBackend],[RequestOptions]
//       ];
//   }
//   constructor(backend,defaultOptions) {
//     super(backend, defaultOptions);
//   }
//
//   get(url, options) {
//     return super.get(url, options)
//       .map(res => {
//         return res;
//       });
//   }
//
//   post(url, options){
//     return super.post(url, options)
//       .map(res => {
//         return res;
//       });
//   }
//
// }


/**
 * 监听所有的请求和响应 重写父类方法
 */
export class YXHRBackend extends XHRBackend {
  static get parameters() {
      return [
          [BrowserXhr],[ResponseOptions]
      ];
  }

  constructor(browserXhr,responseOptions) {
    super(browserXhr,responseOptions);
  }

  createConnection(request){
    let xhrConnection = super.createConnection(request);
    xhrConnection.response = xhrConnection.response.catch((error) => {
      return Observable.throw(error);
    })

    //请求结果的预处理，统一处理业务状态！！！！！！
    xhrConnection.response = xhrConnection.response.map(data => {
      try {
        return data.json();
      } catch (e) {
        return data._body;
      }
    })
    return xhrConnection;
  }
}

exports.interceptor =  [
  provide(RequestOptions,{useClass: YRequestObtions}),
  provide(ResponseOptions,{useClass: YResponseObtions}),
  provide(XHRBackend,{useClass:YXHRBackend})
  // provide(Http,{
  //   useFactory: (backend, defaultOptions) => new YHttp(backend, defaultOptions),
  //   deps: [XHRBackend, RequestOptions]
  // }),

]
