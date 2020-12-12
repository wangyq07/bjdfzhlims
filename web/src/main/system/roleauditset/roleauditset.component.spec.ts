import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleauditsetComponent } from './roleauditset.component';

describe('RoleauditsetComponent', () => {
  let component: RoleauditsetComponent;
  let fixture: ComponentFixture<RoleauditsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleauditsetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleauditsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
