import { TranslateService } from '@ngx-translate/core';
import { AddEmailsPhonesComponent } from '../../../modals/add-emails-phones/add-emails-phones.component';
import { Platform, ModalController, AlertController } from '@ionic/angular';
import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User, LatLng, StorageService, GoogleMapsApiService, ApiService, Post,
  TransferImgFileService, Media } from '../../../providers/providers';
import { Router, NavigationEnd, RouteConfigLoadEnd } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController,LoadingController } from '@ionic/angular';
import { HomePage } from './../../../pages/home/home.page';
import { TabsPage } from './../../../pages/tabs/tabs.page';

@Component({
  selector: 'app-publish-form',
  templateUrl: './post-publish.component.html',
  styleUrls: ['./post-publish.component.scss']
})
export class PostPublishComponent implements OnInit {

  @Input() postId: number;
  isBrowser = true;
  user: User;
  // Map
  map;
  marker;
  circle;
  infoWindow;
  addDirection = false;
  @ViewChild('mapCanvas', {static: false}) mapElement: ElementRef;
  // On drag img
  enterTarget = null;
  dragClasses = {
    onDrag: false,
  };
  predeterminada : number;
  files: Media[] = [];
  // Form
  postForm: any;
  isReadyToSend = false;
  @Output() appPostSend: EventEmitter<Post> = new EventEmitter();
  // Collapse menu
  expanded = false;
  usuario_id: number = window.localStorage['usuario_id'];
  usuario: string = window.localStorage['usuario'];

  list_mascotas: any[] = [];
  apiUrl = environment.SERVER_URL;
  archivos: File[] = [];
  fotoPerfil= window.localStorage['fotoPerfil'];
  compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };
  hidden: boolean = false;
  loading:any;
  lastPage = 1;
  compareWith = this.compareWithFn;

  //camaretia = CameraPreview;
  constructor(
    private platform: Platform,
    private router: Router,
    private storage: StorageService,
    private googleMapsApi: GoogleMapsApiService,
    private api: ApiService,
    private http: HttpClient,
    private transferImgFile: TransferImgFileService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private translate: TranslateService,
    public hom: HomePage,
    public tab: TabsPage,
    private toastCtrl: ToastController,
    public loadingController: LoadingController,
    formBuilder: FormBuilder
  ) {
    let ishidden = true;
    this.isBrowser = (!this.platform.is('android') && !this.platform.is('ios')) || this.platform.is('mobileweb');
    this.postForm = formBuilder.group({
      description: ['', [Validators.required]],
      state: ['', [Validators.required]],
      direction_accuracy: [0, Validators.nullValidator],
      direction: formBuilder.group({
        country: ['', [Validators.nullValidator]],
        administrative_area_level_1: ['', [Validators.nullValidator]],
        administrative_area_level_2: ['', [Validators.nullValidator]],
        locality: ['', [Validators.nullValidator]],
        sublocality_level_1: ['', [Validators.nullValidator]],
        route: ['', [Validators.nullValidator]],
        street_number: ['', [Validators.nullValidator]],
        postal_code: ['', [Validators.nullValidator]],
        mts2_construction: ['', [Validators.nullValidator]],
        observacion: ['', [Validators.nullValidator]],
        lat: ['', [Validators.nullValidator]],
        lng: ['', [Validators.nullValidator]],
      })
    });
    this.postForm.valueChanges.subscribe((v) => {
      this.isReadyToSend = this.postForm.valid;
    });
  }

  async ngOnInit() {
    console.log('hola');
    this.user = await this.storage.getUser();
    this.router.events.subscribe(async (event) => {
      if (event instanceof RouteConfigLoadEnd || event instanceof NavigationEnd) {
        this.user = await this.storage.getUser();
      }
    });
    this.getListMascota();
    if (this.mapElement) {
      this.setMap();
    }
    if (this.postId) {
      this.getPost();
    }
    this.hom.getPosts();
  }


  ionViewDidEnter() {
    console.log('hola')
    this.usuario_id = window.localStorage['usuario_id'];
    this.usuario = window.localStorage['usuario'];

    this.getListMascota();
  }

  /*
  * Busca las mascotas del sistema
  */
  getListMascota() {
    this.api.get(`pets/${this.usuario_id}`).then((userContact) => {
      if(userContact.length && userContact !== 'Lista Vacia'){
        let x = -1;
        let mascotas = JSON.parse(window.localStorage['mascota']);
        this.list_mascotas = userContact;

        for (var i = 0; i < mascotas.length; i++) {
          if(mascotas[i].predefinido === 1){
            x = i;
          }
        }

        if(x >= 0){
          this.postForm.patchValue({
            state: mascotas[x].Id
          })
          this.predeterminada = mascotas[x].Id;
        }
      }
    }).catch((error) => {
      console.log('[privacy-55]', error);
    });
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Cargando...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });

    this.loading.present();

  }
  async dismissLoading() {
    return await this.loading.dismiss();
  }

  /**
   * Establece la información del elemento a actualizar.
   */
  async getPost() {
    const post: Post = await this.api.get(`/post/${this.postId}`);
    this.postForm.patchValue({
      id: this.postId,
      description: post.description,
      state: post.state,
      direction_accuracy: post.direction_accuracy,
    });
    if (post.direction) {
      this.postForm.patchValue({
        direction: {
          country: post.direction.country,
          administrative_area_level_1: post.direction.administrative_area_level_1,
          administrative_area_level_2: post.direction.administrative_area_level_2,
          route: post.direction.route,
          street_number: post.direction.street_number,
          postal_code: post.direction.postal_code,
          lat: post.direction.lat,
          lng: post.direction.lng
        }
      });
      this.addDirection = true;
      if (parseFloat(post.direction.lat) && parseFloat(post.direction.lng)) {
        this.setMarker(this.postForm.value.description, {
          lat: parseFloat(post.direction.lat),
          lng: parseFloat(post.direction.lng)
        });
      }
    }
    this.files = post.media || [];
  }
  /**
   * Navega hacia la pagina de la cuenta del usuario.
   */
  goToAccount() {
    this.router.navigate(['/account']);
  }
  /**
   * Navega hacia la pagina del login.
   */
  goToLogin() {
    this.router.navigate(['/login']);
  }
  myChange() {
    this.hidden= true;
 }
  /**
   * Valida el formulario y evia toda la información.
   */
  async sendPost() {
    if (!this.postForm.valid) { return; }
    if (this.postId) {
     /* const post = await this.api.put(`/post/${this.postId}`, this.postForm.value).catch((error) => {
        console.log('[post-card-134]', error);
      });*/
    }else{
      var headers = new HttpHeaders();
      const request = ({ headers: headers });
      await this.presentLoading();
      if(this.files.length){
        const query = {
            contenido: this.postForm.value.description,
            id_mascotas: this.postForm.value.state
        }
        const post = await this.http.post(this.apiUrl + 'publicar'+'?json='+JSON.stringify(query), JSON.stringify(query), request )
        .subscribe( data => {
          if(data['status'] != "error"){
            const postId = data['info']['id_publicacion'];
            const query_photo = {
              idMascota: this.postForm.value.state,
              files: this.files,
              idPublicacion: postId,
            }
            this.http.post(this.apiUrl + 'subirfoto',query_photo,request)
              .subscribe( data => {
                if(data['status'] != "error"){

                  this.files = [];
                  this.presentToast('Publicación creada con éxito');
                }else{
                  this.files = [];
                  this.presentToast('Problema con las fotos');
                }
                this.dismissLoading();
             });
            this.hom.getPosts();
            this.postForm.reset()
          }

        });

      //this.files = [];
      }else{
        const query = {
            contenido: this.postForm.value.description,
            id_mascotas: this.postForm.value.state
        }
        const post = await this.http.post(this.apiUrl + 'publicar'+'?json='+JSON.stringify(query), JSON.stringify(query), request )
        .subscribe( data => {
          if(data['status'] != "error"){
            this.postForm.reset()
          }
          this.presentToast(data['message']);
          this.dismissLoading();
        });
      }
    }
  }

  /**
   * Toma la lista de archivos y los sube
   * @param {Post} post
   */
  async uploadImgs(post: Post) {
    post.user = this.user;
    if (this.files.length) {
      post.media = [];
      this.files.forEach(async (file) => {
        if (!file.type) {
          post.media.push(await this.transferImgFile.uploadImg('/post/file', file.url, {params: {
            id: post.id
          }}));
        }
      });
      this.files = [];
      this.postForm.reset();
      this.appPostSend.emit(post);
    } else {
      this.postForm.reset();
      this.appPostSend.emit(post);
    }
  }
  /**
   * Establece el mapa.
   */
  private async setMap() {
    const mapElement = this.mapElement.nativeElement;
    let latLng = {lat: 10.073532, lng: -69.326608};
    var mapOptions = {
        zoom: 8,
        mapTypeId: 'satellite'
      };
    this.map = await this.googleMapsApi.setMap({map: this.map, mapElement, latLng});
    this.googleMapsApi.addListenerOnce(this.map, 'click', (event) => {
      this.googleMapsApi.getDirectionData(event.latLng).then((direction) => {
        this.pathDirectionForm(direction);
      }, (fail) => {
        console.log('[post-form-180]', fail);
      });
      this.setMarker(this.postForm.value.description, {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      });
    });
  }
  /**
   * Establece el marcador segun la ubicacion del usuario en el formulario.
   */
  async getGoogleDirection() {
    const direction = this.postForm.value.direction;
    if (!(direction.administrative_area_level_1
      && direction.administrative_area_level_2 && direction.country
      && direction.sublocality_level_1 && direction.locality
      )) {
      return;
    }
    const latLng = await this.googleMapsApi.getCoords(direction);
    this.setMarker(this.postForm.value.description, latLng);
    this.postForm.patchValue({
      direction: {
        lat: latLng.lat,
        lng: latLng.lng,
      }
    });
  }
  /**
   * Establece la pocición del markador del usuario.
   * @param {LatLng} latLng
   */
  private async setMarker(description: string, latLng: LatLng) {
    this.postForm.patchValue({
      direction: {
        lat: latLng.lat,
        lng: latLng.lng,
      }
    });
    if (!this.marker) {
      const {marker, infoWindow} = await this.googleMapsApi.setMarker({
        content: `<p>${description}</p>`,
        latLng,
        map: this.map,
        title: description
      });
      this.map.setCenter(latLng);
      this.marker = marker;
      this.infoWindow = infoWindow;
      this.googleMapsApi.markerAddListener(this.marker, 'drag', (markerDrag) => {
        if (this.circle) {
          this.circle.setCenter(markerDrag.latLng);
        }
      });
      this.googleMapsApi.markerAddListener(this.marker, 'dragend', (markerDragend) => {
        this.postForm.patchValue({
          direction: {
            lat: markerDragend.latLng.lat(),
            lng: markerDragend.latLng.lng(),
          }
        });
        this.googleMapsApi.getDirectionData(markerDragend.latLng).then((direction) => {
          this.pathDirectionForm(direction);
        });
      });
      if (this.postForm.value.direction_accuracy !== 0) {
        if (!this.circle) {
          this.circle = this.googleMapsApi.addCircle({
            radius: this.postForm.value.direction_accuracy / 2, map: this.map, center: this.marker.getPosition()
          });
        }
      }
    } else {
      this.map.setCenter(latLng);
      this.marker.setPosition(latLng);
      this.infoWindow.setContent(`<p>${description}</p>`);
    }
  }
  /**
   * Agrega un ciculo al mapa.
   * @param event
   */
  setMapCircle(event) {
    if (this.marker) {
      if (!this.circle) {
        this.circle = this.googleMapsApi.addCircle({
          radius: event.target.value / 2, map: this.map, center: this.marker.getPosition()
        });
      } else {
        this.circle.setCenter(this.marker.getPosition());
        this.circle.setRadius(event.target.value / 2);
      }
    }
  }
  /**
   * Establece la dirección segun la respuesta de google.
   * @param {any} direction
   */
  pathDirectionForm(direction: any) {
    if (direction) {
      this.postForm.patchValue({
        direction: {
          route: '', // calle - avenida
          sublocality_level_1: '', // urbanización
          locality: '', //ciudad
          administrative_area_level_2: '', //municipio
          administrative_area_level_1: '', //estado
          country: '', //pais
          postal_code: '', // codigo postal
          street_number: '', // numero
        }
      });
      direction.forEach((element: any) => {
        element.types.forEach((type: string) => {
          switch (type) {
            case 'route': {
              if (element.long_name !== 'Unnamed Road') {
                this.postForm.patchValue({
                  direction: {
                    route: element['long_name']
                  }
                });
              }
            } break;
            case 'street_number': {
              this.postForm.patchValue({
                direction: {
                  street_number: element['long_name']
                }
              });
            } break;
            case 'country': {
              this.postForm.patchValue({
                direction: {
                  country: element['long_name']
                }
              });
            } break;
            case 'administrative_area_level_2': {
              this.postForm.patchValue({
                direction: {
                  administrative_area_level_2: element['long_name']
                }
              });
            } break;
            case 'locality': {
              this.postForm.patchValue({
                direction: {
                  locality: element['long_name']
                }
              });
            } break;
            case 'administrative_area_level_1': {
              this.postForm.patchValue({
                direction: {
                  administrative_area_level_1: element['long_name']
                }
              });
            } break;
            case 'country': {
              this.postForm.patchValue({
                direction: {
                  country: element['long_name']
                }
              });
            } break;
            case 'sublocality_level_1': {
              this.postForm.patchValue({
                direction: {
                  sublocality_level_1: element['long_name']
                }
              });
            } break;
            case 'postal_code': {
              this.postForm.patchValue({
                direction: {
                  postal_code: element['long_name']
                }
              });
            } break;
            default:
              break;
          }
        });
      });
    }
  }
  /**
   * Selecciona archivos con un boton.
   * @param event
   */
  selectFiles(event) {
    if (event) {
      this.transferImgFile.getMultipleBase64Imgs(event.srcElement.files).subscribe((file) => {
        this.files.push(file);
        this.archivos = Array.from(event.srcElement.files);
      });
    } else {
      this.transferImgFile.getImg().then((img) => {
        this.files.push({ url: img.url, alt: img.alt });
      }, (fail) => {
        console.log('[post-form-302]', fail);
      });
    }
  }
  /**
   * Seleciona archivos al dejarlos caer.
   * @param event
   */
  onDrop(event) {
    event.preventDefault();
    this.transferImgFile.getMultipleBase64Imgs(event.dataTransfer).subscribe((file) => {
      this.files.push(file);
    });
    this.dragClasses.onDrag = false;
  }
  /**
   * Abre un modal.
   * @param {'email' | 'phone'} type
   */
  async addEmailsPhones(type: 'email' | 'phone') {
    const modal = await this.modalCtrl.create({
      component: AddEmailsPhonesComponent,
      componentProps: {
        type: type,
        name: name
      }
    });
    await modal.present();
  }
  /**
   * Elimina un archivo de la lista.
   * @param {Media} file
   */
  async removeFile(file: Media) {
    if (file.id) {
      const alert = await this.alertCtrl.create({
        header: this.translate.instant('ALERTS.DELETE_FILE.TITLE'),
        message: this.translate.instant('ALERTS.DELETE_FILE.MESSAGE'),
        buttons: [
          {
            text: this.translate.instant('CANCEL'),
            role: 'cancel',
            handler: () => {}
          }, {
            text: this.translate.instant('ACCEPT'),
            handler: () => {
              this.api.delete(`/post/file/${file.id}`).then(() => {

                this.archivos.splice(this.files.indexOf(file), 1);
                this.files.splice(this.files.indexOf(file), 1);
              }, (error) => {
                console.log('[post-form-422]', error);
              });
            }
          }
        ]
      });
      await alert.present();
    } else {
      //this.archivos.splice(0, 1);
      this.archivos.splice(this.files.indexOf(file), 1);
      this.files.splice(this.files.indexOf(file), 1);
    }
  }
  /**
   * Al desplazar un objeto sobre un elemento de la pagina.
   * @param event
   */
  onDragEnter(event) {
    this.enterTarget = event.target;
  }
  /**
   * Al desplazar un objeto sobre un elemento especifico de la pagina.
   * @param event
   */
  onDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
    this.dragClasses.onDrag = true;
  }
  /**
   * Al salir del elemento arrastrando un objeto.
   * @param event
   */
  onDragLeave(event) {
    if (this.enterTarget === event.target && this.dragClasses.onDrag) {
      event.stopPropagation();
      event.preventDefault();
      this.dragClasses.onDrag = false;
    }
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
}
