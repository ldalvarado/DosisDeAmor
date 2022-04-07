import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificationsComponent } from './../../notifications/notifications.component';
import { ToastController, AlertController, PopoverController, NavController} from '@ionic/angular';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

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
	) {
		this.datosPerfil(this.idMascota);
	}
	
	ngOnInit() {
	}
  
	ionViewWillEnter() {
		this.route.params.subscribe(async (params) => {
  			if (!params.pet_id) {
			  	this.idMascota=  window.localStorage['IdMascota'];
			  	this.fotoPerfil = window.localStorage['fotoPerfil'];
			  	this.datosPerfil(this.idMascota);
			  	this.datosGaleria(this.idMascota);
			}else{
				//this.idMascotaNoPreferencial = params.pet_id;
				this.idMascota=  params.pet_id;
			  	this.fotoPerfil = window.localStorage['fotoPerfil'];
			  	this.datosPerfil(params.pet_id);
			  	this.datosGaleria(params.pet_id);
			  	this.BuscaFotoPerfil(params.pet_id);
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
        	console.log(data)
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

	routerUpdate(){
		this.router.navigate(['/registro1',this.idMascota]);
	}

	goToAccount(valor) {
		/*switch(valor) {
		  case 1:
		    this.expandedEspecie = true;
			this.expandedEstatus = false;
			this.expandedSexo = false;
		    break;
		  case 2:
		    this.expandedEspecie = false;
			this.expandedEstatus = true;
			this.expandedSexo = false;
		    break;
		  case 3:
		    this.expandedEspecie = false;
			this.expandedEstatus = false;
			this.expandedSexo = true;
		    break;
		  default:
		    this.expandedEspecie = true;
			this.expandedEstatus = false;
			this.expandedSexo = false;
			break;
		}*/

  	}

   /**
   * Refresca la página.
   * @param event
   */
   async notifications(ev: any) {
	    const popover = await this.popoverCtrl.create({
	        component: NotificationsComponent,
	        event: ev,
	        animated: true,
	        showBackdrop: true
	    });
	    return await popover.present();
	}
	doRefresh(event) {
		setTimeout(() => {
		  event.target.complete();
		}, 2000);
	}	

}
