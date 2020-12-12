import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaittaskComponent } from './waittask.component';

describe('WaittaskComponent', () => {
  let component: WaittaskComponent;
  let fixture: ComponentFixture<WaittaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaittaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaittaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
