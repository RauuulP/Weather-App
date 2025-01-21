import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from '../filter/filter.component';
import { MatIconModule } from '@angular/material/icon';
import { City } from '../city';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FilterComponent, MatIconModule],
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
