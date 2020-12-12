import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketauditComponent } from './marketaudit.component';

describe('MarketauditComponent', () => {
  let component: MarketauditComponent;
  let fixture: ComponentFixture<MarketauditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketauditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketauditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
