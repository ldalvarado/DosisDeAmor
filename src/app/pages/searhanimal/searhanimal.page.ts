import { Component, ViewChild, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { ToastController} from '@ionic/angular';
import { UtilityProvider, Response, Combo } from './../../providers/UtilityProvider';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-searhanimal',
  templateUrl: './searhanimal.page.html',
  styleUrls: ['./searhanimal.page.scss'],
})
export class SearhanimalPage {

  Especie: Combo[];
  Raza: Combo[];
  Gender: Combo[];
  Situacion: Combo[];
  IdEspecie: number= null;
  postForm: any;
  fotoPerfil: any;
  nombre: string
  galeria: any = [];
  id: number;
  lastPage = 1;

  @ViewChild("IdEspecie", {static: false}) selectEspecie: Combo;
  apiUrl = environment.SERVER_URL;

	constructor(private translate: TranslateService, formBuilder: FormBuilder,
              private http: HttpClient,
              private toastCtrl: ToastController,
              private util: UtilityProvider) { 
                 this.postForm = formBuilder.group({
                    RazaC: [null, Validators.nullValidator],
                    GenderC: [null, Validators.nullValidator],
                    EstatusC: [null, Validators.nullValidator],
                    EspecieC: [null, Validators.nullValidator],
                    id: [null, Validators.nullValidator],
                 });
  }

	ionViewDidEnter() {
    this.Buscarespecie();
    this.BuscarGender();
    this.BuscarSituacion();
    this.sendsearch();
	}

Buscarespecie() {

  this.Especie = [];

  this.util.GetEspecie().subscribe(
    (data: Response) => {
      
      if (data) {
        this.Especie = this.util.LlenarCombo(JSON.stringify(data));
      } else {
        this.presentToast(data['message']);
      }
    }
  );
} 

BuscarRaza() {

  this.Raza = [];

  this.util.GetRaza(this.IdEspecie).subscribe(
    (data: Response) => {
      console.log(JSON.stringify(data));
      if (data) {
        this.Raza = this.util.LlenarCombo(JSON.stringify(data));
      } else {
        this.presentToast(data['message']);
      }
    }
  );
}

limpiar(){
  this.postForm.patchValue({
    RazaC:null,
    GenderC:null,
    EstatusC:null,
    EspecieC:null
  });
}

BuscarGender() {

  this.Gender = [];

  this.util.GetGender().subscribe(
    (data: Response) => {
      if (data) {
        this.Gender = this.util.LlenarCombo(JSON.stringify(data));
      } else {
        this.presentToast(data['message']);
      }
    }
  );
} 

BuscarSituacion() {

  this.Situacion = [];

  this.util.GetSituacion().subscribe(
    (data: Response) => {
      if (data) {
        this.Situacion = this.util.LlenarCombo(JSON.stringify(data));
      } else {
        this.presentToast(data['message']);
      }
    }
  );
} 

CerrarEspecie(val: number) {
    this.IdEspecie = val;
    this.BuscarRaza();
  }

  async sendsearch(page: number = 1) {
    //this.fecha= format(this.postForm.value.edadM, 'yyyy-MM-dd');
    this.lastPage = page;
    var headers = new HttpHeaders();
    const request = ({ headers: headers });
    const query = {
      id_estado: this.postForm.value.EstatusC,
      id_raza: this.postForm.value.RazaC,
      id_genero: this.postForm.value.GenderC,
      id_especie: this.IdEspecie,
    };
    
    const post = await this.http.post(this.apiUrl + `searchpet`+`?page=${page}`+`&json=`+JSON.stringify(query), JSON.stringify(query), request )
      .subscribe( data => {
        //console.log(data['data'], 'estoy en data');
        if (page === 1) {
          this.fotoPerfil = data['data'];
          /*this.fotoPerfil.forEach(element => { 
               this.galeria.push(element.ultimas_fotos);
          //console.log(this.galeria);
          });*/
          this.galeria = [];
          for(let i=0;i<this.fotoPerfil.length;i++){
            this.galeria.push(this.fotoPerfil[i].ultimas_fotos);
          }  
        }else{
          data['data'].map(posts => {
              this.fotoPerfil.push(posts);
          });
        }
    });
  }

   /**
   * Presenta un cuadro de mensaje.
   * @param {string} text Mensaje a mostrar.
   */
  async presentToast(text: string) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });
    await toast.present();
  }
   /**
   * Refresca la página.
   * @param event
   */
 doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
      this.lastPage = 1;
      this.sendsearch(this.lastPage).then(() => {
        event.target.complete();
      });
    }, 2000);
  }

  /**
   * Llama a la función para cargar mas elementos cuando la página llega al final.
   * @param infiniteScroll
   */
  doScrollDown(infiniteScroll) {
    this.sendsearch(this.lastPage + 1).then((success) => {
      infiniteScroll.target.complete();
    });
  }

}
