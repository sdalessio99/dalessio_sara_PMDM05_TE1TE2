import { Injectable } from '@angular/core';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class GestionNoticiasService {

  private arrayNoticias: Article[] = []

  constructor() { }

  //metodo get para poder acceder al array desde fuera del servicio ya que es un atributo privado
  getNoticia() {
    return this.arrayNoticias;
  }

  //metodo para añadir una noticia al array
  anadirNoticia(noticia: Article) {
    //crear la nueva noticia
    let noticiaString = JSON.stringify(noticia);
    noticia = JSON.parse(noticiaString);

    //añadirla al array con el metodo push
    this.arrayNoticias.push(noticia);
  }

  buscarNoticia(noticia: Article) {
    //buscar una noticia con el dato pasado por parametro
    let articuloEncontrado: any = this.arrayNoticias.find(function(articulo) {
      return JSON.stringify(articulo) == JSON.stringify(noticia);
    });

    //buscar el indice de la noticia y devolverlo
    let indice = this.arrayNoticias.indexOf(articuloEncontrado);
    return indice;
  }

  //metodo para quitar una noticia del array
  borrarNoticia(noticia: Article) {
    //buscar la noticia con el metodo buscarNoticia
    let indice: number = this.buscarNoticia(noticia);

    //verificar que el indice que se busca existe y si existe, borrar la noticia
    if (indice != -1) {
      //borrar la noticia con el indice usando el metodo splice(indice, n de elementos)
      this.arrayNoticias.splice(indice, 1);
    }
  }
}
