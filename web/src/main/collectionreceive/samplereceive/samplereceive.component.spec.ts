import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplereceiveComponent } from './samplereceive.component';

describe('SamplereceiveComponent', () => {
  let component: SamplereceiveComponent;
  let fixture: ComponentFixture<SamplereceiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SamplereceiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SamplereceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
