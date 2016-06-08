/**
 * Created by moka on 16-5-26.
 */
import {Page,NavController} from 'ionic-angular'
import {StatusBar} from 'ionic-native';
//import {Home2} from './gzConfig2'

@Page({
    templateUrl:'build/business/config/gzConfig2.html'
})

export class GzConfig2{
    static get parameters() {
        return [
            [NavController]
        ];
    }

    constructor(nav){
        this.nav = nav;
    }

    goToHome1(){
//      this.nav.push(Home2)
    }
}