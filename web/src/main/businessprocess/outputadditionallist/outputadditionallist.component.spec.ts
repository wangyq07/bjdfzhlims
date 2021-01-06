import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputadditionallistComponent } from './outputadditionallist.component';

describe('OutputadditionallistComponent', () => {
  let component: OutputadditionallistComponent;
  let fixture: ComponentFixture<OutputadditionallistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutputadditionallistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputadditionallistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
