import {Page,ActionSheet,NavController,Alert} from "ionic-angular"

@Page({
    templateUrl:'build/business/actionSheet/actionSheet.html'
})

export class ActionSheetPage{
    static get parameters(){
        return[
            [NavController]
        ]
    }
    constructor(nav){
        this.nav = nav;
    }
    
    showActionSheet(){
        let actionSheet = ActionSheet.create({
            title: 'Modify your album',
            buttons: [
            {
                text: 'Destructive',
                role: 'destructive',
                handler: () => {
                console.log('Destructive clicked');
                }
            },{
                text: 'Archive',
                handler: () => {
                console.log('Archive clicked');
                }
            },{
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                console.log('Cancel clicked');
                }
            }
            ]
        })
        this.nav.present(actionSheet);
    }
    
    showAlert(){
        let alert = Alert.create({
            title: 'New Friend!',
            subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
            buttons: ['OK']
        })
        this.nav.present(alert);
    }
    
    showAlert1(){
        let alert = Alert.create({
            title: 'Login',
            message: "Enter a name for this new album you're so keen on adding",
            buttons: [
                {
                    text: '取消',
                    handler: data => {
                        console.log('取消 clicked');
                    }
                },
                {
                    text: '确定',
                    handler: data => {
                        console.log('确定 clicked');
                    }
                }
            ]
        })
        this.nav.present(alert);
    }
}