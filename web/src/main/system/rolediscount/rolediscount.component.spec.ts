import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolediscountComponent } from './rolediscount.component';

describe('RolediscountComponent', () => {
  let component: RolediscountComponent;
  let fixture: ComponentFixture<RolediscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolediscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolediscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
