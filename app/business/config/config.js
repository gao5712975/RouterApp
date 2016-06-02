/**
 * Created by moka on 16-5-30.
 */
import {Page} from 'ionic-angular'

@Page({
    templateUrl:'build/business/config/config.html'
})

export class ConfigPage{
    constructor(){
        this.items = [
            {title:"Pokémon Yellow"},
            {title:"Pokémon Yellow"},
            {title:"Pokémon Yellow"}
        ]
    }
    itemSelected(a){
        console.info(a);
    }
}