import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BookModel} from "../models/book-model";
import {BooksApiService} from "./books-api.service";


@Injectable()
export class BooksService {


  constructor(private booksApiService: BooksApiService) {
  }

  getBooks(): Observable<BookModel[]> {
    return this.booksApiService.getBooks();
  };

  // getContractsByCustomerId(id): Observable<BookModel[]> {
  //   return this.contractApiService.getContractsByCustomerId(id);
  // };

}
