import {Page,ViewController} from 'ionic-angular';

@Page({
  template: `
    123456
  `
})
class PopoverPage {
  static get parameters(){
    return[
      [ViewController]
    ]
  }
  constructor(viewCtrl) {
    this.viewCtrl = viewCtrl;
  }
  close() {
    this.viewCtrl.dismiss();
  }
}
