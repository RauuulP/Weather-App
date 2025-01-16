import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private baseURl = 'https://api.open-meteo.com/v1/forecast';

  private cities = [
    { name: 'Cluj-Napoca', lat: 46.7712, lon: 23.6236 },
    { name: 'Paris', lat: 48.8566, lon: 2.3522 },
    { name: 'New York', lat: 40.7128, lon: -74.006 },
    { name: 'Tokyo', lat: 35.6895, lon: 139.6917 },
    { name: 'London', lat: 51.5074, lon: -0.1278 },
    { name: 'Riyadh', lat: 24.7136, lon: 46.6753 },
    { name: 'Cairo', lat: 30.0444, lon: 31.2357 },
    { name: 'Sydney', lat: -33.8688, lon: 151.2093 },
    { name: 'Buenos Aires', lat: -34.6037, lon: -58.3816 },
  ];

  constructor(private http: HttpClient) {}

  getWeatherForCity(lat: number, lon: number): Observable<any> {
    const url = `${this.baseURl}?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;
    return this.http.get<any>(url);
  }

  getWeatherForAllCities(): Observable<any>[] {
    return this.cities.map((city) =>
      this.getWeatherForCity(city.lat, city.lon)
    );
  }

  getCityNames(): string[] {
    return this.cities.map((city) => city.name);
  }

  getCities() {
    return this.cities;
  }

  getContinents(continent: string): string | undefined {
    // console.log(continent)
    if (continent.includes('Europe')) return 'Europe';
    if (continent.includes('Asia')) return 'Asia';
    if (continent.includes('America')) return 'America';
    if (continent.includes('Africa')) return 'Africa';
    if (continent.includes('Australia')) return 'Australia';
    return 'Unknown';
  }
}
