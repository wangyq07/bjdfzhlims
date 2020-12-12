import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddflownodeComponent } from './addflownode.component';

describe('AddflownodeComponent', () => {
  let component: AddflownodeComponent;
  let fixture: ComponentFixture<AddflownodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddflownodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddflownodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
