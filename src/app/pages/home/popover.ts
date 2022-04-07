import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  template: `

      <button >Report</button>
      <button >Copy Share URL</button>
      <button >Turn on Post Notifications</button>
      <button >Share on Messenger</button>

  `
})
export class PopoverComponent {

	constructor( public toastCtrl: ToastController) {}

 /**
   * Presenta un cuadro de mensaje.
   * @param {string} text Mensaje a mostrar.
   */
  async presentToast(text: string) {
    const toast = await this.toastCtrl.create({
      message: 'Notification',
      duration: 3000
    });
    toast.present();
  }
}