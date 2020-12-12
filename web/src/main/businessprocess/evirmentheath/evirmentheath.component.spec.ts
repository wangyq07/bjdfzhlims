import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvirmentheathComponent } from './evirmentheath.component';

describe('EvirmentheathComponent', () => {
  let component: EvirmentheathComponent;
  let fixture: ComponentFixture<EvirmentheathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvirmentheathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvirmentheathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
