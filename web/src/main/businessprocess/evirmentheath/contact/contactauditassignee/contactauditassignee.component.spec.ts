import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactauditassigneeComponent } from './contactauditassignee.component';

describe('ContactauditassigneeComponent', () => {
  let component: ContactauditassigneeComponent;
  let fixture: ComponentFixture<ContactauditassigneeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactauditassigneeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactauditassigneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
