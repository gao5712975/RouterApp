import {Component, ViewChild} from '@angular/core';
import { CACHED_TEMPLATE_PROVIDER ,BROWSER_APP_COMPILER_PROVIDERS} from '@angular/platform-browser-dynamic';
import {ionicBootstrap, Platform, MenuController, Events, Loading, NavController} from 'ionic-angular';
import {StatusBar, Splashscreen, BatteryStatus} from 'ionic-native';

/**
 * 请求拦截器
 */
import {Interceptor} from './interceptor/HttpInterceptor';

/**
 * 模板
 */
import {Home} from './business/home/home';
import {IndexPage} from './business/index/index';
import {GetMenuPage} from './business/menu/menu';

/**
 * 全局变量
 */
import {Global} from './application/global';
/**
 * providers
 */
import {FirstLogin} from './providers/FirstLogin';
/**
 * template
 */
import {ViewOverride} from './injectable/viewOverride';

@Component({
    templateUrl: 'build/app.html',
    queries: {
        nav: new ViewChild('content')
    },
    providers: [FirstLogin],
    viewProviders:[ViewOverride]
})

class RouterApp {

    private rootPage: any;
    private appPages: any;
    private appSysPages: any;
    private nav: any;

    constructor(private platform: Platform, private menu: MenuController, private events: Events,private login:FirstLogin) {
        // Call any initial plugins when ready
        this.initializeApp();
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

            /**
             * 获取WIFI IP；
             */
            Global.setBaseUrl('192.168.1.3');
            /**
             * 监听Ip变化
             */
            this.events.subscribe('global:baseUrl', (res) => {
                console.info(res);
                Global.setBaseUrl(res[0]);
            })
            /**
             * 加载首页
             */
            this.rootPage = IndexPage;
            this.login.firstLogin().then((res: any) => {
                if (res && res.code == 0) {
                    switch (res.inited) {
                        case 0:
                            /**
                             * 默认登陆
                             */
                            this.login.login();
                            this.rootPage = Home;
                            break;
                        case 1:
                            this.login.checkLogin();
                            this.rootPage = IndexPage;
                            break;
                    }
                }
            })

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

ionicBootstrap(RouterApp, [Interceptor], config);
