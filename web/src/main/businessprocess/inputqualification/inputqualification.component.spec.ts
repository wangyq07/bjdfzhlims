import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputqualificationComponent } from './inputqualification.component';

describe('InputqualificationComponent', () => {
  let component: InputqualificationComponent;
  let fixture: ComponentFixture<InputqualificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputqualificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputqualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
