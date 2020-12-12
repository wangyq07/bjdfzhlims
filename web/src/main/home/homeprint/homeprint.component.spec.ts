import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeprintComponent } from './homeprint.component';

describe('HomeprintComponent', () => {
  let component: HomeprintComponent;
  let fixture: ComponentFixture<HomeprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
