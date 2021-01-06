import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyqualificationmethodComponent } from './modifyqualificationmethod.component';

describe('ModifyqualificationmethodComponent', () => {
  let component: ModifyqualificationmethodComponent;
  let fixture: ComponentFixture<ModifyqualificationmethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyqualificationmethodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyqualificationmethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
