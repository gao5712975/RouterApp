/**
 * Created by moka on 16-5-26.
 */
import {Page} from 'ionic-angular';

@Page({
    templateUrl: 'build/business/home/home.html'
})
export class Home {
    constructor() {
        this.pepperoni = false;
        this.sausage = false;
        this.mushrooms = false;
    }
}