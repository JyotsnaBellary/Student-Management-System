import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LibraryService } from 'src/app/core/service/library/library.service';
import { BorrowCart, IBorrowCart, preBook } from 'src/app/shared/entities/Library.entity';
import { Iprebook } from '../books/books.component';

@Component({
  selector: 'app-pre-book-list',
  templateUrl: './pre-book-list.component.html',
  styleUrls: ['./pre-book-list.component.css']
})
export class PreBookListComponent implements OnInit, OnDestroy {

  constructor( private libraryService:LibraryService) { }
  borrowCart:preBook[] = [];
  private subscriptions:Subscription[] = [];
  ngOnInit(): void {

    this.subscriptions.push(this.libraryService.preBooksObservable.subscribe((book)=>{
      let borrowCartItem: preBook = new preBook(book.bookId, book.bookName, book.fromDate, book.toDate)
      this.borrowCart.push(borrowCartItem);
      
    }))
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription:Subscription)=>{
      subscription.unsubscribe();
    })
  }
  removeBookFromPreBookList(bookId:string){
    
  }

}
