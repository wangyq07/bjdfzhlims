import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessprojectComponent } from './businessproject.component';

describe('BusinessprojectComponent', () => {
  let component: BusinessprojectComponent;
  let fixture: ComponentFixture<BusinessprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessprojectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
