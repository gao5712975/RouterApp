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
    
    ZfConfiga(){
        this.nav.push(ZfConfiga)
    }

}

