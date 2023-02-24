import { Component, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { AuthService } from 'src/app/core/service/auth/auth.service';
import { LibraryService } from 'src/app/core/service/library/library.service';
import { IEntity } from '../../../entities/Entity.entity';
import { BooksBorrowed, CompleteBookBorrowedDetails } from '../../../entities/Library.entity';

@Component({
  selector: 'app-library-profile',
  templateUrl: './library-profile.component.html',
  styleUrls: ['./library-profile.component.css']
})
export class LibraryProfileComponent implements OnInit {

  borrowedBooks!:CompleteBookBorrowedDetails [];
  details: IEntity | undefined;

  constructor(private libraryService:LibraryService, private authService:AuthService) { }
  ngOnInit(): void {
    if(this.authService.getUser() === "teacher"){
      this.details = this.authService.getDetails("teacher")
    }else if(this.authService.getUser() === "student"){
      this.details = this.authService.getDetails("student")
    }
    this.DisplayBorrowedBooks()
  }

  
  DisplayBorrowedBooks(){
    this.borrowedBooks = this.libraryService.getBorrowedBooks(this.details?.Id)!
  }
  initiateReturn(bookID:string){
   
    this.libraryService.returnBook( this.authService.getDetails(this.authService.getUser()).entityId, bookID);
    this.DisplayBorrowedBooks()
  }
}
