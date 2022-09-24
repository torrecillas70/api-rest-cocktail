import { map } from 'rxjs/internal/operators';
import { Cocktail } from './../models/cocktail.model';
import { IFilter } from './../interfaces/ifilter';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CocktailcService {

  constructor(private http: HttpClient) { }

  /**
   * Obtiene los cocktails segun el filtro
   * @param filter 
   */
  getCocktailsFilter(filter: IFilter) {

    const urlBase = "https://www.thecocktaildb.com/api/json/v1/1/";
    let additionalUrl = '';

    // Si el filtro de busqueda es por nombre, llamamos a su fichero correctamente
    if (filter.searchBy === 'name') {
      additionalUrl = 'search.php?s=' + filter.value;
    } else {

      // Si el filtro de busqueda es otro, ya le añado el nombre del fichero y despues lo completo
      additionalUrl = 'filter.php?';
      if (filter.searchBy === 'glass') {
        additionalUrl += 'g=';
      } else if (filter.searchBy === 'category') {
        additionalUrl += 'c=';
      } else {
        additionalUrl += 'i=';
      }

      additionalUrl += filter.value;
    }

    // Completo la URL
    const finalURL = urlBase + additionalUrl;

    // Llamo al fichero php de cocktailDB
    return this.http.get(finalURL).pipe(
      map(data => this.parseData(_.get(data, 'drinks')))
    );

  }

  /**
   * Obtiene un cocktail segun el id pasado
   * @param id id del cocktail a recuperar
   */
  getCocktailById(id: string) {
    return this.http.get("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + id).pipe(
      map(data => {
        const list = this.parseData(_.get(data, 'drinks'));
        return list[0];
      })
    )
  }

   /**
   * Convierto la lista recibida en una lista de objetos cocktails
   * @param listCocktails 
   */
  private parseData(listCocktails) {

    let newListCocktails = [];

    // Recorro la lista
    _.forEach(listCocktails, c => {

      // Creo el cocktail
      let cocktail = new Cocktail(c);

      // Lo añado en nuestra nueva lista
      newListCocktails.push(cocktail);

    });

    return newListCocktails;
  }


}
