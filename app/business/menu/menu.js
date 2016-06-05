/**
 * Created by moka on 16-5-30.
 */
import {IndexPage} from '../index/index'
import {ConfigPage} from '../config/config'
import {ActionSheetPage} from '../actionSheet/actionSheet'

export class GetMenuPage{

    constructor(){
        this.pages = [];
    }

    getMenuPage(){
      this.pages.push(
          {
              page:IndexPage,
              index:0,
              title:"工作模式",
              icon: 'calendar'
          },
          {
              page:ConfigPage,
              index:1,
              title:"网络设置",
              icon: 'contacts'
          },
          {
              page:ActionSheetPage,
              index:2,
              title:"ActionSheetPage",
              icon:"contacts"
          }
      )
      return this.pages;
    }
}
