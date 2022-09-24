import { Cocktail } from './../../models/cocktail.model';
import { Component, OnInit } from '@angular/core';
import { IFilter } from 'src/app/interfaces/ifilter';
import { CocktailcService } from 'src/app/services/cocktail.service';

@Component({
  selector: 'app-list-cocktails',
  templateUrl: './list-cocktails.component.html',
  styleUrls: ['./list-cocktails.component.css']
})
export class ListCocktailsComponent implements OnInit {

  // Atributos
  public showFilter: boolean;
  public listCocktails: Cocktail[];
  public loadCocktails: boolean;
  public filter: IFilter;
  // Paginación
  public items: number;
  public page: number;

  constructor(private cocktailService: CocktailcService) {
    this.showFilter = false;
    this.listCocktails = [];
    this.filter = {
      searchBy: 'name',
      value: ''
    }
    this.loadCocktails = true;
    // Elementos a mostrar
    this.items = 12;
    // Pagina inicial
    this.page = 1;
  }

  ngOnInit() {
  }


  /**
   * Muestra/oculta el filtro
   */
  hideShowFilter() {
    this.showFilter = !this.showFilter;
  }

  /**
   * Filtra los datos para obtener cocktails
   */
  filterData() {

    this.loadCocktails = false;

    this.cocktailService.getCocktailsFilter(this.filter).subscribe(cocktails => {
      console.log(cocktails);
      this.listCocktails = cocktails;
      this.loadCocktails = true;
    })

  }

}
