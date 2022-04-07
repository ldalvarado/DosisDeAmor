import { __decorate } from "tslib";
import { AddEmailsPhonesComponentModule } from './../modals/add-emails-phones/add-emails-phones.module';
import { Busca_paisComponentModule } from './../modals/paises-busqueda/busca_pais.module';
import { MapComponentModule } from './../modals/map/map.module';
import { SharedModule } from './../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { BulletinComponent } from './bulletin/bulletin.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ImgModalComponent } from './gallery/img-modal/img-modal.component';
import { PostCardComponent, PostCardPopComponent } from './post/post-card/post-card.component';
import { PostFormComponent } from './post/post-form/post-form.component';
import { PostUpdateComponenet } from './post/post-update/post-update.component';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from './user/user-card/user-card.component';
import { PostPetsCardComponent, PostPetsCardPopComponent } from './post/post-pet-card/post-pets-card.component';
import { PostPublishComponent } from './post/post-public/post-publish.component';
var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        NgModule({
            declarations: [
                UserCardComponent,
                PostFormComponent,
                PostCardPopComponent,
                PostCardComponent,
                PostPetsCardComponent,
                PostPetsCardPopComponent,
                FooterComponent,
                BulletinComponent,
                GalleryComponent,
                PostUpdateComponenet,
                ImgModalComponent,
                PostPublishComponent
            ],
            imports: [
                IonicModule,
                CommonModule,
                SharedModule,
                FormsModule,
                ReactiveFormsModule,
                MapComponentModule,
                AddEmailsPhonesComponentModule,
                Busca_paisComponentModule,
                TranslateModule.forChild()
            ],
            exports: [
                UserCardComponent,
                PostFormComponent,
                PostCardPopComponent,
                PostPetsCardComponent,
                PostPetsCardPopComponent,
                PostUpdateComponenet,
                PostCardComponent,
                FooterComponent,
                BulletinComponent,
                GalleryComponent,
                Busca_paisComponentModule,
                PostPublishComponent
            ],
            entryComponents: [
                ImgModalComponent,
                PostCardPopComponent,
                PostPetsCardPopComponent,
                PostUpdateComponenet
            ]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());
export { ComponentsModule };
//# sourceMappingURL=components.module.js.map