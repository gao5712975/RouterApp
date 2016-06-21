
/**
 * Created by moka on 16-5-30.
 */
import {Page} from 'ionic-angular';
import {Http} from '@angular/http';

import {SwitchName} from '../../pipe/switchName';
import * as helpers from '../../helpers/helpers';

@Page({
    templateUrl: 'build/business/config/zfConfigadd.html',
    pipes: [SwitchName]
})

export class ZfConfiga {

    /**
     * 表单
     * @type {any}
     */
    private zfConfig: any = {proto:1};

    constructor(private http:Http) {

    }

    addZfConfigPort(){
      this.internetMethodAdd().then((res:a))
    }

    internetMethodAdd(){
      let url = `/cheng/networkmanager/add_redirect`;
      return new Promise(resolve => {
        this.http.post(url,helpers.toBodyString(this.zfConfig)).subscribe(res => {
          resolve(res);
        })
      })
    }
}
