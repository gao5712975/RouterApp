import {View,Injectable,ViewMetadata,Reflector,Type} from '@angular/core';
import {ViewResolver} from '@angular/compiler';

@Injectable()
export class ViewOverride extends ViewResolver{
  static get parameters(){
    return [
      [ViewMetadata],[Reflector]
    ];
  }
  constructor(reflector,viewMetadata) {
    super(reflector,viewMetadata);
  }

  resolve(component){
    let annotations = this.reflector.annotations(component);
    console.info(annotations);

    return super.resolve(component)
  }

}
