import { Injectable } from '@angular/core';
import moment from 'moment';
import { Subject } from 'rxjs';
import { IBorrowedBooks, Iprebook } from 'src/app/shared/components/library/books/books.component';
import { Book, BooksBorrowed, BorrowCart, CompleteBookBorrowedDetails, IBorrowCart } from 'src/app/shared/entities/Library.entity';
import borrowedList from 'src/assets/Dummy Data/BookBorrowData.json'

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor() { }
  borrowedBookList:BooksBorrowed[] = borrowedList;
  libraryBooks : Book[] = JSON.parse(localStorage.getItem("library")!)

  private borrowBooksSubject = new Subject<IBorrowedBooks>();
  private preBooksSubject = new Subject<Iprebook>()
  private removedBooksSubject = new Subject<string>();
  get borrowBookObservable(){
    return this.borrowBooksSubject.asObservable();
  }
  get removedBooksObservable(){
    return this.removedBooksSubject.asObservable();
  }
  
  get preBooksObservable(){
    return this.preBooksSubject.asObservable();
  }


 
  getLibraryData(){
    return JSON.parse(localStorage.getItem("library")!);
    
  }

  getBook(bookID:string){
    var books:Book[] = this.getLibraryData()
    // var books:Book[] = this.libraryBooks;
    for(var book of books){
      if(book.bookId === bookID){
        return book = new Book(book.bookId,book.bookName,book.imagePath, book.author, book.gist, book.status, book.quantity)
      }
    }
    return
  }

  getBorrowedBooks(entityId:string):CompleteBookBorrowedDetails [] | undefined{
    if(!localStorage.getItem("BorrowedBooks")){
    let BorrowedBookList: CompleteBookBorrowedDetails [] = []
    for(var each of borrowedList){
      if(each.entityId === entityId){
        for(var book of each.BookList){
            var bookDetails:Book = this.getBook(book.bookId)!
            var borrowedBook = new CompleteBookBorrowedDetails(book.bookId,bookDetails.bookName,bookDetails.imagePath,new Date(book.initialDate),new Date(book.returnDate));
            BorrowedBookList.push(borrowedBook)
        }
        return BorrowedBookList;
      }
    }}else{
      return JSON.parse(localStorage.getItem("BorrowedBooks")!)
    }
    return
  }

  makeBookAvailable(bookID:string){
    let libraryData: Book[] = this.getLibraryData();
    // let libraryData: Book[] = this.libraryBooks
    for(let each of libraryData){
      if(each.bookId === bookID){
        each.status = 'Available'
        localStorage.setItem("library", JSON.stringify(libraryData))
        break
      }
    }
  }

  returnBook(entityId:string, bookId:string){
      let BorrowedBookList: CompleteBookBorrowedDetails [] = JSON.parse(localStorage.getItem("BorrowedBooks")!)
    for(var each of BorrowedBookList){
      if(each.bookId === bookId){
        let beforeBorrowedBookList: CompleteBookBorrowedDetails [] = BorrowedBookList.splice(0,BorrowedBookList.indexOf(each))
        let afterBorrowedBookList: CompleteBookBorrowedDetails [] = BorrowedBookList.splice(BorrowedBookList.indexOf(each)+ 1, BorrowedBookList.length)
        let withoutBookReturned: CompleteBookBorrowedDetails [] = beforeBorrowedBookList.concat(afterBorrowedBookList)
        localStorage.setItem("BorrowedBooks", JSON.stringify(withoutBookReturned))
        this.makeBookAvailable(bookId);
        break
      }}
  }
  getInitialDate(){
    return moment();
  }
  getReturnDate(){
    let currentDate = moment()
    let returnDate =  moment(currentDate.add(8, 'days'));
    return returnDate;

  }
  getBorrowCart(){
    return JSON.parse(localStorage.getItem("LibraryBorrowCart")!)
  }
  removeFromBorrowCart( bookId:string, Bookarr?:IBorrowCart[], fieldName?:string):BorrowCart[] | undefined{
    this.removedBooksSubject.next(bookId);
    if(Bookarr && Bookarr.length > 0 && fieldName){
      return this.removeOjectWithId(Bookarr as[], bookId, fieldName);
    }
    return undefined;
  }

  preBookThisBook(bookInformation:Iprebook){
    this.preBooksSubject.next(bookInformation);
  }
  addToBorrowCart(bookInformation:IBorrowedBooks){
    this.borrowBooksSubject.next(bookInformation);
  }

  private removeOjectWithId(arr:[], id:string, fieldName:string){
    return arr.filter((obj) => obj[fieldName] !== id);
  }

  borrowTheseBooks(borrowBooks:IBorrowCart[]){
    let bookList: CompleteBookBorrowedDetails[] = JSON.parse(localStorage.getItem("BorrowedBooks")!);
    if(bookList.length >= 5){
      return "Maximum number of books borrowed. Please return the borrowed books"
    }else if(bookList.length < 5 && borrowBooks.length - 5 > bookList.length){
      return "You can only borrow " + (5-bookList.length) + " books."
    }else {
      borrowBooks.forEach((book:IBorrowCart)=>{
        let bookDetails: Book = this.getBook(book.bookId)!
        let completeBookBorrowDetails: CompleteBookBorrowedDetails = new CompleteBookBorrowedDetails(book.bookId, book.bookName, bookDetails.imagePath, new Date(this.getInitialDate().toISOString()), new Date(this.getReturnDate().toISOString()))
          this.libraryBooks.map((libraryBook)=>{
            if(book.bookId === libraryBook.bookId){
            libraryBook.status = "borrowed"
          }
          })
        bookList.push(completeBookBorrowDetails)
      })
      localStorage.setItem("library", JSON.stringify(this.libraryBooks))
      localStorage.setItem("BorrowedBooks", JSON.stringify(bookList))
      return "Successfully borrowed " + borrowBooks.length + " books." 
    }
  }
}
