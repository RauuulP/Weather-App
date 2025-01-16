import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CityCardComponent } from '../city-card/city-card.component';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [CityCardComponent],
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent {
  @Input()
  favouriteCities: any[] = [];

  @Output()
  favouriteCheck = new EventEmitter<{ city: any; isFavourite: boolean }>();

  
  onFavouriteChange(event: {isFavourite: boolean, city: any}) {
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
    this.favouriteCheck.emit({city, isFavourite});
  }
}
