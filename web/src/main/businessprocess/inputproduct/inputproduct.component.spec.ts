import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputproductComponent } from './inputproduct.component';

describe('InputproductComponent', () => {
  let component: InputproductComponent;
  let fixture: ComponentFixture<InputproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputproductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
