import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterfoodsampleComponent } from './registerfoodsample.component';

describe('RegisterfoodsampleComponent', () => {
  let component: RegisterfoodsampleComponent;
  let fixture: ComponentFixture<RegisterfoodsampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterfoodsampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterfoodsampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
