import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplesupplementComponent } from './samplesupplement.component';

describe('SamplesupplementComponent', () => {
  let component: SamplesupplementComponent;
  let fixture: ComponentFixture<SamplesupplementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SamplesupplementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SamplesupplementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
