import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtoauditComponent } from './ctoaudit.component';

describe('CtoauditComponent', () => {
  let component: CtoauditComponent;
  let fixture: ComponentFixture<CtoauditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtoauditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CtoauditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
