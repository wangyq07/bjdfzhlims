import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitvalueauditComponent } from './limitvalueaudit.component';

describe('LimitvalueauditComponent', () => {
  let component: LimitvalueauditComponent;
  let fixture: ComponentFixture<LimitvalueauditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimitvalueauditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitvalueauditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
