import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatesampleComponent } from './updatesample.component';

describe('UpdatesampleComponent', () => {
  let component: UpdatesampleComponent;
  let fixture: ComponentFixture<UpdatesampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatesampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatesampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
