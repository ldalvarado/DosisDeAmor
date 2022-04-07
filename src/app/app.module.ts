import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { IonicStorageModule } from '@ionic/storage';

import { FacebookModule } from 'ngx-facebook';
import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import  {  NgxEmojiPickerModule  }  from  'ngx-emoji-picker';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { ApiService, StorageService, TransferImgFileService,
  SocialLoginService, GoogleMapsApiService } from './providers/providers';
import { ValidationService } from './shared/directives/validation.service';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProfileComentsComponent } from './profile-coments/profile-coments.component';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { PopoverComponent } from './pages/home/popover';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
<<<<<<< HEAD
import { BackgroundGeolocation } from '@ionic-native/background-geolocation/ngx';
import { ForegroundService } from '@ionic-native/foreground-service/ngx';
=======
>>>>>>> 1a5d5342bca10e5d39945f520b57fc8437b0220c
// El cargador de traducción necesita saber dónde cargar los archivos i18n
// en Ionic static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, NotificationsComponent,ProfileComentsComponent],
  entryComponents: [NotificationsComponent,ProfileComentsComponent],
  imports: [ 
    FormsModule, 
    BrowserModule,
    HttpClientModule,
    NgxEmojiPickerModule.forRoot(),
    FacebookModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    ApiService,
    Camera,
    Facebook,
    GooglePlus,
    SplashScreen,
    StatusBar,
    StorageService,
    ValidationService,
    File,
    FilePath,
    BackgroundMode,
    Crop,
    FileTransfer,
    DocumentViewer,
<<<<<<< HEAD
    ForegroundService,
=======
>>>>>>> 1a5d5342bca10e5d39945f520b57fc8437b0220c
    Geolocation,
    BackgroundGeolocation,
    SocialLoginService,
    TransferImgFileService,
    GoogleMapsApiService,
    SocialSharing,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
