import {Component, Input, OnInit} from '@angular/core';
import {BookModel} from "../models/book-model";

@Component({
  selector: 'book-item',
  template: `
    <section class="product product-list-item">
      <div class="row">
        <div class="col-xs-3">
          <!-- hardcode url its temporary, - will be changed after integration with backend;  -->
          <img [src]="book.thumbnail">
        </div>
        <div class="col-xs-6">
          <div class="info">Some info</div>
        </div>
        <div class="col-xs-3">
        </div>
      </div>
    </section><!-- /.product-list-item -->
  `,
  styleUrls: ['./book-item.component.scss']
})
export class BookItemComponent implements OnInit {
  @Input() book: BookModel;

  constructor() { }

  ngOnInit() {
  }

}
