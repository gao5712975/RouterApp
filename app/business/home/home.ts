/**
 * Created by moka on 16-5-26.
 */
import {Page, NavController} from 'ionic-angular'
import {StatusBar} from 'ionic-native';
import {Home1} from './home1'

@Page({
    templateUrl: 'build/business/home/home.html'
})

export class Home {

    constructor(private nav: NavController) {

    }

    goToHome1() {
        this.nav.push(Home1)
    }
}
