import { environment } from './../../../environments/environment';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, NgForm, } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { StorageService, User, Sesion, } from '../../providers/providers';
import { ValidationService } from '../../shared/directives/validation.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilityProvider, Response, Combo } from '../../providers/UtilityProvider';
import { ModalController } from '@ionic/angular';
import { Busca_pais } from './../../modals/paises-busqueda/busca_pais.component';

/**
 * Proporciona la vista para un formulario de Registro de usuario.
 * @author CloudSolutions CA 
 */

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.page.html',
  styleUrls: ['signup.page.scss']
})
export class SignupPage {

  progress = {
    type: 'determinate',
    value: 0
  };
  isPrimary = false;
  isPrimaryRe = false;
  apiUrl = environment.SERVER_URL;

  Codigos: Combo[];
  data: any;
  isReadyToSend = false;
  Aceptado = false;
  signupForm: FormGroup;
  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private storage: StorageService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    public util: UtilityProvider,
    public modalController: ModalController
  ) {
    this.signupForm = formBuilder.group({
     contrasena: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(60), ValidationService.passwordValidator]],
     password_d: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(60), ValidationService.passwordValidator]],
     habilitado: ['1', [Validators.required]],
     Terminos: [false, [Validators.required]],
      id_perfil: ['1', [Validators.required]],
      telefono_cod_pais: ['+52', [Validators.required]],
      telefono_num: ['', [Validators.nullValidator, Validators.maxLength(60),]],
      correo: ['', [Validators.required, ValidationService.emailValidator]],
      correo_alt: ['', [Validators.nullValidator, ValidationService.emailValidator]],
      verificado: ['1', [Validators]],
      usuario: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(60)]],
      ap_paterno: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(80)]],
      ap_materno: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(80)]],
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
      latitud: ['24.0308556', [Validators]],
      logitud: ['-104.6704692', [Validators]]
    });
    this.signupForm.valueChanges.subscribe((v) => {
      this.isReadyToSend = this.signupForm.valid;
      this.Aceptado = !this.signupForm.value.Terminos;
    });
  }
  /**
   * Envía la información del usuario al servidor.
   */
ionViewWillEnter() {
       this.BuscarCodigos();
  }

  BuscarCodigos() {

      this.Codigos = [];
  
      this.util.GetCombo().subscribe(
        (data: Response) => {
          //console.log(JSON.stringify(data));
          if (data) {
            this.Codigos = this.util.LlenarCombo(JSON.stringify(data));
          } else {
            this.presentToast(data['message']);
          }
        }
      );
    } 

async doSignup() {
  var headers = new HttpHeaders();
  const request = ({ headers: headers });
  const query = {
    nombre: this.signupForm.value.nombre,
    ap_paterno: this.signupForm.value.ap_paterno,
    ap_materno: this.signupForm.value.ap_materno,
    contrasena: this.signupForm.value.contrasena,
    habilitado: this.signupForm.value.habilitado,
    telefono_cod_pais: this.signupForm.value.telefono_cod_pais,
    telefono_num: this.signupForm.value.telefono_num,
    correo: this.signupForm.value.correo,
    correo_alt: this.signupForm.value.correo_alt,
    id_perfil: this.signupForm.value.id_perfil,
    verificado: this.signupForm.value.verificado,
    usuario: this.signupForm.value.usuario,
    latitud: this.signupForm.value.latitud,
    logitud: this.signupForm.value.logitud
  };
 //console.log(query);
  if (this.signupForm.value.contrasena !== this.signupForm.value.password_d) {
    this.presentToast(this.translate.instant('FORM.PASSWORD_NOT_MATCH'));
  } else {
    this.progress.type = 'indeterminate';
    this.http.post(this.apiUrl + 'registrar'+'?json='+JSON.stringify(query), JSON.stringify(query), request )
      .subscribe( data => {
      window.localStorage['usuario_id'] = JSON.stringify(data['idUsuario']);
      
      if (data['status'] != "error") {
        const loginR ={
          correo: query.correo,
          contrasena: query.contrasena
        };
        this.http.post(this.apiUrl + 'login'+'?json='+JSON.stringify(loginR), JSON.stringify(loginR), request )
        .subscribe( dataL => {
          if (dataL['token']) {
            window.localStorage['token'] = dataL['token'];
            window.localStorage['usuario'] = dataL['usuario'];
          }
        });
          this.presentToast(data['message']);
          this.router.navigate(['/registro1']);
      } else {
        this.progress.type = 'determinate';
        this.presentToast(data['message']);
      }
    });
  }
}

  /**
   * Intercambia el tipo input entre password y text
   * @param {any} input
   */
  showPassword(input: any): void {
    this.isPrimary = this.isPrimary === true ? false : true;
    input.type = input.type === 'password' ? 'text' : 'password';
    input.setFocus();
  }
  /**
   * Intercambia el tipo input entre password y text
   * @param {any} input
   */
  showPasswordRe(input: any): void {
    this.isPrimaryRe = this.isPrimaryRe === true ? false : true;
    input.type = input.type === 'password' ? 'text' : 'password';
    input.setFocus();
  }
  
   

    async presentModal() {
      const modal = await this.modalController.create({
        component: Busca_pais
      });
      return await modal.present();
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
  
  logout() {
      window.localStorage.clear();
      this.router.navigate(['/login']);
    }
}
