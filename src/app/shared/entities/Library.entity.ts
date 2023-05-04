export interface IbookDetails{
    author:string;
    gist:string;
}
export interface IBorrowCart{
    bookId:string;
    bookName:string;
    returnDate:string;
}
export class BorrowCart{
    bookId:string;
    bookName:string;
    returnDate:string;
    constructor(bookId:string, bookName:string, returnDate:string)
    {
    this.bookId = bookId;
    this.bookName = bookName;
    this.returnDate = returnDate;
    }
}
export class Book{
    bookId:string;
    bookName:string;
    imagePath:string;
    // bookDetails: IbookDetails;
    author:string;
    gist:string;
    status:string;
    quantity:number;
    isAddedToCart?:boolean;
    isBorrowed?:boolean;
    constructor(bookId:string,
        bookName:string,
        imagePath:string,
        // bookDetails: IbookDetails,
        author:string,
        gist:string,
        status:string,
        quantity:number){

            this.bookId = bookId;
            this.bookName = bookName;
            this.imagePath = imagePath;
            // this.bookDetails = bookDetails;
            this.author = author;
            this.gist = gist;
            this.status = status;
            this.quantity = quantity;
        }
}

export interface IBookBorrowed{
    bookId:string;
    initialDate:string;
    returnDate:String;


}

export class preBook{
    bookId:string;
    bookName:string;
    fromDate:string;
    toDate:string;
    constructor(bookId:string,
        bookName:string,
        fromDate:string,
        toDate:string){
    this.bookId = bookId;
    this.bookName = bookName;
    this.fromDate = fromDate;
    this.toDate = toDate;
    }
  }
export class BooksBorrowed{
    entityId:string;
    BookList?:IBookBorrowed[];
    
    constructor(entityId:string, 
        firstBook?:IBookBorrowed){
        this.entityId = entityId;
        
    }
}

export class CompleteBookBorrowedDetails{
    bookId:string;
    bookName:string;
    imagePath:string;
    initialDate:Date;
    returnDate:Date;
    constructor( bookId:string,
        bookName:string,
        imagePath:string,
        initialDate:Date,
        returnDate:Date,){
            this.bookId = bookId;
            this.bookName = bookName;
            this.imagePath = imagePath;
            this.initialDate = initialDate;
            this.returnDate = returnDate;
        }
}