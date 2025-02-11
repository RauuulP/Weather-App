import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { CityCardComponent } from '../city-card/city-card.component';
import { City } from '../city';
import { CityService } from '../services/city.service';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [CityCardComponent, AsyncPipe],
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent {
  favouriteCities$ = this.cityService.favouriteCities$;

  constructor(private cityService: CityService) {}

  onFavouriteChange(event: { isFavourite: boolean; city: City }) {
    this.cityService.toogleFavourites(event.city, event.isFavourite);
  }
}
