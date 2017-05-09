import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {BooksComponent} from "./book-list/book-list.component";
import {WishlistComponent} from "./wishlist/wishlist.component";
import {BooksService} from "./services/books.service";
import {BooksApiService} from "./services/books-api.service";
import {BookItemComponent} from "./book-item/book-item.component";
import {PdfViewerComponent} from "ng2-pdf-viewer";
import {BookViewComponent} from './book-view/book-view.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import {FileDropDirective, FileSelectDirective} from "ng2-file-upload";


let appRoutes: Routes = [
  {
    path: '',
    component: BooksComponent
  },
  {
    path: 'books',
    component: BooksComponent
  },
  {
    path: 'wishlist',
    component: WishlistComponent
  },

  {
    path: 'books/:id',
    component: BookViewComponent
  },
  {
    path: 'add-book',
    component: FileUploaderComponent
  }


];

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    SidebarComponent,
    WishlistComponent,
    BookItemComponent,
    PdfViewerComponent,
    BookViewComponent,
    FileUploaderComponent,
    FileSelectDirective,
    FileDropDirective
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule
  ],
  providers: [BooksService, BooksApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
