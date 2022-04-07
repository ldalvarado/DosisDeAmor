import { Component, OnInit,Input, EventEmitter, Output } from '@angular/core';
import { User, Post, StorageService, ApiService } from './../../providers/providers';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
@Component({
  selector: 'app-interacciones',
  templateUrl: './interacciones.component.html',
  styleUrls: ['./interacciones.component.scss'],
})
export class InteraccionesComponent implements OnInit {

	idMascota: number = window.localStorage['IdMascota'];
	chekeche = false;
	@Input()likes = 1;
	@Input()melike : any;
	@Input()source = '';
  	@Input()source_id = 1;
  	apiUrl = environment.SERVER_URL;

	constructor(
		private api: ApiService,
		private http: HttpClient,
	) { }

	ngOnInit() {
		this.chekeche = this.melike;
	}

	topersian(elm: any){
		var headers = new HttpHeaders();
      	const request = ({ headers: headers });
		const query = {
          mascota_reac_id: this.idMascota,
          publica_id: this.source_id,
        }
        this.http.post(this.apiUrl + 'reaccionesPublicaciones',query,request)
          .subscribe( data => {
          	if(data['status'] === 'success'){
          		if(this.chekeche === true){
          			this.likes++;
          		}else{
          			this.likes--;
          		}
          	}else{
          		this.chekeche = !this.chekeche;
          	}
         });
		/*let value: string = elm.target.value.trim();
		let last: string = elm.data;
		console.log(value);*/
	}

}
