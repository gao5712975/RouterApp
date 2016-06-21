
/**
 * Created by moka on 16-5-30.
 */
import {Page} from 'ionic-angular';
import {SwitchName} from '../../pipe/switchName';

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

    constructor() {

    }
}
