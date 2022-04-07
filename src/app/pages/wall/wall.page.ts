import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilityProvider, Response, Combo } from '../../providers/UtilityProvider';
import { environment } from './../../../environments/environment';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.page.html',
  styleUrls: ['./wall.page.scss'],
})
export class WallPage{

  userId: number;
  postForm2: any;
  isReadyToSend2 = false;
 
  apiUrl = environment.SERVER_URL;

  Especie: Combo[];
  data: any;

  constructor(   
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private toastCtrl: ToastController,
    private util: UtilityProvider,
    private route: ActivatedRoute
  ) {
  this.postForm2 = formBuilder.group({
      especie: ['', [Validators.required]]
    });
    this.postForm2.valueChanges.subscribe((v) => {
      this.isReadyToSend2 = this.postForm2.valid;
    });

    this.Buscarespecie();
   
  }

  ionViewDidEnter(){
    this.route.params.subscribe(async (params) => {
      this.userId = params.user_id;
      if (this.userId) {
        console.log(this.userId);
      }
    })
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

  async sendPost2() {
    const query = { especie: this.postForm2.value.especie}
    window.localStorage['id_especie'] = JSON.stringify(query.especie);
    if(this.userId !== null && this.userId !== undefined && this.userId > 0){
      this.router.navigate(['/registro1',this.userId]);
    }else{
      this.router.navigate(['/registro1']);
    }
    
  }

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
    }, 2000);
  }
  
}
 