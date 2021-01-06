import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmethodqualificationComponent } from './addmethodqualification.component';

describe('AddmethodqualificationComponent', () => {
  let component: AddmethodqualificationComponent;
  let fixture: ComponentFixture<AddmethodqualificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddmethodqualificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmethodqualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
