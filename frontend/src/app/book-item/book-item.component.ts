import {Component, Input, OnInit} from '@angular/core';
import {BookModel} from "../models/book-model";

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
          <div class="info">Some info</div>
        </div>
        <div class="col-xs-3">

        </div>
      </div>
      </a>
    </section><!-- /.book-list-item -->
  `,
  styleUrls: ['./book-item.component.scss']
})
export class BookItemComponent implements OnInit {
  @Input() book: BookModel;

  // pdfSrc:string ="/assets/files/1quart.pdf";
  page: number = 100;


  constructor() { }

  ngOnInit() {
  }

}
