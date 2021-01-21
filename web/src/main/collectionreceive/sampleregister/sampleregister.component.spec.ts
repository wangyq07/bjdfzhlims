import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleregisterComponent } from './sampleregister.component';

describe('SampleregisterComponent', () => {
  let component: SampleregisterComponent;
  let fixture: ComponentFixture<SampleregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleregisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
