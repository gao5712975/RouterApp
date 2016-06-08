
/**
 * Created by moka on 16-5-26.
 */
import {Page,NavController} from 'ionic-angular'
import {StatusBar} from 'ionic-native';
import {GzConfig1} from './gzConfig1'
import {GzConfig2} from './gzConfig2'

@Page({
    templateUrl:'build/business/config/gzConfig.html'
})

export class GzConfig{
    static get parameters() {
        return [
            [NavController]
        ];
    }

    constructor(nav){
        this.nav = nav;
    }

    GzConfig1(){
        this.nav.push(GzConfig1)
    }
    
    GzConfig2(){
        this.nav.push(GzConfig2)
    }
}







