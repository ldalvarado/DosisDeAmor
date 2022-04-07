import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificationsComponent } from './../../notifications/notifications.component';
import { ToastController, AlertController, PopoverController, NavController} from '@ionic/angular';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-pet',
  templateUrl: './profile-pet.page.html',
  styleUrls: ['./profile-pet.page.scss'],
})
export class ProfilePetPage implements OnInit {

	fotoPerfil= window.localStorage['fotoPerfil'];
	idMascota =  window.localStorage['IdMascota'];
	token: string = window.localStorage['token'];
	apiUrl = environment.SERVER_URL;
	idMascotaNoPreferencial:number;
	especie:string;
	nombre:string;
	raza:string;
	pais:string;
	ciudad:string;
	estado:string;
	edad:string;
	genero:string;
	galeria: any;

	constructor(
		private translate: TranslateService,
		private router: Router,
		private http: HttpClient,
		public popoverCtrl: PopoverController,
		private route: ActivatedRoute
	) { }

	ngOnInit() {
	}

	ionViewWillEnter() {
		this.route.params.subscribe(async (params) => {
  			if (!params.pet_id) {
			  	this.router.navigate(['/animal/home']);
			}else{
				//this.idMascotaNoPreferencial = params.pet_id;
				this.idMascota=  params.pet_id;
			  	this.fotoPerfil = window.localStorage['fotoPerfil'];
			  	this.datosPerfil(params.pet_id);
			  	this.BuscaFotoPerfil(params.pet_id);
			  	this.datosGaleria(params.pet_id);
			}
	  	})
	}

	datosGaleria(idM){
		this.http.get(this.apiUrl + 'allphotospet/'+ idM)
        .subscribe( data => {
        	if(data['status'] == 'success'){
        		this.galeria = data['data'];
        	}
        })
		
	}

	datosPerfil(idM){    
    	this.http.get(this.apiUrl + 'petprofile/'+ idM)
        .subscribe( data => {        
        	this.especie= data['especie'];
        	this.nombre= data['nombre'];
        	this.raza= data['raza'];
        	this.pais= this.SinDatos(data['pais']);
        	this.ciudad= this.SinDatos(data['ciudad']);
        	this.estado= data['estado'];
        	this.edad= data['edad'];
        	this.genero= data['genero'];
        	//this.galeria= data['fotos'].original;
        });
	}

	BuscaFotoPerfil(idM){   
	    this.http.get(this.apiUrl + 'getPhotos/'+ idM +'/1')
	      .subscribe( data => {
	        this.fotoPerfil = data[0].url;
	    });            
	}

	SinDatos(valor){
		if(valor !== null && valor !== ''){
			return valor;
		}else{
			return 'Sin datos';
		}
	}

	Mayusculas(Valor){
		if(Valor !== undefined){
			return Valor.charAt(0).toUpperCase() + Valor.slice(1);
		}
		return Valor
	}

	doRefresh(event) {
		setTimeout(() => {
		  event.target.complete();
		}, 2000);
	}
}
