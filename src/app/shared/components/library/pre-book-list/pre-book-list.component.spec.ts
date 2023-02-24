import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreBookListComponent } from './pre-book-list.component';

describe('PreBookListComponent', () => {
  let component: PreBookListComponent;
  let fixture: ComponentFixture<PreBookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreBookListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
