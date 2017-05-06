import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {BooksComponent} from "./book-list/book-list.component";
import {WishlistComponent} from "./wishlist/wishlist.component";
import {BooksService} from "./services/books.service";
import {BooksApiService} from "./services/books-api.service";
import {BookItemComponent} from "./book-item/book-item.component";



let appRoutes:Routes =[
  {
    path:'',
    component:BooksComponent
  },
  {
    path:'books',
    component:BooksComponent
  },
  {
    path:'wishlist',
    component:WishlistComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    SidebarComponent,
    WishlistComponent,
    BookItemComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule
  ],
  providers: [BooksService,BooksApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
