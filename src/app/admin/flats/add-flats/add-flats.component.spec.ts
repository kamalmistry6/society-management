import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFlatsComponent } from './add-flats.component';

describe('AddFlatsComponent', () => {
  let component: AddFlatsComponent;
  let fixture: ComponentFixture<AddFlatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddFlatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFlatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
