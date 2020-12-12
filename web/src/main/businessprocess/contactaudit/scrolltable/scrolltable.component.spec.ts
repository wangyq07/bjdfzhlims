import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrolltableComponent } from './scrolltable.component';

describe('ScrolltableComponent', () => {
  let component: ScrolltableComponent;
  let fixture: ComponentFixture<ScrolltableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrolltableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrolltableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
