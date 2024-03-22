import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreContainerComponent } from './explore-container/explore-container.component';
import { NoticiaComponent } from './noticia/noticia.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [ExploreContainerComponent, NoticiaComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ExploreContainerComponent, NoticiaComponent
  ]

})
export class ComponentesModule { }
