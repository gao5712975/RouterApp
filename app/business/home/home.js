/**
 * Created by moka on 16-5-26.
 */
import {Page,NavController} from 'ionic-angular'
import {StatusBar} from 'ionic-native';
import {Home1} from './home1'

@Page({
    templateUrl: 'build/business/home/home.html'
})

export class Home{
    static get parameters() {
        return [
            [NavController]
        ];
    }
    
    constructor(nav){
        this.nav = nav;
        // styleDefault()
        // Use the default statusbar (dark text, for light backgrounds).
        //
        // styleLightContent()
        // Use the lightContent statusbar (light text, for dark backgrounds).
        //
        // styleBlackTranslucent()
        // Use the blackTranslucent statusbar (light text, for dark backgrounds).
        //
        // styleBlackOpaque()
        // Use the blackOpaque statusbar (light text, for dark backgrounds).
        //
        // backgroundColorByName(colorName)
        
    }
    
    goToHome1(){
        this.nav.push(Home1)
    }
    
}