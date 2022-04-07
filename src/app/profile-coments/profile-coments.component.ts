import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-profile-coments',
  templateUrl: './profile-coments.component.html',
  styleUrls: ['./profile-coments.component.scss'],
})
export class ProfileComentsComponent implements OnInit {
	apiUrl = environment.SERVER_URL;
	usuario_id: string = window.localStorage['usuario_id'];
	perfil: any; 

  	constructor(private http: HttpClient,public popoverCtrl: PopoverController) {
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

	async DismissClick() {
    	this.popoverCtrl.dismiss();
  	}

}
