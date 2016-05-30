/**
 * Created by moka on 16-5-26.
 */
import {Page,NavController} from 'ionic-angular'
import {Home3} from './home3'

@Page({
    templateUrl: 'build/business/home/home2.html'
})

export class Home2{
    static get parameters() {
        return [
            [NavController]
        ];
    }

    constructor(nav){
        this.nav = nav;
    }
    
    goToHome3(){
        this.nav.push(Home3)
    }
    
}