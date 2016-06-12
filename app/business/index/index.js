/**
 * Created by moka on 16-5-30.
 */
import {Page,NavController,Popover} from 'ionic-angular'
import {PopoverPage} from './popoverPage';

@Page({
    templateUrl:'build/business/index/index.html'
})

export class IndexPage{
    static get parameters(){
      return[
        [NavController]
      ]
    }

    constructor(nav){
      this.nav = nav;
      this.removeHmdBtn = false;
    }

    presentPopover(myEvent) {
      let popover = Popover.create(PopoverPage);
      this.nav.present(popover, {
        ev: myEvent
      });
    }
}
