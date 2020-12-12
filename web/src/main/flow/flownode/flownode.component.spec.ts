import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlownodeComponent } from './flownode.component';

describe('FlownodeComponent', () => {
  let component: FlownodeComponent;
  let fixture: ComponentFixture<FlownodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlownodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlownodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
