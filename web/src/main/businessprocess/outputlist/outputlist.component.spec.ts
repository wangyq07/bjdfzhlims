import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputlistComponent } from './outputlist.component';

describe('OutputlistComponent', () => {
  let component: OutputlistComponent;
  let fixture: ComponentFixture<OutputlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutputlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
