import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionistIndexComponent } from './receptionist-index.component';

describe('ReceptionistIndexComponent', () => {
  let component: ReceptionistIndexComponent;
  let fixture: ComponentFixture<ReceptionistIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceptionistIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionistIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
