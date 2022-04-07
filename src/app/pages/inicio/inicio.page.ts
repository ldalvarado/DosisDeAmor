import { environment } from './../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup, NgForm, } from '@angular/forms';
import { ValidationService } from './../../shared/directives/validation.service';
import { TranslateService } from '@ngx-translate/core';
import { StorageService, ApiService, User, SocialLoginService, Sesion } from '../../providers/providers';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilityProvider, Response, Combo } from './../../providers/UtilityProvider';

//import { RestProvider} from '../../providers/RestProvider';


/**
 * Proporciona la vista para un formulario donde el usuario puede ingresar sus datos para iniciar sesión.
 * @author CloudSolutions CA 
 */
@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss']
})
export class InicioPage implements OnInit {

  progress = {
    type: 'determinate',
    value: 0
  };
 // loginForm: any;
  isPrimary = false;

  access: boolean;
  token: string;
  usuario_id: string;
  isReadyToLogin = false;
  loginForm: FormGroup;
  test: string;
  
  apiUrl = environment.SERVER_URL;
 
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private util: UtilityProvider,
    public toastCtrl: ToastController
  ) {
    
    this.loginForm = this.formBuilder.group({
      'correo' : [null, Validators.required],
      'contrasena' : [null, Validators.required]
    });

    window.localStorage.clear();
    window.localStorage['token']='';
    window.localStorage['usuario']='';
    window.localStorage['usuario_id']='';    
    window.localStorage['Nombre']='';    
    window.localStorage['fotoPerfil']='';
  }
  
  /**
   * Envía una petición al servidor para iniciar sesión.
   */

  ngOnInit() {
    
  }

 async onFormSubmit() {
    var headers = new HttpHeaders();
    const request = ({ headers: headers });
     const query = {
        correo: this.loginForm.value.correo,
        contrasena: this.loginForm.value.contrasena,
        
      };

    if (query.correo == '' && query.contrasena == '') {
    
      return Observable.throw("Please insert credentials.");
    } else {
     this.progress.type = 'indeterminate';
        this.http.post(this.apiUrl + 'login'+'?json='+JSON.stringify(query), JSON.stringify(query), request )
        .subscribe( data => {
          if (data['token'] ) {
            window.localStorage['token'] = data['token'];
            window.localStorage['usuario_id'] = JSON.stringify(data['id']);
            this.usuario_id=  window.localStorage['usuario_id'];
            window.localStorage['usuario'] = data['usuario'];
                if(data['mascotas'] != 0){
                  this.presentToast(data['message']);
                  this.progress.type = 'determinate';
                  this.loginForm.reset();
                  this.router.navigate(['/animal/home']);
                } else{
                  this.presentToast('Debe Registrar un animal de compañia');
                  this.router.navigate(['/wall']);
                }
          } else {
            this.presentToast(data['message']);
            this.access = false;
          }
        });

      return Observable.create(observer => {
        setTimeout(() => {
              observer.next(this.access);
          }, 500);

        setTimeout(() => {
              observer.complete();
          }, 1000);


      }, err => console.error(err));
    }
  }
 
  /**
   * Intercambia el tipo input entre password y text
   * @param {amy} input
   */
  showPassword(input: any): void {
    this.isPrimary = this.isPrimary === true ? false : true;
    input.type = input.type === 'password' ? 'text' : 'password';
    input.setFocus();
  }
  /**
   * Proporciona al usuario la opción de recuperar su contraseña.
   */
 /* async recoverPassword() {
    if (this.progress.type !== 'determinate') { return; }
    const alert = await this.alertCtrl.create({
      header: this.translate.instant('ALERTS.RECOVER_PASSWORD_BY_EMAIL.TITLE'),
      message: this.translate.instant('ALERTS.RECOVER_PASSWORD_BY_EMAIL.MESSAGE'),
      inputs: [
        {
          type: 'email',
          name: 'email',
          value: ''
        }
      ],
      buttons: [
        {
          text: this.translate.instant('CANCEL'),
          role: 'cancel',
          handler: (data: any) => {}
        },
        {
          text: this.translate.instant('ACCEPT'),
          handler: async (data: any) => {
            if (data) {
              this.progress.type = 'indeterminate';
              const query: User = {
                email: data.email,
                grant_type: 'password'
              };
              this.api.post('/password/email', query).then((response: any) => {
                this.presentToast(this.translate.instant('FORM.CHECK_YOUR_EMAIL'));
                this.progress.type = 'determinate';
              }, (fail) => {
                this.presentToast(this.translate.instant('ERRORS.RECOVERING_PASSWORD'));
                console.log('[login-164]', fail);
                this.progress.type = 'determinate';
              });
            }
          }
        }
      ]
    });
    await alert.present();
  }*/
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
    toast.present();
  }
}
