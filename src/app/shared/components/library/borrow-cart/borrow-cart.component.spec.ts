import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BorrowCartComponent } from './borrow-cart.component';

describe('BorrowCartComponent', () => {
  let component: BorrowCartComponent;
  let fixture: ComponentFixture<BorrowCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowCartComponent ],
      imports:[RouterTestingModule.withRoutes([]), HttpClientModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
