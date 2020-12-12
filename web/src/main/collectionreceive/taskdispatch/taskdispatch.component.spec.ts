import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskdispatchComponent } from './taskdispatch.component';

describe('TaskdispatchComponent', () => {
  let component: TaskdispatchComponent;
  let fixture: ComponentFixture<TaskdispatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskdispatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskdispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
