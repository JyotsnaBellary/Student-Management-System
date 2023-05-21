import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidaysModalComponentComponent } from './holidays-modal-component.component';

describe('HolidaysModalComponentComponent', () => {
  let component: HolidaysModalComponentComponent;
  let fixture: ComponentFixture<HolidaysModalComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolidaysModalComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidaysModalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
