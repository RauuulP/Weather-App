import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityCardListComponent } from './city-card-list.component';

describe('CityCardListComponent', () => {
  let component: CityCardListComponent;
  let fixture: ComponentFixture<CityCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityCardListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CityCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
