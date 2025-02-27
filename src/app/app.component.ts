import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './services/weather.service';

import { firstValueFrom } from 'rxjs';
import { City } from './city';
import { HeaderComponent } from './header/header.component';
import { CityCardListComponent } from './city-card-list/city-card-list.component';
import { SearchCityComponent } from './search-city/search-city.component';
import { CityService } from './services/city.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
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

  // cities$ = this.cityService.filteredCities$;
  // showFavourites$ = this.cityService.showFavourites$;

  constructor(
    private weatherService: WeatherService,
    private cityService: CityService
  ) {}

  ngOnInit() {
    this.fetchWeatherData();
  }

  fetchWeatherData() {
    const weatherObservables = this.weatherService.getWeatherForAllCities();

    Promise.all(weatherObservables.map((obs) => firstValueFrom(obs)))
      .then((weatherResponses) => {
        const cities = weatherResponses.map((response, index) => {
          return {
            city: this.weatherService.getCities()[index].name,
            continent: this.weatherService.getContinents(response.timezone),
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

        this.cityService.setCities(cities);
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
}
