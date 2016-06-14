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
            // title: 'Login',
            message: `<div style="font-size: 1.8rem;color: #000;padding-top: 5rem;height: 10rem;">确认删除该规则？</div>`,
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
            ],
            enableBackdropDismiss:true
        })
        this.nav.present(alert);
    }

    showAlert3(){
        let alert = Alert.create({
            message: `<div><img src="../../build/static/img/config/wf-await.gif" /></div>`
        })
        this.nav.present(alert);
    }

    showActionSheet1(){
        let actionSheet = ActionSheet.create({
          title:`<ion-list>

  <ion-item>
    <ion-label fixed>Username</ion-label>
    <ion-input type="text" value=""></ion-input>
  </ion-item>

  <ion-item>
    <ion-label fixed>Password</ion-label>
    <ion-input type="password"></ion-input>
  </ion-item>

</ion-list>`,
          buttons:[
                  {
              text: '取消',
              handler: () => {
                console.log('Destructive clicked');
              }
            },{
              text: '确认',
              handler: () => {
                console.log('Archive clicked');
              }
            }
          ]
        })
        this.nav.present(actionSheet);
    }

    presentLoading() {
  let loading = Loading.create({
    content: "Please wait...",
    duration: 3000
  });
  this.nav.present(loading);
}
}
