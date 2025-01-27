import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-city',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './search-city.component.html',
  styleUrl: './search-city.component.css'
})
export class SearchCityComponent {

  @Output() search = new EventEmitter<string>();
  query: string = '';

  onSearch(): void {
    console.log('Search Query:', this.query);
    // this.query = (event.target as HTMLInputElement).value;
    this.search.emit(this.query)
  }

  clearSearch(): void{
    this.query = '';
    this.search.emit(this.query)
  }
}
