import { Component, OnInit } from '@angular/core';
import { ApiService, UserContact, CatEmail, CatPhone } from './../../providers/providers';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { UtilityProvider, Response, Combo } from '../../providers/UtilityProvider';

@Component({
  selector: 'app-busca_pais',
  templateUrl: 'busca_pais.html',
  styleUrls: ['busca_pais.component.scss']
})
export class Busca_pais {
  Codigo: any;
  constructor(
    private api: ApiService,
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private toastCtrl: ToastController,
    private translate: TranslateService,
     private util: UtilityProvider
  ) {
  }

  ionViewWillEnter() {
    
    this.BuscarCodigos();
  }
 
  BuscarCodigos() {    
  
      this.util.GetCombo().subscribe(
        (data) => {
           //console.log(JSON.stringify(data));
          if (data) {
            this.Codigo = JSON.stringify(data);
            console.log(this.Codigo);
          }    
        }
      );
    } 

  /**
   * Cierra el modal.
   */
  dismiss(result = []): void {
    this.modalCtrl.dismiss(result);
  }
}
