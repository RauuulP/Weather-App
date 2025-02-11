import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CityService } from '../services/city.service';

@Component({
  selector: 'app-search-city',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './search-city.component.html',
  styleUrl: './search-city.component.css',
})
export class SearchCityComponent {
  @Output() search = new EventEmitter<string>();
  query: string = '';

  constructor(private cityService: CityService) {}

  onSearch(): void {
    this.cityService.searchCities(this.query);
  }

  clearSearch(): void {
    this.query = '';
    this.cityService.clearSearch()
  }
}
