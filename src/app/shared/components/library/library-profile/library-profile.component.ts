import { Component, OnInit } from '@angular/core';
import { Moment } from 'moment';
// import { AuthService } from 'src/app/core/service/auth/auth.service';
// import { LibraryService } from 'src/app/core/service/library/library.service';
import { IEntity } from '../../../entities/Entity.entity';
import { BooksBorrowed, CompleteBookBorrowedDetails } from '../../../entities/Library.entity';
import { LibraryService } from 'src/app/core/service/crud/library/library.service';
import { AuthService } from 'src/app/core/service/crud/auth/auth.service';

@Component({
  selector: 'app-library-profile',
  templateUrl: './library-profile.component.html',
  styleUrls: ['./library-profile.component.css']
})
export class LibraryProfileComponent implements OnInit {

  borrowedBooks!:CompleteBookBorrowedDetails [];
  details: IEntity | undefined;
  message !: string;
  constructor(private libraryService:LibraryService, private authService:AuthService) { }
  ngOnInit(): void {
    // if(this.authService.getUserRole() === "teacher"){
    //   // this.details = this.authService.getDetails("teacher")
    // }else if(this.authService.getUserRole() === "student"){
    //   this.details = this.authService.getDetails("student")
    // }
    this.DisplayBorrowedBooks()
  }

  
  DisplayBorrowedBooks(){
    this.borrowedBooks = this.libraryService.getBorrowedBooks()!
    // this.borrowedBooks = this.libraryService.getBorrowedBooks(this.details?.Id)!
    if (this.borrowedBooks.length === 0){
      this.message = 'No books have been borrowed yet';
    }else {
      this.message = "";
    }
  }

  initiateReturn(bookID:string){
    console.log(bookID)
    // this.libraryService.returnBook( this.authService.getDetails(this.authService.getUser()).entityId, bookID);
    this.libraryService.returnBook(this.authService.getUserId(), bookID).subscribe(res => {
      console.log(res, "res")
      this.borrowedBooks = this.libraryService.getBorrowedBooks()!
    });
    // this.DisplayBorrowedBooks()
  }
}
