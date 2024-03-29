import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/service/crud/auth/auth.service';
import { LibraryService } from 'src/app/core/service/crud/library/library.service';
// import { LibraryService } from 'src/app/core/service/crud/library/library.service';
// import { LibraryService } from 'src/app/core/service/library/library.service';
import { BorrowCart, IBorrowCart } from 'src/app/shared/entities/Library.entity';

@Component({
  selector: 'app-borrow-cart',
  templateUrl: './borrow-cart.component.html',
  styleUrls: ['./borrow-cart.component.css']
})
export class BorrowCartComponent implements OnInit, OnDestroy {

  constructor(private libraryService:LibraryService,
              private router:Router,
              private authService:AuthService) { }
  
  borrowCart:IBorrowCart[] = [];
  private subscriptions:Subscription[] = [];
  disableBorrow!:boolean;
  ngOnInit(): void {
    this.subscriptions.push(this.libraryService.borrowBookObservable.subscribe((book)=>{
      let borrowCartItem: IBorrowCart = new BorrowCart(book.bookId, book.bookName, this.libraryService.getReturnDate().toISOString())
      this.borrowCart.push(borrowCartItem);
      if(this.borrowCart.length > 0){
        this.disableBorrow = false
      }else{this.disableBorrow = true}
  
    }))
    
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription:Subscription)=>{
      subscription.unsubscribe();
    })
  }


  removeBookFromCart(bookId:string){
   let remainingBorrowedBooks = this.libraryService.removeFromBorrowCart(bookId, this.borrowCart, "bookId")
   if(remainingBorrowedBooks ){
    this.borrowCart = remainingBorrowedBooks
   }
  }

  borrowBooks(borrowCart:IBorrowCart[]){
    let message = this.libraryService.borrowTheseBooks(borrowCart, this.authService.getUserId());
    alert(message)
    this.borrowCart = [];
    this.router.navigate(['library/myProfile']); 

  }
}
