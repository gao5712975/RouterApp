/**
 * Created by moka on 16-5-26.
 */
import {Page,NavController} from 'ionic-angular'
import {Home5} from './home5'

@Page({
    templateUrl: 'build/business/home/home4.html'
})

export class Home4{
    static get parameters() {
        return [
            [NavController]
        ];
    }

    constructor(nav){
        this.nav = nav;
    }

    goToHome5(){
        this.nav.push(Home5)
    }
}