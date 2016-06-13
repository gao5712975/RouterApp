import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({
  name: "switchName"
})
export class SwitchName {
  static get parameters() {
    return []
  }
  constructor() {

  }

  transform(value, args) {
    switch (value) {
      case 'pppoe':
        return 'PPPOE';
        break;
      case 'static':
        return '静态IP';
        break;
      case 'dhcp':
        return '动态IP';
        break;
      default:
        return value;
    }
  }
}
