import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyExpensesChartComponent } from './monthly-expenses-chart.component';

describe('MonthlyExpensesChartComponent', () => {
  let component: MonthlyExpensesChartComponent;
  let fixture: ComponentFixture<MonthlyExpensesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyExpensesChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyExpensesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
