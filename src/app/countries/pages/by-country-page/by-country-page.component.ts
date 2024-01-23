import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent {

  public countries: Country[] = [];

  constructor( private countriesService: CountriesService ){}

  searchByCountry(term: string):void {
    this.countriesService.searchByCountry( term ).subscribe(
      countries => {
        this.countries = countries;
      }
    );
    // console.log('Desde ByCapitalPage');
    // console.log({term});
  }
}
