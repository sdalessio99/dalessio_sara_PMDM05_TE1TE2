import { GestionNoticiasService } from './../../services/gestion-noticias.service';
import { RespuestaNoticias, Article } from './../../interfaces/interfaces';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  arrayArticulos: Article[] = [];

  constructor(public gestionNoticias: GestionNoticiasService, private leerJSON: HttpClient) {
    this.leerFicheroNoticias();
  }

  leerFicheroNoticias() {
    let datosFichero: Observable<RespuestaNoticias> | null = null;
    datosFichero = this.leerJSON.get<RespuestaNoticias>("/assets/datos/articulos.json");
    datosFichero.subscribe(datos => {
      this.arrayArticulos.push(...datos.articles);
    })
  }

  checkNoticia(articulo: Article) {
    let indice: number = this.gestionNoticias.buscarNoticia(articulo);
    if (indice != -1) {
      return true;
    }
    return false;
  }

  cambiosNoticia(evento: any, noticia: Article) {
    let seleccionado: boolean = evento.detail.checked;
    if (seleccionado) {
      this.gestionNoticias.anadirNoticia(noticia);
    } else {
      this.gestionNoticias.borrarNoticia(noticia);
    }
  }

}
