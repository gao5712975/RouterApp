/**
 * Created by moka on 16-5-30.
 */
import {Page,NavController} from 'ionic-angular'
import {ZfConfiga} from './zfConfigadd'


@Page({
    templateUrl:'build/business/config/zfConfig.html'
})

export class ZfConfig{

    constructor(private nav:NavController){

    }

    /**
     * 按端口添加转发
     * @return {[type]} [description]
     */
    addConfigPort(){
      this.nav.push(ZfConfiga)
    }

    /**
     * 按范围添加转发
     * @return {[type]} [description]
     */
    addConfigRange(){
        this.nav.push(ZfConfiga)
    }

}
