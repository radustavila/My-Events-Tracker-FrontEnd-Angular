import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DividedCostChartComponent } from './divided-cost-chart.component';

describe('DividedCostChartComponent', () => {
  let component: DividedCostChartComponent;
  let fixture: ComponentFixture<DividedCostChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DividedCostChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DividedCostChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
