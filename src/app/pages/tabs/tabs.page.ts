import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilityProvider, Response, Combo } from './../../providers/UtilityProvider';
import { NotificationsComponent } from './../../notifications/notifications.component';
import { ToastController, AlertController, PopoverController, NavController} from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})


export class TabsPage implements OnInit {
  isReadyToLogin = false;

  token: string = window.localStorage['token'];
  token_inv: string = window.localStorage['token_inv'];
  usuario: string = window.localStorage['usuario'];
  usuario_id: string = window.localStorage['usuario_id'];
  apiUrl = environment.SERVER_URL;
  idMascota: number = window.localStorage['IdMascota'];
  fotoPerfil: any;
  NombreM: string;
  mascota: string;

  
  constructor(private router: Router,
    private http: HttpClient,
    private util: UtilityProvider,
    public popoverCtrl: PopoverController
    ) {          
  	if(this.token) {
        this.isReadyToLogin = true;    
        this.mascotas(this.usuario_id);
    }else if(this.token_inv){
      this.mascotas(105);
      this.router.navigate(['/animal/search']);
    } else{
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.NombreM=  window.localStorage['Nombre'];
    this.idMascota=  window.localStorage['IdMascota'];
    this.usuario_id = window.localStorage['usuario_id'];

    this.mascotas(this.usuario_id);
  }

  mascotas(id){
    this.http.get(this.apiUrl + 'pets/'+ id)
      .subscribe( data => {                    
      window.localStorage['mascota'] = JSON.stringify(data);
      window.localStorage['IdMascota']= data[0]['Id'];
      window.localStorage['Nombre']= data[0]['Nombre'];
      this.NombreM=  window.localStorage['Nombre'];
      this.idMascota=  window.localStorage['IdMascota'];
      this.mascota= window.localStorage['Nombre'];
      if(data){
        this.fotoPerfil= this.BuscaFotoPerfil(this.idMascota);
      }
    });
  }


  BuscaFotoPerfil(idM){   
    this.http.get(this.apiUrl + 'getPhotos/'+ idM +'/1')
      .subscribe( data => {
        console.log(data);
        if(data['url'] !== undefined){
          window.localStorage['fotoPerfil'] = data['url'];
        }
        else if(data[0].url !== undefined){
          window.localStorage['fotoPerfil'] = data[0].url;
        }
        this.fotoPerfil= window.localStorage['fotoPerfil'];
    });            
  }

  async notifications(ev: any) {
    const popover = await this.popoverCtrl.create({
        component: NotificationsComponent,
        event: ev,
        animated: true,
        showBackdrop: true
    });
    return await popover.present();
  }

 


}
