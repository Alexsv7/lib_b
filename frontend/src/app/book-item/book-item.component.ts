import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {BookModel} from "../models/book-model";
import {BooksService} from "../services/books.service";

@Component({
  selector: 'book-item',
  template: `
    <section class="book book-list-item">
      <a  [routerLink]="['/books', book._id]">
        
      <div class="row">
        <div class="col-xs-3">
          <!-- hardcode url its temporary, - will be changed after integration with backend;  -->
          <img class="img-thumbnail" [src]="book.thumbnail">
        </div>
        <div class="col-xs-6">
          <div class="info">{{ book.name }}</div>
        </div>
        <div class="col-xs-3">

        </div>
      </div>
      </a>
      <button type="button" class="btn btn-danger btn-xs delete"
              (click)="deleteBook(book._id)">
        <span class="glyphicon glyphicon-trash"></span> Remove
      </button>
      
      <button *ngIf="!book.isPersonal" type="button" class="btn btn-default btn-xs read"
              (click)="book.isPersonal = true">
        <span class="glyphicon"></span> Mark as read
      </button>

      <button *ngIf="book.isPersonal" type="button" class="btn btn-success btn-xs read">
        <span class="glyphicon glyphicon-ok"></span> Already read
      </button>
    </section><!-- /.book-list-item -->
  `,
  styleUrls: ['./book-item.component.scss']
})
export class BookItemComponent implements OnInit,OnChanges {
  @Input() book: BookModel;
  @Output() onDeleted = new EventEmitter<string>();
  readed: boolean;

  constructor(private bookService: BooksService) { }

  ngOnInit() {
  }

  ngOnChanges(){

  }
  deleteBook(id: string):void{
    this.bookService.deleteBook(id)
      .subscribe((book: BookModel) => {
          console.log(book);
          this.onDeleted.emit(id);

        }
      );
  }

  markAsRead(book:BookModel){
    book
  }

}
