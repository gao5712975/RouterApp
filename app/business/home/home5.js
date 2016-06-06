/**
 * Created by moka on 16-5-26.
 */
import {Page,NavController} from 'ionic-angular'
import {Home6} from './home6'

@Page({
    templateUrl: 'build/business/home/home5.html'
})

export class Home5{
    static get parameters() {
        return [
            [NavController]
        ];
    }

    constructor(nav){
        this.nav = nav;
        setTimeout(() => {
          console.info("ok");
          nav.setRoot(Home6);
        },3000)
    }
}
