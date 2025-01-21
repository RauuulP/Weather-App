import { Component, EventEmitter, NgModule, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  @Output()
  filter = new EventEmitter<string>();

  selectedContinent: string = 'All';

  filterHandler() {
    this.filter.emit(this.selectedContinent);
  }
}
