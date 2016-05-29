/**
 * Created by moka on 16-5-25. 入口文件
 */
import {App, Platform} from 'ionic-angular';
// import {StatusBar} from 'ionic-native';
import {Home} from './business/home/home'

@App({
    template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class RouterApp {
    static get parameters() {
        return [[Platform]];
    }

    constructor(platform) {
        this.rootPage = Home;
        
        // platform.ready().then(() => {
        //     // Okay, so the platform is ready and our plugins are available.
        //     // Here you can do any higher level native things you might need.
        //     StatusBar.styleDefault();
        // });
    }
}
