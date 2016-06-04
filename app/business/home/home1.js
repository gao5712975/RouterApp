/**
 * Created by moka on 16-5-26.
 */
import {Page,NavController} from 'ionic-angular'
import {StatusBar} from 'ionic-native';
import {Home2} from './home2'

@Page({
    templateUrl: 'build/business/home/home1.html'
})
export class Home1{
    static get parameters() {
        return [
            [NavController]
        ];
    }

    constructor(nav){
        this.nav = nav;
    }

    goToHome2(){
        this.nav.push(Home2)
    }
}
