import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDoneComponent } from './confirmation-done.component';

describe('ConfirmationDoneComponent', () => {
  let component: ConfirmationDoneComponent;
  let fixture: ComponentFixture<ConfirmationDoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationDoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
