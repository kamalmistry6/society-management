import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecurringExpensesComponent } from './add-recurring-expenses.component';

describe('AddRecurringExpensesComponent', () => {
  let component: AddRecurringExpensesComponent;
  let fixture: ComponentFixture<AddRecurringExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddRecurringExpensesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRecurringExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
