import { environment } from './../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { ToastController, AlertController, PopoverController, NavController, } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from './../../shared/directives/validation.service';
import { TranslateService } from '@ngx-translate/core';
import { ApiService, User, Sesion,Post, Pagination, UserContact, GoogleMapsApiService  } from '../../providers/providers';
import { PopoverComponent } from '../home/popover';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  token: string = window.localStorage['token'];
  usuario: string = window.localStorage['usuario'];
  usuario_id: string = window.localStorage['usuario_id'];
  //posts: Post[] = [];

  posts: Post[] = [];
  lastPage = 1;

 public like_btn = {
    color: 'black',
    icon_name: 'heart-outline'
  };

  public tap: number = 0;

  // You can get this data from your API. This is a dumb data for being an example.
  public stories = [
    {
      id: 1,
      img: '/assets/imgs/Imagenes/índice2.jpg',
      user_name: 'Lola'
    },
    {
      id: 2,
      img: '/assets/imgs/Imagenes/índice4.jpg',
      user_name: 'Luna'
    },
    {
      id: 3,
      img: '/assets/imgs/Imagenes/perro00.png',
      user_name: 'Gigante'
    },
    {
      id: 4,
      img: '/assets/imgs/Imagenes/índice.jpg',
      user_name: 'Princesa'
    },
    {
      id: 5,
      img: '/assets/imgs/Imagenes/índice3.jpg',
      user_name: 'Rey'
    },
    {
      id: 6,
      img: '/assets/imgs/Imagenes/índice5.jpg',
      user_name: 'Diego'
    },
    {
      id: 7,
      img: '/assets/imgs/Imagenes/perro00.png',
      user_name: 'Leon'
    },
    {
      id: 8,
      img: '/assets/imgs/Imagenes/índice.jpg',
      user_name: 'Princesa'
    },
    {
      id: 9,
      img: '/assets/imgs/Imagenes/índice3.jpg',
      user_name: 'Rey'
    },
    {
      id: 10,
      img: '/assets/imgs/Imagenes/índice5.jpg',
      user_name: 'Diego'
    },
    {
      id: 11,
      img: '/assets/imgs/Imagenes/perro00.png',
      user_name: 'Leon'
    }        
  ];
  apiUrl = environment.SERVER_URL;
  constructor(
    private toastCtrl: ToastController, 
    private http: HttpClient, 
    public popoverController: PopoverController, 
    private router: Router,
    private api: ApiService,
    private route: ActivatedRoute
  ) {
    this.mascotas();
  }
  ionViewDidEnter() {
    this.route.params.subscribe(async (params) => {
      this.userId = params.user_id;
      if (this.userId) {
        this.getUserContact(this.userId);
      }
      this.getPosts(this.lastPage, this.userId);
    });
  }
  mascotas(){
    console.log(this.usuario_id, 'estoy en mascota');
    this.http.get(this.apiUrl + 'pets/'+ this.usuario_id)
            .subscribe( data => {
                console.log(data);
                window.localStorage['mascota'] = JSON.stringify(data);
                this.mascota= data[0]['Nombre'];
            });
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
    console.log(stories);
  }

  getPosts(page: number = 1, user_id: number = null, search: string = ''): Promise<boolean> {
    return new Promise((result) => {
      this.lastPage = page;
      const path = (user_id) ? `/posts?page=${page}&user_id=${user_id}&search=${search}` : `/posts?page=${page}&search=${search}`;
      const path2 = 'publicaciones';
      this.api.get(path2).then((response: Pagination) => {
        if (page === 1) {
          console.log('hola')
          this.posts = response.data;
          console.log(response.data);
        } else {
          response.data.map(posts => {
            //this.posts.push(posts);
          });
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
    console.log('hola');
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