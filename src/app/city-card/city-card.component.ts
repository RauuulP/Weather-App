import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-city-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './city-card.component.html',
  styleUrl: './city-card.component.css',
})
export class CityCardComponent {
  @Input()
  city: any;

  @Output()
  favouriteCheck = new EventEmitter<{city: any, isFavourite: boolean}>();

  toogleFavourite() {
    this.city.isFavourite = !this.city.isFavourite;
    this.favouriteCheck.emit({city: this.city, isFavourite: this.city.isFavourite});
  }
}
