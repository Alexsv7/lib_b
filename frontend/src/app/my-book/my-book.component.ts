import { Component, OnInit } from '@angular/core';
import {BooksService} from "../services/books.service";
import {BooksComponent} from "../book-list/book-list.component";

@Component({
  selector: 'app-my-book',
  templateUrl: './my-book.component.html',
  styleUrls: ['./my-book.component.css'],
  providers: [BooksService],


})
export class MyBookComponent implements OnInit {

  constructor(private bookService: BooksService) { }

  ngOnInit() {
  }

}
