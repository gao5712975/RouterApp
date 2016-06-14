/**
 * Created by moka on 16-5-30.
 */
import {Page} from 'ionic-angular'

@Page({
    templateUrl:'build/business/config/qosConfig.html'
})

export class QosConfig{
    constructor(){
       this.qosconfirm1=true;
       this.cancel=true;
    }
    
}