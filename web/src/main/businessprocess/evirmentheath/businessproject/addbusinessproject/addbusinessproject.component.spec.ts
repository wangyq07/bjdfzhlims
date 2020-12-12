import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbusinessprojectComponent } from './addbusinessproject.component';

describe('AddbusinessprojectComponent', () => {
  let component: AddbusinessprojectComponent;
  let fixture: ComponentFixture<AddbusinessprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddbusinessprojectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddbusinessprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
