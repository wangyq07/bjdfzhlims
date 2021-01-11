import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifytaskdispatchComponent } from './modifytaskdispatch.component';

describe('ModifytaskdispatchComponent', () => {
  let component: ModifytaskdispatchComponent;
  let fixture: ComponentFixture<ModifytaskdispatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifytaskdispatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifytaskdispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
