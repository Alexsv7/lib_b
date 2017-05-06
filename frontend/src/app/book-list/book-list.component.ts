import {Component, OnInit} from '@angular/core';
import {BooksService} from "../services/books.service";
import {BookModel} from "../models/book-model";

@Component({
  selector: 'book-list',
  template: `
    <section class="books__list" *ngIf="books">
      <book-item *ngFor="let book of books" [book]="book"></book-item>
    </section>
  `,

  styleUrls: ['./books.component.scss'],
  providers: [BooksService]

})

export class BooksComponent implements OnInit {

  books: BookModel[] = [];

  constructor(private bookService: BooksService) {
  }

  ngOnInit() {
    this.getBooksList();
  }

  getBooksList(): void {
    this.bookService.getBooks()
      .subscribe((books: BookModel[]) => {
          this.books = books;
          console.log(this.books);
        }
      );
  }

}
