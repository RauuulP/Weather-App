import {
  Component,
  computed,
  EventEmitter,
  Input,
  Output,
  signal,
  ChangeDetectionStrategy
} from '@angular/core';
import { City } from '../city';
import { CityCardComponent } from '../city-card/city-card.component';

@Component({
  selector: 'app-city-card-list',
  standalone: true,
  imports: [CityCardComponent],
  templateUrl: './city-card-list.component.html',
  styleUrl: './city-card-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CityCardListComponent {
  @Input() set cities(value: City[]) {
    this.citiesSignal.set(value);
  }

  @Input() set showFavouritesInitial(value: boolean) {
    this.showFavouritesSignal.set(value);
  }

  @Output() favouriteCheck = new EventEmitter<{
    city: City;
    isFavourite: boolean;
  }>();

  private citiesSignal = signal<City[]>([]);
  private showFavouritesSignal = signal(false);

  displayedCities = computed(() => {
    const cities = this.citiesSignal();
    const showFavourites = this.showFavouritesSignal();
    return showFavourites ? cities.filter((city) => city.isFavourite) : cities;
  });

  onFavouriteChanged(event: { city: City; isFavourite: boolean }) {
    this.favouriteCheck.emit(event);
  }
}
