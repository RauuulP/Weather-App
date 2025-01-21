import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterComponent } from '../filter/filter.component';
import { City } from '../city';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FilterComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input()
  cities: City[] = [];

  @Input()
  favouriteCities: any[] = [];

  @Input()
  showFavourites = false;

  @Output()
  filter = new EventEmitter<string>();

  @Output()
  toogleFavourites = new EventEmitter<void>();

  onFilterChange(selectedContinent: string) {
    this.filter.emit(selectedContinent);
  }

  onToggleFavourites() {
    this.toogleFavourites.emit();
  }
}
