import { Component, OnInit } from '@angular/core';
import { ApiService, UserContact, CatEmail, CatPhone } from './../../providers/providers';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-sugerencias',
  templateUrl: 'sugerencias.html',
  styleUrls: ['sugerencias.component.scss']
})
export class Sugerencias {
  Sugerencia: any;
  usuario_id = window.localStorage['usuario_id'];
   apiUrl = environment.SERVER_URL;
  constructor(
    private api: ApiService,
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private toastCtrl: ToastController,
    private translate: TranslateService,
    private http: HttpClient
  ) {
  }

  ionViewWillEnter() {
    
    this.TodasSugerencias(this.usuario_id);
  }
 
  TodasSugerencias(id){
    this.http.get(this.apiUrl + 'allSuggestions/'+id)
            .subscribe( data => {
              this.Sugerencia= data['data'];
               //console.log(this.Sugerencia.foto_perfil);
            });
  }

  /**
   * Cierra el modal.
   */
  dismiss(result = []): void {
    this.modalCtrl.dismiss(result);
  }
}
