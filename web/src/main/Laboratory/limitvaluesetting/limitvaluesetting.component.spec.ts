import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitvaluesettingComponent } from './limitvaluesetting.component';

describe('LimitvaluesettingComponent', () => {
  let component: LimitvaluesettingComponent;
  let fixture: ComponentFixture<LimitvaluesettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimitvaluesettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitvaluesettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
