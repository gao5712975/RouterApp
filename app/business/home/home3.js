/**
 * Created by moka on 16-5-26.
 */
import {Page,NavController} from 'ionic-angular'
import {Home4} from './home4'

@Page({
    templateUrl: 'build/business/home/home3.html'
})

export class Home3{
    static get parameters() {
        return [
            [NavController]
        ];
    }

    constructor(nav){
        this.nav = nav;
    }

    goToHome4(){
        this.nav.push(Home4)
    }
}