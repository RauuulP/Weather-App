import {
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from '../filter/filter.component';
import { MatIconModule } from '@angular/material/icon';
import { City } from '../city';
import { CityService } from '../services/city.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FilterComponent, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  @Output() filter = new EventEmitter<string>();
  @Output() toogleFavourites = new EventEmitter<boolean>();

 
  onFilterChange(selectedContinent: string) {
    this.filter.emit(selectedContinent);
  }


  favouriteCities$ = this.cityService.favouriteCities$;
  showFavourites: boolean = false;

  constructor(private cityService: CityService) {}

  toogleFavouritesView(){
    this.showFavourites = !this.showFavourites;
    this.toogleFavourites.emit(this.showFavourites)
  }
}
