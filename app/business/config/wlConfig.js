/**
 * Created by moka on 16-5-30.
 */
import {Page} from 'ionic-angular'

@Page({
    templateUrl:'build/business/config/wlConfig.html'
})

export class WlConfigPage{
    constructor(){
        this.wifi = 'WAN';
    }
    
}