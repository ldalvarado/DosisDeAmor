import { environment } from './../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { ToastController, AlertController,Platform } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from './../../shared/directives/validation.service';
import { TranslateService } from '@ngx-translate/core';
import { StorageService, ApiService, User, SocialLoginService, Sesion } from '../../providers/providers';
import { DocumentViewer,DocumentViewerOptions  } from '@ionic-native/document-viewer/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
/**
 * Proporciona la vista para un formulario donde el usuario puede ingresar sus datos para iniciar sesión.
 * @author CloudSolutions CA
 */
@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage {

  progress = {
    type: 'determinate',
    value: 0
  };
  loginForm: any;
  isPrimary = false;
  isReadyToLogin = false;

  token: string;
  token_inv: string;
  usuario: string;
  usuario_id: any;
  mascota: string;
  id_especie: any;
  
  constructor(
    private platform: Platform,
    private transfer: FileTransfer, 
    private fileX: File,
    private socialLogin: SocialLoginService,
    private storage: StorageService,
    private api: ApiService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private translate: TranslateService,
    private router: Router,
    private document: DocumentViewer,
    private route: ActivatedRoute
  ) {
            window.localStorage.clear();
            window.localStorage['token']='';
            window.localStorage['usuario']='';
            window.localStorage['usuario_id']='';    
            window.localStorage['Nombre']='';    
            window.localStorage['fotoPerfil']='';
  }

  /**
   * Navega hacia la página para registrase.
   */
  InicioLogin() {
   this.router.navigate(['/inicio']);
  }
  
  /**
   * Llama a la función para hacer login o signup con google
   */
  googleLogin() {
    this.socialLogin.googleLogin();
  }
  /**
   * Llama a la función para hacer login o signup con facebook.
   */
  facebookLogin() {
    this.socialLogin.facebookLogin();
  }

  OpenTermn(){
    let path = null;
    if(this.platform.is('ios')){
      path = this.fileX.documentsDirectory;
    }else{
      path = this.fileX.dataDirectory;
    }

    const transfer = this.transfer.create();
    transfer.download('http://dosisdeamor.mx/blog/blog/public/PruebaPolicy.pdf',path+'TermsDosis.pdf').then(entry=>{
      let url = entry.toURL();
      this.document.viewDocument(url,'application/pdf',{});
    });
  }
  /**
   * Navega hacia la página para registrase.
   */
  goToSignup() {
    
        this.router.navigate(['/signup']);
     
  }

   /**
   * Navega hacia la página para registrase.
   */
  goToInvitado() {
   this.token_inv = 'invitado';
   window.localStorage['token_inv'] = this.token_inv;    
   this.router.navigate(['/animal']);
  }

  /**
   * Navega hacia la página de políticas de la aplicación
   * @param {string} segment
   */
  goToPolitics(segment: string) {
    this.router.navigate(['/politics', segment]);
  }

  /**
   * Proporciona al usuario la opción de recuperar su contraseña.
   */
  async recoverPassword() {
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
    toast.present();
  }
}
