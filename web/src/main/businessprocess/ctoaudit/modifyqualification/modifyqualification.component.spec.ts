import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyqualificationComponent } from './modifyqualification.component';

describe('ModifyqualificationComponent', () => {
  let component: ModifyqualificationComponent;
  let fixture: ComponentFixture<ModifyqualificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyqualificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyqualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
