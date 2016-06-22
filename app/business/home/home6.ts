/**
 * Created by moka on 16-5-26.
 */
import {Page, NavController, NavParams} from 'ionic-angular'
import {IndexPage} from '../index/index'

@Page({
    templateUrl: 'build/business/home/home6.html'
})

export class Home6 {
    /**
     * 默认值
     */
    private data: any = this.navParams.data;

    constructor(private nav: NavController, private navParams: NavParams) {
        this.data = this.navParams.data;
    }

    goToIndexPage() {
        this.nav.setRoot(IndexPage);
    }
}
