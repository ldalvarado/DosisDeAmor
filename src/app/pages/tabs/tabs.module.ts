import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { HomePage } from '../home/home.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      { path: 'home', loadChildren: '../home/home.module#HomePageModule' },
      { path: 'search', loadChildren: '../searhanimal/searhanimal.module#SearhanimalPageModule' },
      { path: 'notification', loadChildren: '../notificaciones/notificacion.module#NotificacionPageModule' },
      { path: 'perfil', loadChildren: '../perfil/perfil.module#PerfilPageModule' },
      { path: 'perfil/:pet_id', loadChildren: '../perfil/perfil.module#PerfilPageModule' },
      { path: 'profile-pet/:pet_id', loadChildren: '../profile-pet/profile-pet.module#ProfilePetPageModule' }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
