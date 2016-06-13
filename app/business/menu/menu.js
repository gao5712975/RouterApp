/**
 * Created by moka on 16-5-30.
 */
import {ConfigPage} from '../config/config';
import {ActionSheetPage} from '../actionSheet/actionSheet';
import {WlConfigPage} from '../config/wlConfig';
import {HmdConfig} from '../config/hmdConfig';
import {GzConfig} from '../config/gzConfig';
import {QosConfig} from '../config/qosConfig';
import {Home} from '../home/home';

export class GetMenuPage{

    constructor(){
        this.pages = [];
        this.sysPages = [];
    }

    getMenuPage(){
      this.pages.push(
          {
              page:WlConfigPage,
              index:1,
              title:"网络设置",
              icon: 'ios-globe'
          },
          {
              page:HmdConfig,
              index:2,
              title:"黑名单列表",
              icon:"md-person-add"
          },
          {
              page:GzConfig,
              index:3,
              title:"工作模式",
              icon:"md-apps"
          },
          {
              page:QosConfig,
              index:3,
              title:"QOS限速",
              icon:"md-stopwatch"
          },
          {
              page:ConfigPage,
              index:3,
              title:"访客网络",
              icon:"md-contacts"
          },
          {
              page:GzConfig,
              index:3,
              title:"端口转发",
              icon:"md-repeat"
          },
          {
              page:Home,
              index:3,
              title:"DMZ",
              icon:"contacts"
          }
      );
      return this.pages;
    }

    getSYSMenuPage(){
      this.sysPages.push(
        {
            page:WlConfigPage,
            index:1,
            title:"修改管理密码",
            icon: 'md-unlock'
        },
        {
            page:WlConfigPage,
            index:1,
            title:"运行状态",
            icon: 'md-radio-button-on'
        },
        {
            page:HmdConfig,
            index:2,
            title:"日志记录",
            icon:"md-list-box"
        },
        {
            page:GzConfig,
            index:3,
            title:"固件升级",
            icon:"md-arrow-round-up"
        },
        {
            page:GzConfig,
            index:3,
            title:"重启路由器",
            icon:"power"
        }
      );
      return this.sysPages;
    }
}
