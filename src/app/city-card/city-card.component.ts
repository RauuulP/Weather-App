import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { City } from '../city';

@Component({
  selector: 'app-city-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './city-card.component.html',
  styleUrl: './city-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CityCardComponent {
  @Input()
  city!: City;

  @Output()
  favouriteCheck = new EventEmitter<{ city: any; isFavourite: boolean }>();

  toogleFavourite() {
    this.city.isFavourite = !this.city.isFavourite;
    this.favouriteCheck.emit({
      city: this.city,
      isFavourite: this.city.isFavourite,
    });
  }
}
