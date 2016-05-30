/**
 * Created by moka on 16-5-25. 入口文件
 */
import {App, Platform,MenuController} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {Home} from './business/home/home';
import {GetMenuPage} from './business/menu/menu'
import {ViewChild} from '@angular/core';

@App({
    templateUrl: 'build/app.html',
    queries: {
        nav: new ViewChild('content')
    }
})
class RouterApp {
    static get parameters() {
        return [
            [Platform,MenuController]
        ];
    }

    constructor(platform,menu) {
        this.root = Home;
        this.menu = menu;

        // Call any initial plugins when ready
        platform.ready().then(() => {
            StatusBar.styleDefault();
            Splashscreen.hide();
        });

        this.appPages = new GetMenuPage().pages;
    }

    openPage(p){
        this.nav.setRoot(p)
    }
}
