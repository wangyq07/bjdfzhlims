import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputpricecaculateComponent } from './inputpricecaculate.component';

describe('InputpricecaculateComponent', () => {
  let component: InputpricecaculateComponent;
  let fixture: ComponentFixture<InputpricecaculateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputpricecaculateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputpricecaculateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
