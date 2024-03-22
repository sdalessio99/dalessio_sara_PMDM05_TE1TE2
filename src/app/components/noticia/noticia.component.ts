import { GestionNoticiasService } from './../../services/gestion-noticias.service';
import { Article } from './../../interfaces/interfaces';
import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent  implements OnInit {

  @Input() articulo: Article = {} as Article;

  constructor(public gestionNoticias: GestionNoticiasService, private alerta: AlertController) { }

  ngOnInit() {}

  //metodo onClick para presentar la alerta cuando se pulsa el icono de la basura en el ion-card
  onClick() {
    this.presentarAlertaBorrar();
  }

  //metodo para presentar y gestionar la alerta de confirmacion de borrado, al darle al boton okay lanza el metodo borrar del servicio
  //y pasa como parametro la noticia de la ion-card actual
  async presentarAlertaBorrar() {
    const alert = await this.alerta.create({
    header: 'Confirmar',
    message: 'Borrar noticia?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        },
      },
      {
        text: 'Okay',
        handler: () => {
          console.log('Confirm Okay');
          this.gestionNoticias.borrarNoticia(this.articulo);
        },
      },
    ],
  });

  await alert.present();
  }

}
