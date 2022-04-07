import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

/*
  Generated class for the UtilityProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export interface Response {
  Success: boolean;
  Id: number;
  Mensaje: string;
  Json: any;
}

export interface Combo {
  Id: number;
  Texto: string;
}
@Injectable({providedIn: 'root'})

export class UtilityProvider {
 
  id_especie: string = window.localStorage['id_especie'];
  idMascota: number;
  mascota: string;
  NombreM: string;
  foto: any;
  fotoPerfil: any;
  usuario_id: string ;
  url: string= environment.SERVER_URL;

  constructor(
    public alertCtrl: AlertController,
    public api: HttpClient
    ) { }
 GetCombo(): Observable<any> {

    let url = this.url + "phonecodes/es";
    let params = 'es';
    return this.api.get(url);
  } 

  GetEspecie(): Observable<any> {

    let url = this.url + "specie/es";
    let params = 'es';
    return this.api.get(url);
  } 

  GetRaza(id): Observable<any> {
    let url = this.url + "razas/"+ id;
    let params = { lang: "es", idE: 0  };
    return this.api.get(url);
  } 

   GetGender(): Observable<any> {

    let url = this.url + "petgender/es";
    let params = 'es';
    return this.api.get(url);
  } 

   GetSituacion(): Observable<any> {

    let url = this.url + "petstates/es";
    let params = 'es';
    return this.api.get(url);
  } 

  LlenarCombo(Data: any): Combo[] {
    let combo: Combo[] = [];
    
    JSON.parse(Data).forEach(element => {
    	//console.log(element);
      combo.push({
       Id: element.Id,
        Texto: element.Nombre
      });
    });

    return combo;
  }

  LlenarArreglo(Data: any): Combo[] {
    let combo: any[];
    
    JSON.parse(Data).forEach(element => {
      combo.push({
        Id: element.Id,
        Texto: element.Texto
      });
    });
    
    return combo;
  }

 /* AlertpopUp(title: string, msg: string){
    const alert: Alert = this.alertCtrl.create({
      title: title,
      message: msg,
      buttons:  ['Ok']
    });
    alert.present();
  }*/

  ObtenerEncabezados(data: Array<any>): Array<any>{
    let json = data.length > 0 ? data[0] : [];
    let array = [];

    for (let key in json) {
      array.push(key);
    }

    return array;
  }

  ValidaString(value: string): boolean {
    if (value && value.trim().length > 0) {
      return true;
    } else {
      return false;
    }
  }

  ValidaNumero(value: number): boolean {
    if (value && !isNaN(value)) {
      return true;
    } else {
      return false
    }
  }

  ValidaCorreo(value: string): boolean {
    if (this.ValidaString(value)) {
      let regex1 = /^[a-zA-Z0-9@\*._-]*$/;
      let regex3 = /^[a-zA-Z]*$/;
      
      if(regex1.test(value)) {
        let pos = value.indexOf("@");
        if (pos > 0) {
          let value2 = value.substring(pos + 1,value.length);
          let pos2 = value2.indexOf(".");
          if (pos2 > 0) {
            let dominio = value.substring((pos + pos2) + 2,value.length);
            return dominio.length > 0 && regex3.test(dominio);  
          } else {
            return false
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  CampoAlfaNumerico(elm: any) {
    let regex = /^[a-zA-Z0-9 ]*$/;
    let value = elm.value;
    if(!regex.test(value)) {
      value = value.substring(0,value.length - 1);
    }

    elm.value = value;
  }

  CampoNumerico(elm: any) {
    let regex = /^[0-9]*$/;
    let value = elm.value;
    if(!regex.test(value)) {
      value = value.substring(0,value.length - 1);
    }

    elm.value = value;
  }

  CampoAlfaNumericoCont(elm: any) {
    let regex = /^[a-zA-Z0-9]*$/;
    let value = elm.value;
    if(!regex.test(value)) {
      value = value.substring(0,value.length - 1);
    }

    elm.value = value;
  }

  CampoLetras(elm: any) {
    let regex = /^[a-zA-Z ]*$/;
    let value = elm.value;
    if(!regex.test(value)) {
      value = value.substring(0,value.length - 1);
    }

    elm.value = value;
  }

  CampoUsuario(elm: any) {
    let regex = /^[a-zA-Z0-9\*._-]*$/;
    let value = elm.value;
    if(!regex.test(value)) {
      value = value.substring(0,value.length - 1);
    }

    elm.value = value;
  }

   CampoPassword(elm: any) {
    let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/;
    let value = elm.value;
    if(!regex.test(value)) {
      value = value.substring(0,value.length - 1);
    }

    elm.value = value;
  }

  CampoCorreo(elm: any) {
    let regex = /^[a-zA-Z0-9@\*._-]*$/;
    let value = elm.value;
    if(!regex.test(value)) {
      value = value.substring(0,value.length - 1);
    }

    elm.value = value;
  }

  private FormatoDecimal(num:string, dec: string): string {

    if (dec == "," && num.toString().indexOf(",") >= 0) {
        num = num.toString().replace(/\./g,"");
        num = num.toString().replace(",",".");
    } 

    let res = parseFloat(num).toFixed(2);

    return res;
  }

  private FormatoNumerico(num:string, dec: string): string {
    num = this.FormatoDecimal(num, dec);
    
    if (dec == ",") {
      let res = num.toString().replace('.',',');
      num = res.replace(/\d(?=(\d{3})+\,)/g, '$&\.');  
    } else {
      num = num.replace(/\d(?=(\d{3})+\.)/g, '$&\,');
    }

    return num;
  }

  CampoDecimal(elm: any, dec: string) {
    console.log(elm);
    let regex = /^[0-9.]*$/;
    let value: string = elm.value.trim();

    let array = value.split(".");

    if (!regex.test(value)) {
      value = value.substring(0,value.length - 1);
    } else if (value.trim().length == 0) {
      elm.value = value;
    } else if (value.indexOf(".") == 0) {
      value = value.substring(0,value.length - 1);
    } else if (array.length > 2) {
      value = value.substring(0,value.length - 1);
    }    

    elm.value = value;
  }

  CampoTelefono(elm: any) {
    let regex = /^[0-9]*$/;
    let value: string = elm.target.value.trim();
    let last: string = elm.data;

    if (value.length < 4 && last != null && last.trim().length > 0) {
      value = regex.test(value) ? value : value.substring(0,value.length - 1);
    } else if (value.length == 4 && last != null && last.trim().length > 0) {
      value = value.indexOf("-") >= 0 ? value : value.substring(0,3) + "-" + last;
    } else if (value.length > 4 && last != null && last.trim().length > 0) {
      let value2 = value.substring(4, value.length);
      value = regex.test(value2) ? value : value.substring(0,value.length - 1);
    }

    elm.target.value = value;
  }

  extractData(res: any) {
    //convert the response to JSON format
    let body = res.json();
    console.log(body);
    //Return the data (or nothing);
    return body || {};
  }

}