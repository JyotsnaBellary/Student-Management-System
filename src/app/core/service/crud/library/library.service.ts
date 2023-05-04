import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';
import { Observable, Subject, catchError, map, throwError } from 'rxjs';
import { IBorrowedBooks, Iprebook } from 'src/app/shared/components/library/books/books.component';
import { CompleteBookBorrowedDetails, Book, IBorrowCart, BorrowCart } from 'src/app/shared/entities/Library.entity';
import { ILogin } from 'src/app/shared/entities/login.entity';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  REST_API: string = 'http://localhost:8880';
  
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
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


  constructor(private http: HttpClient, private router: Router) {}

  getLibraryData(): Observable<any> {
    let API_URL = `${this.REST_API}/books`;
    return this.http
      .get(API_URL)
      .pipe(
        map((res: any) => {
          return res || {};
        })  
      );
  }

  getBookDetails(bookId: string){
    let API_URL = `${this.REST_API}/Book/${bookId}`;
    return this.http
    .get(API_URL)
    .pipe(map((res: any) => {
        return res || {};
      }))
  }

    getBorrowedBooks():CompleteBookBorrowedDetails[] | undefined{
    let API_URL = `${this.REST_API}/borrowedBook/`;
    // console.log(entityId)
    let BorrowedBookList: CompleteBookBorrowedDetails [] = []
    let borrowedbooks = this.http
    .get(API_URL)
    .pipe(map((res: any) => {
        return res || {};
      })).subscribe(res => {
        // const books:[] = JSON.parse(res.bookData)
        // console.log(res.bookData[0])
        if(res.bookData.length > 0){
        for(let i = 0; i< res.bookData.length; i++){
          
          this.getBookDetails(res.bookData[i].bookId).subscribe(res1 => {
            console.log(res1.bookData)
            var borrowedBook = new CompleteBookBorrowedDetails(res.bookData[i].bookId,res1.bookData.bookName,res1.bookData.imagePath,res.bookData[i].borrowedDate,res.bookData[i].returnDate);
            BorrowedBookList.push(borrowedBook)
          })     
        }}
      });
      // console.log(BorrowedBookList)
        return BorrowedBookList;
  }

  // makeBookAvailable(bookID:string){
  //   let libraryData: Book[] = this.getLibraryData();
  //   // let libraryData: Book[] = this.libraryBooks
  //   for(let each of libraryData){
  //     if(each.bookId === bookID){
  //       each.status = 'Available'
  //       localStorage.setItem("library", JSON.stringify(libraryData))
  //       break
  //     }
  //   }
  // }

  returnBook(userId:string, bookId:string){
    // console.log("here");
    let API_URL = `${this.REST_API}/returnBook/${userId}/${bookId}`;
    return this.http
    .get(API_URL)
    .pipe(map((res: any) => {
        return res || {};
      }))
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
    console.log(bookInformation)
    this.borrowBooksSubject.next(bookInformation);
  }

  private removeOjectWithId(arr:[], id:string, fieldName:string){
    return arr.filter((obj) => obj[fieldName] !== id);
  }

  borrowTheseBooks(borrowBooks:IBorrowCart[], entityId: string){
    // let bookList: CompleteBookBorrowedDetails[] = JSON.parse(localStorage.getItem("BorrowedBooks")!);
    let bookList: CompleteBookBorrowedDetails[] = this.getBorrowedBooks()!;
    console.log(bookList)
    if(bookList.length >= 5){
      console.log("checked")
      return "Maximum number of books borrowed. Please return the previously borrowed books!"
    }else if(bookList.length < 5 && 5 < bookList.length + borrowBooks.length){
      console.log(bookList.length)
      return "You can only borrow " + (5-bookList.length) + " books."
    }else {
      borrowBooks.forEach((book:IBorrowCart)=>{
        // this.getBookDetails(book.bookId).subscribe(res => {
          // let bookDetails: Book = res.bookData;
          // let completeBookBorrowDetails: CompleteBookBorrowedDetails = new CompleteBookBorrowedDetails(book.bookId, book.bookName, bookDetails.imagePath, new Date(this.getInitialDate().toISOString()), new Date(this.getReturnDate().toISOString()))
          // bookList.push(completeBookBorrowDetails)
          let API_URL = `${this.REST_API}/borrowBook`;
              this.http.post<{
              userId:string;
              bookId:string;
              returnDate:string;
            }>(API_URL, {
              userId: entityId,
              bookId: book.bookId,
              returnDate: new Date(this.getReturnDate().toISOString())
            }).subscribe(res => console.log(res))
            // BorrowedBookList.push(borrowedBook)
          })  
        // });
        console.log(bookList)
        // let bookDetails: Book = this.getBook(book.bookId)!
          // this.libraryBooks.map((libraryBook)=>{
          //   if(book.bookId === libraryBook.bookId){
          //   libraryBook.status = "borrowed"
          // }
          // })
      // })
      // localStorage.setItem("library", JSON.stringify(this.libraryBooks))
      // localStorage.setItem("BorrowedBooks", JSON.stringify(bookList))
      return "Successfully borrowed " + borrowBooks.length + " books." 
    }
  }
}
