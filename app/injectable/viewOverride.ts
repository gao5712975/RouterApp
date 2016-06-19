import {Injectable, ViewMetadata, Type, ComponentMetadata} from '@angular/core';
import {ViewResolver} from '@angular/compiler';
import {ReflectorReader, Reflector} from '@angular/compiler/core_private'

const SCRIPT_TYPE_NAME = 'text/ng-template';

@Injectable()
export class ViewOverride extends ViewResolver {
    constructor(private reflector: Reflector) {
        super(reflector)
    }
    resolve(component: Type): ViewMetadata {
        let annotations = this.reflector.annotations(component);
        console.info(annotations);
        annotations.forEach(cm => {
            if (cm instanceof ComponentMetadata && cm.templateUrl && typeof cm.templateUrl == 'string') {
                let elemTpl = (<any>document).getElementById(cm.templateUrl);
                if (elemTpl && elemTpl.getAttribute('type') == SCRIPT_TYPE_NAME) {
                    cm.template = "elemTpl.innerHTML";
                    elemTpl.remove();
                    cm.templateUrl = undefined
                }
                else
                    throw new Error(`template "${cm.templateUrl}" not found among html scripts`)
            }
        })
        return super.resolve(component);
    };
}