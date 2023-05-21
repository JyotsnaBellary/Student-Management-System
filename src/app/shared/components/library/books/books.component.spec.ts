import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { BooksComponent } from './books.component';
import { PreBookListComponent } from '../pre-book-list/pre-book-list.component';
import { BorrowCartComponent } from '../borrow-cart/borrow-cart.component';
import { HttpClientModule } from '@angular/common/http';

describe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksComponent, PreBookListComponent,  BorrowCartComponent],
      imports:[ RouterTestingModule, RouterTestingModule.withRoutes([]),
               RouterModule, HttpClientModule
              ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
