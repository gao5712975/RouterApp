import {Pipe,PipeTransform} from '@angular/core';

@Pipe({
  name: "switchName"
})
export class SwitchName implements PipeTransform{
 
  constructor() {

  }
/**
 * key 转换为 value
 * @param  {[type]} value [description]
 * @param  {[type]} args  [description]
 * @return {[type]}       [description]
 */
  transform(value, args) {

    if(args == 'lwConfig'){
      switch (value) {
        case 'pppoe':
          return 'PPPOE';
        case 'static':
          return '静态IP';
        case 'dhcp':
          return '动态IP';
        default:
          return value;
      }
    }

    if(args == 'wlConfig'){
      switch (value) {
        case 'none':
          return '不加密';
        case 'psk-mixed':
          return 'WPA2-PSK';
        case 'psk2':
          return 'WPA-PSK';
        case 0:
          return '自动';
        case 100:
          return '强';
        case 70:
          return '中';
        case 40:
          return '弱';
        default:
          return value;
      }
    }
    if(args == 'qosConfig'){
      if(Number(value)>=1024){
        return  `${Math.floor(Number(value)/1024*100)/100}M/S`;
      }else if(Number(value) == 0){
        return `不限速`;
      }else{
        return `${value}KB/S`;
      }
    }
    return value;
  }
}
