import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddqualificaitonComponent } from './addqualificaiton.component';

describe('AddqualificaitonComponent', () => {
  let component: AddqualificaitonComponent;
  let fixture: ComponentFixture<AddqualificaitonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddqualificaitonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddqualificaitonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
