import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Book } from 'src/app/shared/entities/Library.entity';
import { LibraryService } from '../../../../core/service/library/library.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, OnDestroy {

  constructor(private libraryService:LibraryService) { }
  
  libraryBooks:Book[] = []
  private unsubscribeFromObservables = new Subject();


  ngOnInit(): void {
    this.libraryBooks = this.libraryService.getLibraryData();
    
    this.libraryBooks.forEach((book:Book)=>{
      if(book.status === "borrowed"){
        book.isBorrowed = true
      }
    })
    this.libraryService.removedBooksObservable
    .pipe(takeUntil(this.unsubscribeFromObservables))
    .subscribe((bookId:string)=>{
      if(this.libraryBooks.length > 0){
        this.libraryBooks.map((book)=>{
          if(book.bookId === bookId){
          book.isAddedToCart = false;
        }
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.unsubscribeFromObservables.next(undefined);
    this.unsubscribeFromObservables.complete();
  }

  addToBorrowCart(book:Book){
    book.isAddedToCart = true;
    this.libraryService.addToBorrowCart({bookId:book.bookId, bookName:book.bookName} as IBorrowedBooks);
  }

  preBookThisBook(book:Book){
    book.isAddedToCart = true;
    let fromDate = new Date()
    let toDate = new Date()
    this.libraryService.preBookThisBook({bookId:book.bookId, bookName:book.bookName, fromDate:fromDate.toISOString(), toDate:toDate.toISOString()} as Iprebook);
  }

}
export interface IBorrowedBooks{
  bookId:string;
  bookName:string;
}
export interface Iprebook{
  bookId:string;
  bookName:string;
  fromDate:string;
  toDate:string;
}