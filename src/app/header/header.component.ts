import {
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from '../filter/filter.component';
import { MatIconModule } from '@angular/material/icon';
import { CityService } from '../services/city.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FilterComponent, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  showFavourites$: Observable<boolean> = this.cityService.showFavourites$;

  constructor(private cityService: CityService) {}


  toogleFavouritesView(){
    this.cityService.toggleFavouritesView()
  }
}
