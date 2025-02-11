import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { City } from '../city';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private cities: City[] = [];
  private favouriteCitiesSubject = new BehaviorSubject<City[]>([]);
  private filteredCitiesSubject = new BehaviorSubject<City[]>([]);

  favouriteCities$ = this.favouriteCitiesSubject.asObservable();
  filteredCities$ = this.filteredCitiesSubject.asObservable();

  constructor() {}

  setCities(cities: City[]) {
    this.cities = cities;
    this.filteredCitiesSubject.next(cities);
  }

  getFavourites(): City[] {
    return this.favouriteCitiesSubject.getValue();
  }

  addToFavourites(city: City) {
    const currentFavourites = this.getFavourites();
    if (!currentFavourites.some((fav) => fav.city === city.city)) {
      const updatedFavourites = [...currentFavourites, city];
      this.favouriteCitiesSubject.next(updatedFavourites);
    }
  }

  removeFromFavourites(city: City) {
    const updatedFavourites = this.getFavourites().filter(
      (fav) => fav.city !== city.city
    );
    this.favouriteCitiesSubject.next(updatedFavourites);
  }

  toogleFavourites(city: City, isFavourite: boolean) {
    if (isFavourite) {
      this.addToFavourites(city);
    } else {
      this.removeFromFavourites(city);
    }
  }

  filterCitiesByContinent(continent: string) {
    let filteredCities = this.cities;

    if (continent !== 'All') {
      filteredCities = this.cities.filter(
        (city) => city.continent.toLowerCase() === continent.toLowerCase()
      );
    }
    this.filteredCitiesSubject.next(filteredCities);
  }

  searchCities(query: string) {
    let citiesToSearch = this.cities;
    if (query) {
      citiesToSearch = citiesToSearch.filter((city) => {
        return city.city.toLowerCase().startsWith(query.toLowerCase());
      });
    }
    this.filteredCitiesSubject.next(citiesToSearch);
  }

  clearSearch() {
    let citiesToDisplay = this.cities;
    this.filteredCitiesSubject.next(citiesToDisplay);
  }
}
