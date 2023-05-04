import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { LibraryService } from 'src/app/core/service/crud/library/library.service';
import { IbookDetails } from 'src/app/shared/entities/Library.entity';
import { Book } from 'src/app/shared/entities/Library.entity';
// import { LibraryService } from '../../../../core/service/library/library.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, OnDestroy {

  constructor(private libraryService:LibraryService) { }
  
  libraryBooks:Book[] = [];
  private unsubscribeFromObservables = new Subject();


  ngOnInit(): void {
    // this.libraryBooks = this.libraryService.getLibraryData();
    this.libraryService.getLibraryData().subscribe(res => {
      // res:[] = JSON.parse(res.bookData);
      // for(let book in res.bookData){
      //   book = JSON.parse(book);
      //   this.libraryBooks.push(new Book(book.bookId, book.bookName, book.imagePath, { author: book.author, gist : book.gist} as IbookDetails, book.status, book.quantity))
      // }
      this.libraryBooks = res.bookData;
      this.isBorrowed();
    console.log(this.libraryBooks)
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
    });
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
    let fromDate = new Date();
    let toDate = new Date();
    this.libraryService.preBookThisBook({bookId:book.bookId, bookName:book.bookName, fromDate:fromDate.toISOString(), toDate:toDate.toISOString()} as Iprebook);
  }

  isBorrowed(){
    (this.libraryBooks || []).forEach((book:Book)=>{
      if(book.status === "borrowed"){
        console.log(book.author)
        book.isBorrowed = true;
      }
    })
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