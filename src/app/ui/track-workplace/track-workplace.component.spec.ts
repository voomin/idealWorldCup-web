import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackWorkplaceComponent } from './track-workplace.component';

describe('TrackWorkplaceComponent', () => {
  let component: TrackWorkplaceComponent;
  let fixture: ComponentFixture<TrackWorkplaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackWorkplaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackWorkplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
