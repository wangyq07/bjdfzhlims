import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowregisterComponent } from './flowregister.component';

describe('FlowregisterComponent', () => {
  let component: FlowregisterComponent;
  let fixture: ComponentFixture<FlowregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
