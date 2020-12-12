import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactauditComponent } from './contactaudit.component';

describe('ContactauditComponent', () => {
  let component: ContactauditComponent;
  let fixture: ComponentFixture<ContactauditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactauditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactauditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
