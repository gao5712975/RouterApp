import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Events, Loading, NavController} from 'ionic-angular';
import {StatusBar, Splashscreen, BatteryStatus} from 'ionic-native';

import {IndexPage} from './business/index/index';
import {GetMenuPage} from './business/menu/menu';

@Component({
    templateUrl: 'build/app.html',
    queries: {
        nav: new ViewChild('content')
    }
})

class RouterApp {

    private rootPage: any;
    private appPages: any;
    private appSysPages: any;
    private nav: any;

    constructor(private platform: Platform, private menu: MenuController, private events: Events) {
        // Call any initial plugins when ready
        this.initializeApp();
        this.rootPage = IndexPage;

        //获取菜单
        this.appPages = new GetMenuPage().getMenuPage();
        this.appSysPages = new GetMenuPage().getSYSMenuPage();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // StatusBar.styleDefault 状态栏默认样式，也就是电池信号黑色；
            // StatusBar.styleLightContent 状态栏内容浅色，貌似就是白色，适合深色背景；
            // StatusBar.styleBlackTranslucent 状态栏黑色半透明，我测了下，跟上面一样的效果，电池时间都是白色的，适合深色背景；
            // StatusBar.styleBlackOpaque 状态栏黑色不透明。我测了下，还是白色的，跟上面一样，适合深色背景；
            // StatusBar.hide 状态栏隐藏；
            // StatusBar.show 状态栏显示；
            // Here you can do any higher level native things you might need.
            Splashscreen.hide();
            StatusBar.styleBlackOpaque();
        });
    }

    openPage(p) {
        // this.presentLoadingDefault();
        this.nav.push(p);
        this.menu.close()
    }

    /**
     * 菜单跳转 请求数据 显示遮罩层
     * @return {[type]} [description]
     */
    presentLoadingDefault() {
        let loading = Loading.create({
            spinner: "ios",
            cssClass: "menu-box"
        });

        this.nav.present(loading);
        this.events.subscribe('loading:close', () => {
            loading.dismiss();
        })
    }

	/**
     * 关闭菜单
     * @return {[type]} [description]
     */
    closeMenu() {
        this.menu.close();
    }
}

/**
 * ionic config
 */
let config = {
    // tabbarPlacement: "bottom",
    mode: "md",
    // iconMode: 'ios'
    // modalEnter: 'modal-slide-in',
    // modalLeave: 'modal-slide-out'
}

ionicBootstrap(RouterApp, [], config);
