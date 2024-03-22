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

  //se crea e inicializa el array y se deja publico para poder acceder a el desde el html
  arrayArticulos: Article[] = [];

  //en el constructor se importan los servicios y se usa el metodo que permite leer el archivo JSON, obtenuendo la lista inicial de articulos disponibles
  constructor(public gestionNoticias: GestionNoticiasService, private leerJSON: HttpClient) {
    this.leerFicheroNoticias();
  }

  //metodo para leer el fichero JSON usando un Observable del tipo RespuestaNoticia para leer el fichero entero
  //en el subscribe, se accede a los datos y se añaden con el metodo push de los array solamente los objetos del atributo articles[]
  leerFicheroNoticias() {
    let datosFichero: Observable<RespuestaNoticias> | null = null;
    datosFichero = this.leerJSON.get<RespuestaNoticias>("/assets/datos/articulos.json");
    datosFichero.subscribe(datos => {
      this.arrayArticulos.push(...datos.articles);
    })
  }

  //metodo que devuelve un booleano y al que se le pasa la noticia a la que pertenece el checkbox como parametro para verificar si esta sigue existiendo en el array o no
  //se busca el indice de la noticia usando el metodo buscarNoticia del servicio, si existe devuelve true y por lo tanto la casilla queda marcado
  //si no existe el elemento del array, devuelve false y la casilla se desmarca
  checkNoticia(articulo: Article) {
    let indice: number = this.gestionNoticias.buscarNoticia(articulo);
    if (indice != -1) {
      return true;
    }
    return false;
  }

  //metodo que se activa al detectar un cambio en el estado del checkbox, si la casilla es marcada se añade al array usando el metodo del servicio
  //si la casilla es desmarcada la noticia se borra del array usando el metodo del servicio
  cambiosNoticia(evento: any, noticia: Article) {
    let seleccionado: boolean = evento.detail.checked;
    if (seleccionado) {
      this.gestionNoticias.anadirNoticia(noticia);
    } else {
      this.gestionNoticias.borrarNoticia(noticia);
    }
  }

}
