import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConllectiontaskComponent } from './conllectiontask.component';

describe('ConllectiontaskComponent', () => {
  let component: ConllectiontaskComponent;
  let fixture: ComponentFixture<ConllectiontaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConllectiontaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConllectiontaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
