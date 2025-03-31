import { TestBed } from '@angular/core/testing';

import { RecurringExpensesService } from './recurring-expenses.service';

describe('RecurringExpensesService', () => {
  let service: RecurringExpensesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecurringExpensesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
