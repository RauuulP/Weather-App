import {
  Component,
  computed,
  EventEmitter,
  Input,
  Output,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { City } from '../city';
import { CityCardComponent } from '../city-card/city-card.component';
import { map, Observable } from 'rxjs';
import { CityService } from '../services/city.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-city-card-list',
  standalone: true,
  imports: [CityCardComponent, CommonModule],
  templateUrl: './city-card-list.component.html',
  styleUrl: './city-card-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardListComponent {
  cities$: Observable<City[]> = this.cityService.filteredCities$;
  showFavourites$: Observable<boolean> = this.cityService.showFavourites$;

  constructor(private cityService: CityService) {}

  onFavouriteChanged(event: { city: City; isFavourite: boolean }) {
    this.cityService.toogleFavourites(event.city, event.isFavourite);
  }
}
