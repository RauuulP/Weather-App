import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './services/weather.service';

import { firstValueFrom } from 'rxjs';
import { City } from './city';
import { HeaderComponent } from './header/header.component';
import { CityCardListComponent } from './city-card-list/city-card-list.component';
import { SearchCityComponent } from './search-city/search-city.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CityCardListComponent,
    HeaderComponent,
    SearchCityComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'weather-app';
  cities: any[] = [];
  filteredCities: City[] = [];
  favouriteCities: City[] = [];
  selectedContinent: string = "All";
  showFavourites: boolean = false;
  searchQuery: string = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.fetchWeatherData();
    this.cities = this.weatherService.getCities();
  }

  fetchWeatherData() {
    const weatherObservables = this.weatherService.getWeatherForAllCities();

    Promise.all(weatherObservables.map((obs) => firstValueFrom(obs)))
      .then((weatherResponses) => {
        this.cities = weatherResponses.map((response, index) => {
          return {
            city: this.weatherService.getCities()[index].name,
            continent: this.weatherService.getContinents(response.timezone),
            // timezone:  response.timezone,
            tempMax: Math.max(...response.daily.temperature_2m_max),
            tempAverageMax: this.calculateAverage(
              response.daily.temperature_2m_max
            ),
            tempMin: Math.min(...response.daily.temperature_2m_min),
            tempAverageMin: this.calculateAverage(
              response.daily.temperature_2m_min
            ),
            precipitation: response.daily.precipitation_sum[0],
          } as City;
        });
        this.filteredCities = [...this.cities];
        // console.log(this.cities)
      })
      .catch((error) => {
        console.log('Error fetching weather data: ', error);
      });
  }

  calculateAverage(values: number[]): number {
    const sum = values.reduce((acc, val) => acc + val, 0);
    const average = sum / values.length;
    return Number(average.toFixed(2));
  }

  filterByContinent(selectedContinent: string) {
    // console.log('Filtering by Continent:', selectedContinent);
    this.selectedContinent = selectedContinent;
    if (selectedContinent === 'All') {
      this.filteredCities = [...this.cities];
    } else {
      this.filteredCities = this.cities.filter((city) => {
        return city.continent.toLowerCase() === selectedContinent.toLowerCase();
      });
    }
    this.filterWithSearchQuery();
  }

  onSearchQuery(query: string) {
    this.searchQuery = query;
    this.filteredCities = [...this.cities];
    this.filterByContinent(this.selectedContinent || 'All');
    this.filterWithSearchQuery();
  }

  filterWithSearchQuery() {
    if (this.searchQuery) {
      this.filteredCities = this.filteredCities.filter((city) =>
        city.city.toLowerCase().startsWith(this.searchQuery.toLowerCase())
      );
    }
  }

  onFavouriteChanged(event: { city: any; isFavourite: boolean }) {
    // console.log(`City: ${city.city}, isFavourite: ${isFavourite}`);
    const { city, isFavourite } = event;
    city.isFavourite = isFavourite;

    if (isFavourite) {
      if (!this.favouriteCities.includes(city)) {
        this.favouriteCities.push(city);
      }
    } else {
      this.favouriteCities = this.favouriteCities.filter(
        (fav) => fav.city !== city.city
      );
    }
    // console.log('Favourite Cities: ', this.favouriteCities);
  }

  toogleFavourites() {
    this.showFavourites = !this.showFavourites;
  }
}
