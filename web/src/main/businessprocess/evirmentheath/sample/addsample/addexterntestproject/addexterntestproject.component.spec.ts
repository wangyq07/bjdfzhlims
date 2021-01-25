import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddexterntestprojectComponent } from './addexterntestproject.component';

describe('AddexterntestprojectComponent', () => {
  let component: AddexterntestprojectComponent;
  let fixture: ComponentFixture<AddexterntestprojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddexterntestprojectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddexterntestprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
