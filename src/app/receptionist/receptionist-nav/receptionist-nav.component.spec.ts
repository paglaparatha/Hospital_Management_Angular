import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionistNavComponent } from './receptionist-nav.component';

describe('ReceptionistNavComponent', () => {
  let component: ReceptionistNavComponent;
  let fixture: ComponentFixture<ReceptionistNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceptionistNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionistNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
