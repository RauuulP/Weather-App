import { Component, EventEmitter, Input, Output, signal, ChangeDetectionStrategy } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() cities: City[] = [];
  @Input() favouriteCities: any[] = [];
  @Input() showFavouritesInitial: boolean = false;

  @Output() filter = new EventEmitter<string>();
  @Output() toogleFavourites = new EventEmitter<void>();

  private favouriteSignal = signal(this.showFavouritesInitial)
  showFavourites = this.favouriteSignal;

  onFilterChange(selectedContinent: string) {
    this.filter.emit(selectedContinent);
  }

  onToggleFavourites() {
    this.showFavourites.update((prevVal) => !prevVal)
    this.toogleFavourites.emit();
  }
}
