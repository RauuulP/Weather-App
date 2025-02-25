import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { City } from '../city';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private cities: City[] = [];
  private favouriteCitiesSubject = new BehaviorSubject<City[]>([]);
  private showFavouritesSubject = new BehaviorSubject<boolean>(false);
  private searchQuerySubject = new BehaviorSubject<string>('');
  private continentFilterSubject = new BehaviorSubject<string>('All');
  private filteredCitiesSubject = new BehaviorSubject<City[]>([]);

  favouriteCities$ = this.favouriteCitiesSubject.asObservable();
  showFavourites$ = this.showFavouritesSubject.asObservable();
  searchQuery$ = this.searchQuerySubject.asObservable();
  continentFilter$ = this.continentFilterSubject.asObservable();
  filteredCities$ = this.filteredCitiesSubject.asObservable();

  constructor() {}

  setCities(cities: City[]) {
    this.cities = cities;
    this.updateFilteredCities();
  }

  getFavourites(): City[] {
    return this.favouriteCitiesSubject.getValue();
  }

  addToFavourites(city: City) {
    const currentFavourites = this.getFavourites();
    if (!currentFavourites.some((fav) => fav.city === city.city)) {
      const updatedFavourites = [...currentFavourites, city];
      this.favouriteCitiesSubject.next(updatedFavourites);
      this.updateFilteredCities();
    }
  }

  removeFromFavourites(city: City) {
    const updatedFavourites = this.getFavourites().filter(
      (fav) => fav.city !== city.city
    );
    this.favouriteCitiesSubject.next(updatedFavourites);
    this.updateFilteredCities();
  }

  toogleFavourites(city: City, isFavourite: boolean) {
    if (isFavourite) {
      this.addToFavourites(city);
    } else {
      this.removeFromFavourites(city);
    }
  }

  toggleFavouritesView() {
    const newValue = !this.showFavouritesSubject.value;
    this.showFavouritesSubject.next(newValue);
    this.updateFilteredCities();
  }

  updateFilteredCities() {
    let citiesToShow = this.cities;
    const showFavourites = this.showFavouritesSubject.value;
    const searchQuery = this.searchQuerySubject.value.toLowerCase();
    const selectedContinent = this.continentFilterSubject.value;
    const favourites = this.getFavourites();

    if (showFavourites) {
      citiesToShow = favourites;
    }

    if (selectedContinent !== 'All') {
      citiesToShow = citiesToShow.filter((city) => {
        return city.continent.toLowerCase() === selectedContinent.toLowerCase();
      });
    }

    if (searchQuery) {
      citiesToShow = citiesToShow.filter((city) =>
        city.city.toLowerCase().startsWith(searchQuery)
      );
    }

    this.filteredCitiesSubject.next(citiesToShow);
  }

  filterCitiesByContinent(continent: string) {
    this.continentFilterSubject.next(continent);
    this.updateFilteredCities();
  }

  searchCities(query: string) {
    this.searchQuerySubject.next(query);
    this.updateFilteredCities();
  }

  clearSearch() {
    this.searchQuerySubject.next('');
    this.updateFilteredCities();
  }
}
