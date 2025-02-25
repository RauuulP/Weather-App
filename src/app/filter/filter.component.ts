import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CityService } from '../services/city.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {

  selectedContinent: string = 'All';

  constructor(private cityService: CityService) {}

  filterHandler() {
    this.cityService.filterCitiesByContinent(this.selectedContinent)
  }
}
