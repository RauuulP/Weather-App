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
<<<<<<< HEAD
    const { city, isFavourite } = event;
    if (!isFavourite) {
      this.favouriteCities = this.favouriteCities.filter(
        (fav) => fav.city !== city.city
      );
    } else {
      if (!this.favouriteCities.some((fav) => fav.city === city.city)) {
        this.favouriteCities.push(city);
      }
    }
    this.favouriteCheck.emit({ city, isFavourite });
=======
    this.cityService.toogleFavourites(event.city, event.isFavourite);
>>>>>>> Code-refactoring
  }
}
