import { Component, EventEmitter, Input, Output } from '@angular/core';
import { City } from '../city';
import { CityCardComponent } from '../city-card/city-card.component';

@Component({
  selector: 'app-city-card-list',
  standalone: true,
  imports: [CityCardComponent],
  templateUrl: './city-card-list.component.html',
  styleUrl: './city-card-list.component.css'
})
export class CityCardListComponent {

    @Input()
    cities: City[] = [];

    @Input()
    showFavourites = false;

    @Output()
    favouriteCheck = new EventEmitter<{ city: City; isFavourite: boolean}>();

    get displayedCities(): City[]{
      if (this.showFavourites){
        return this.cities.filter((city) => city.isFavourite)
      }
      return this.cities;
    }

    onFavouriteChanged(event: { city: City; isFavourite: boolean}) {
      this.favouriteCheck.emit(event)
    }
}
