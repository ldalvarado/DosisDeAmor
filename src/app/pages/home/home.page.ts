import { environment } from './../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { ToastController, AlertController, PopoverController, NavController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from './../../shared/directives/validation.service';
import { TranslateService } from '@ngx-translate/core';
import { ApiService, User, Sesion,Post, Pagination, UserContact, GoogleMapsApiService  } from '../../providers/providers';
import { PopoverComponent } from './popover';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { Sugerencias } from './../../modals/sugerencias/sugerencias.component';
/**
 * Proporciona la vista para un formulario donde el usuario puede ingresar sus datos para iniciar sesión.
 * @author CloudSolutions CA 
 */
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  progress = {
    type: 'determinate',
    value: 0
  };
  search = '';
  loginForm: any;
  isPrimary = false;
  isReadyToLogin = false;
  userContact: UserContact;
  userId: number;
  mascota: string;
  stories: any;

  token: string = window.localStorage['token'];
  usuario: string = window.localStorage['usuario'];
  usuario_id: string = window.localStorage['usuario_id'];
  posts: Post[] = [];
  lastPage = 1;
  icons = '';

 public like_btn = {
    color: 'black',
    icon_name: 'heart-outline'
  };

  public tap: number = 0;

 
  apiUrl = environment.SERVER_URL;
  constructor(
    private toastCtrl: ToastController, 
    private http: HttpClient, 
    public popoverController: PopoverController, 
    private router: Router,
    private api: ApiService,
    private route: ActivatedRoute,
      public modalController: ModalController
  ) {
    this.mascotas();
    console.log(this.usuario_id, 'usuario logueado');
  }
  ionViewDidEnter() {
    console.log('hola')
    this.route.params.subscribe(async (params) => {
      this.userId = params.user_id;
      if (this.userId) {
        this.getUserContact(this.userId);
      }
      this.getPosts(this.lastPage);
      this.Sugerencias(this.usuario_id);
    });
  }
  mascotas(){
    this.http.get(this.apiUrl + 'pets/'+ this.usuario_id)
            .subscribe( data => {
      //window.localStorage['mascota'] = JSON.stringify(data);
      this.mascota= data[0]['Nombre'];
    });
  }

   Sugerencias(id){
      this.http.get(this.apiUrl + 'suggestions/'+ id)
      .subscribe( data => {
        this.stories= data['data'];
      });
   }

   async presentModal() {
      const modal = await this.modalController.create({
        component: Sugerencias
      });
      return await modal.present();
    }
  likeButton() {
    if(this.like_btn.icon_name === 'heart-outline') {
      this.like_btn.icon_name = 'heart';
      this.like_btn.color = 'danger';
      // Do some API job in here for real!
    }
    else {
      this.like_btn.icon_name = 'heart-outline';
      this.like_btn.color = 'black';
    }
  }

  tapPhotoLike(times) { // If we click double times, it will trigger like the post
    this.tap++;
    if(this.tap % 2 === 0) {
      this.likeButton();
    }
  }

    async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  logout() {
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }

  async presentToast(text: string) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  swipePage(event) {
    if(event.direction === 1) { // Swipe Left
      console.log("Swap Camera");
    } 

    if(event.direction === 2) { // Swipe Right
      this.presentToast('soy un mensaje');
    }
    
  }

  onSugerenciaChange(stories){
    this.userId = stories;
    this.getPosts(1,stories);
  }

  getPosts(page: number = 1, pet_id: number = null, search: string = '',mascota: number = 0): Promise<boolean> {
    return new Promise((result) => {
      this.lastPage = page;
      const path = (pet_id) ? `posts/${pet_id}` : `publicaciones?page=${page}&search=${search}`;

      //?page=${page}&user_id=${user_id}&search=${search}
      const path2 = `publicaciones?page=${page}`;
      this.api.get(path).then((response: Pagination) => {
        if(response['data']['status'] != 'error'){
          if (page === 1) {
            this.posts = response.data;
          } else {
            if(pet_id){
              this.posts = response.data;
            }else{
              response.data.map(posts => {
                this.posts.push(posts);
              });
            }
          }
        }
        
        result(true);
      }, (fail) => {
        console.log('[posts-51]', fail);
        result(false);
      });
    });
  }
  /**
   * Obtiene la información de un usuario.
   * @param {number} user_id
   * @param {number} page
   */
  async getUserContact(userId: number) {
    this.userContact = await this.api.get(`/user/contact/${userId}`).catch((error) => {
      console.log('[wall-72]', error);
    });
    if (this.userContact && this.userContact.contact && this.userContact.contact.address) {
      //this.setMap(this.userContact);
    }
  }

  /**
   * Refresca la página.
   * @param event
   */
  doRefresh(event) {
    this.lastPage = 1;
    this.getPosts(this.lastPage).then(() => {
      event.target.complete();
    });
  }
  /**
   * Llama a la función para cargar mas elementos cuando la página llega al final.
   * @param infiniteScroll
   */
  doScrollDown(infiniteScroll) {
    this.getPosts(this.lastPage + 1, this.userId, this.search).then((success) => {
      infiniteScroll.target.complete();
    });
  }
}