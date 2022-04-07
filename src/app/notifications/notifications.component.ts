import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PopoverController} from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})

export class NotificationsComponent implements OnInit {

apiUrl = environment.SERVER_URL;
usuario_id: string = window.localStorage['usuario_id'];
perfil: any; 

  constructor(private http: HttpClient,
              private router: Router,
               public popoverCtrl: PopoverController
  			) {
  		
  		this.CargaPerfil(this.usuario_id);
   }
  ngOnInit() {}

	CargaPerfil(id){
	  this.http.get(this.apiUrl + 'pets/'+ id)
  		.subscribe( data => {  
  			this.perfil= data;  
  			         console.log(this.perfil);   
  		});
	}

  perfilMascota(value){
    this.popoverCtrl.dismiss();
    this.router.navigate(['/animal/perfil',value.Id]);
  }

  async DismissClick() {
    this.popoverCtrl.dismiss();
  }

   /*Perfil(idP){
      window.localStorage['IdMascota'] =idP;
      this.router.navigate(['/animal/perfil']);
   }*/

}
