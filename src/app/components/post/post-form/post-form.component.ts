import { TranslateService } from '@ngx-translate/core';
import { AddEmailsPhonesComponent } from '../../../modals/add-emails-phones/add-emails-phones.component';
import { Platform, ModalController, AlertController } from '@ionic/angular';
import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User, LatLng, StorageService, GoogleMapsApiService, ApiService, Post,
  TransferImgFileService, Media } from '../../../providers/providers';
import { Router, NavigationEnd, RouteConfigLoadEnd } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { environment } from './../../../../environments/environment';
import { UtilityProvider, Response, Combo } from './../../../providers/UtilityProvider';
import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
//import * as moment from "moment";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})


export class PostFormComponent implements OnInit {

  @Input() postId: number;
  isBrowser = true;
  user: User;
   progress = {
    type: 'determinate',
    value: 0
  };
  // Map
  map;
  marker;
  circle;
  infoWindow;
  addDirection = false;
  addtipo_operacion = false;
  @ViewChild('mapCanvas', {static: false}) mapElement: ElementRef;
  // On drag img
  enterTarget = null;
  dragClasses = {
    onDrag: false,
  };
  files: Media[] = [];
  archivos: File[] = [];
  // Form
  postForm: any;
  fecha: string;
  isReadyToSend = false;
  @Output() appPostSend: EventEmitter<Post> = new EventEmitter();
  // Collapse menu
  expanded = false;
  apiUrl = environment.SERVER_URL;
  userId: number;
  Raza: Combo[];
  Gender: Combo[];
  Situacion: Combo[];
  data: any;
  usuario_id: string = window.localStorage['usuario_id'];
  cucumber: boolean;
  predefinido: number = 0;
  id_especie: string = window.localStorage['id_especie'];
  idmascota: string;
  token: string = window.localStorage['token'];
  lat:number;
  lon:number;
  Especie: Combo[];

  //lat: 18.85, lng: -99.2333

  constructor(
    private platform: Platform,
    private router: Router,
    private storage: StorageService,
    private googleMapsApi: GoogleMapsApiService,
    private http: HttpClient,
    private util: UtilityProvider,
    private transferImgFile: TransferImgFileService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private geolocation: Geolocation,
    private backgroundMode: BackgroundMode,
    formBuilder: FormBuilder
  ) {
    this.isBrowser = (!this.platform.is('android') && !this.platform.is('ios')) || this.platform.is('mobileweb');
    this.postForm = formBuilder.group({
      direction_accuracy: [0, Validators.nullValidator],
      raza: [0, Validators.required],
      gender: [0, Validators.required],
      nombreM: ['', Validators.required],
      edadM: ['', Validators.required],
      cucumber: ['', [Validators]],
      situacionA: [0, Validators.required],
      especie:[0,Validators.required],
      direction: formBuilder.group({
        country: ['', [Validators.nullValidator]],
        administrative_area_level_1: ['', [Validators.nullValidator]],
        administrative_area_level_2: ['', [Validators.nullValidator]],
        locality: ['', [Validators.nullValidator]],
        sublocality_level_1: ['', [Validators.nullValidator]],
        route: ['', [Validators.nullValidator]],
        street_number: ['', [Validators.nullValidator]],
        postal_code: ['', [Validators.nullValidator]],
        lat: ['', [Validators.nullValidator]],
        lng: ['', [Validators.nullValidator]],
      })
    });

    this.postForm.valueChanges.subscribe((v) => {
      this.isReadyToSend = this.postForm.valid;
    });
   

    //this.BuscarRaza();
    this.Buscarespecie();
    this.BuscarGender();
    this.BuscarSituacion();
    this.setGeolocation();

    this.route.params.subscribe(async (params) => {
      this.userId = params.user_id;
      if (this.userId) {
        this.datosPerfil(this.userId);
      }
      //this.getPosts(this.lastPage, this.userId);
    });

    //console.log(this.usuario_id, 'id usuario en el post' );
    //console.log(this.token, 'estoy en el post' );
   // this.postForm.resize();
  }

  /*ionViewDidEnter() {
    this.route.params.subscribe(async (params) => {
      this.userId = params.user_id;
      if (this.userId) {
        this.datosPerfil(this.userId);
      }
      //this.getPosts(this.lastPage, this.userId);
    });
  }*/



  datosPerfil(idM){    
      this.http.get(this.apiUrl + 'petprofile/'+ idM)
        .subscribe( data => {

          this.cucumber = data['predefinido'];
          if(this.cucumber == true){
            this.predefinido= 1;
          }else if(this.cucumber == false){
            this.predefinido= 0;
          }


          this.postForm.patchValue({
            nombreM : data['nombre'],
            raza: data['id_raza'],
            gender: data['id_genero'],
            edadM: data['fecha_nac'],
            situacionA: data['id_estado'],
          })
          //this.postForm.value.nombreM = data['nombre'];
          /*this.especie= data['especie'];
          this.nombre= data['nombre'];
          this.raza= data['raza'];
          this.pais= this.SinDatos(data['pais']);
          this.ciudad= this.SinDatos(data['ciudad']);
          this.estado= data['estado'];
          this.edad= data['edad'];
          this.genero= data['genero'];
          this.galeria= data['fotos'].original;*/
        });
  }

  private async setGeolocation() {
    let options = {
      timeout:10000,
      enableHighAccuracy:true
    };
    this.geolocation.getCurrentPosition(options).then((resp) => {

     this.lat = resp.coords.latitude
     this.lon = resp.coords.longitude
     this.setMap();
     /*
      latitude: 10.0839554
      longitude: -69.3277143
     */

    }).catch((error) => {
      console.log('Error getting location');
      console.log( error);
      if(this.lat === 0 && this.lon === 0){            
        this.lat = 18.85;
        this.lon = -99.2333;
      }
      this.setMap();
    });


  }

  BuscarRaza(id_especie) {

    this.Raza = [];
    this.progress.type = 'indeterminate';
    this.util.GetRaza(id_especie).subscribe(
      (data: Response) => {
        if (data) {
          this.progress.type = 'determinate';
          this.Raza = this.util.LlenarCombo(JSON.stringify(data));
        } else {
          this.presentToast(data['message']);
        }
      }
    );
  } 

  BuscarGender() {

    this.Gender = [];

    this.util.GetGender().subscribe(
      (data: Response) => {
        if (data) {
          this.Gender = this.util.LlenarCombo(JSON.stringify(data));
        } else {
          this.presentToast(data['message']);
        }
      }
    );
  }
  Buscarespecie() {
    this.Especie = [];

    this.util.GetEspecie().subscribe(
      (data: Response) => {
        
        if (data) {
          this.Especie = this.util.LlenarCombo(JSON.stringify(data));
        } else {
          this.presentToast(data['message']);
        }
      }
    );
  }

  someEvent(){
    const nombre_especie = this.postForm.value.especie;
    this.BuscarRaza(nombre_especie);
  }

  BuscarSituacion() {

    this.Situacion = [];

    this.util.GetSituacion().subscribe(
      (data: Response) => {
        if (data) {
          this.Situacion = this.util.LlenarCombo(JSON.stringify(data));
        } else {
          this.presentToast(data['message']);
        }
      }
    );
  } 

  async ngOnInit() {
    this.user = await this.storage.getUser();
    this.router.events.subscribe(async (event) => {
      if (event instanceof RouteConfigLoadEnd || event instanceof NavigationEnd) {
        this.user = await this.storage.getUser();
      }
    });
    if (this.mapElement) {
      this.setGeolocation();
    }
    if (this.postId) {
      this.router.navigate(['/animal']);
    }
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
  /**
   * Valida el formulario y envia toda la información.
   */
  async sendPost() {
     //this.fecha= format(this.postForm.value.edadM, 'yyyy-MM-dd');
     
     
     let query = {
      nombre: this.postForm.value.nombreM,
      fecha_nac: this.postForm.value.edadM,
      id_genero: this.postForm.value.gender,
      id_estado: this.postForm.value.situacionA,
      id_raza: this.postForm.value.raza,
      usuario_id: this.usuario_id,
      habilitado: '1',
      predefinido: this.predefinido,
      pais: this.postForm.value.direction.country,
      estado: this.postForm.value.direction.administrative_area_level_1,
      ciudad: this.postForm.value.direction.locality,
      calle: this.postForm.value.direction.route,
      zona_postal: this.postForm.value.direction.postal_code,
      latitud: this.postForm.value.direction.lat,
      longitud: this.postForm.value.direction.lng
    };
    if (this.postId) {
     /* const post = await this.http.put(`/post/${this.postId}`, this.postForm.value).catch((error) => {
        console.log('[post-card-134]', error);
      });
      if (post) {
        this.uploadImgs(post);
      }*/
    } else {
        
        
        if(this.files.length == 0){
           this.presentToast('Debe elegir una foto de perfil');
        }else{
          this.progress.type = 'indeterminate';
          let headers = new HttpHeaders();
          let urlMascotas = 'createmascotas' +'?json='+JSON.stringify(query);
          if(this.userId){
            headers = new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
            urlMascotas = 'updatePet/'+this.userId+'?json='+JSON.stringify(query);
          }
          const request = ({ headers: headers });

          if(!this.userId){
            const post = await this.http.post(this.apiUrl + urlMascotas , JSON.stringify(query), request )
            .subscribe( data => {
              if (data['status'] != "error") {
                
                let idmascota = data['info'].id_mascotas;
                window.localStorage['IdMascota']= idmascota;
                let usuario_id = data['info'].usuario_id;

                this.files.forEach(async (file) => {
                  if (!file.type) {
                    const x = await this.transferImgFile.uploadImg('fotoperfil', file.url, {params: {
                      id_usuario: usuario_id,
                      perfil: 1,
                      idMascota: idmascota
                    }});
                  }
                });
                this.progress.type = 'determinate';
      
                this.presentToast(data['message']);
                this.router.navigate(['/animal/home']);
              }else{
                this.progress.type = 'determinate';
                this.presentToast(data['message']);
              }
            });  
          }else{
            const post = await this.http.put(this.apiUrl + urlMascotas , JSON.stringify(query), request )
            .subscribe( data => {
              if (data['status'] != "error") {
                
                let idmascota = this.userId;
                let usuario_id =window.localStorage['usuario_id'];

                this.files.forEach(async (file) => {
                  if (!file.type) {
                    const x = await this.transferImgFile.uploadImg('fotoperfil', file.url, {params: {
                      id_usuario: usuario_id,
                      perfil: 1,
                      idMascota: idmascota
                    }});
                  }
                });
                this.progress.type = 'determinate';
                this.presentToast(data['message']);
                this.router.navigate(['/animal/home']);
              }else{
                this.progress.type = 'determinate';
                this.presentToast(data['message']);
              }
            });  
          }
        }
      
    }
     //this.router.navigate(['/animal']);
  }
  /**
   * Toma la lista de archivos y los sube
   * @param {Object} post
   */
  async uploadImgs(file: Object,post) {
    //post.user = this.user;
    file['id_Usuario'] = this.usuario_id;
    file['perfil'] = 1;
    console.log(file)
  }
  /**
   * Establece el mapa.
   */
  private async setMap() {
    const mapElement = this.mapElement.nativeElement;


    let latLng = {lat: this.lat, lng: this.lon};
    let latLng2 = {lat: ()=> this.lat, lng: () => this.lon};
    var mapOptions = {
      zoom: 8,
      mapTypeId: 'satellite',
      center: latLng,
    };
    this.map = await this.googleMapsApi.setMap({map: this.map, mapElement, latLng});

    this.googleMapsApi.getDirectionData(latLng2).then((direction) => {
      this.pathDirectionForm(direction);
      this.setMarker(this.postForm.value.description, {
        lat: latLng2.lat(),
        lng: latLng2.lng()
      });
    });

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
    //console.log(element);
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
        this.files = [file];
        this.archivos = Array.from(event.srcElement.files);
      });
    } else {
      this.backgroundMode.moveToForeground();
      this.transferImgFile.getImg().then((img) => {
        this.files = [{ url: img.url, alt: img.alt }];
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
              /*this.http.delete(`/post/file/${file.id}`).then(() => {
                this.archivos.splice(this.files.indexOf(file), 1);
                this.files.splice(this.files.indexOf(file), 1);
              }, (error) => {
                console.log('[post-form-422]', error);
              });*/
            }
          }
        ]
      });
      await alert.present();
    } else {
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
updateCucumber() {
    if(this.cucumber == true){
      this.predefinido= 1;
      console.log('Nuevo estado:' + this.cucumber);
    }else if(this.cucumber == false){
      this.predefinido= 0;
      console.log('Nuevo estado:' + this.cucumber);
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
