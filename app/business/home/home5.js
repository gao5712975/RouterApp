/**
 * Created by moka on 16-5-26.
 */
import {Page,NavController} from 'ionic-angular'
import {IndexPage} from '../index/index'

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
    }

    goToIndexPage(){
        this.nav.setRoot(IndexPage);
    }    
}