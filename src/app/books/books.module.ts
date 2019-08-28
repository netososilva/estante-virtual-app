import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BooksListComponent } from './books-list/books-list.component';
import { BookComponent } from './book/book.component';
import { BOOKS_ROUTES } from './books.routes';
import { SharedModule } from '../shared/shared.module';
import { BooksService } from './books.service';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookInsertComponent } from './book-insert/book-insert.component';
import { BooksToInsertComponent } from './books-to-insert/books-to-insert.component';

@NgModule({
  declarations: [
    BooksListComponent, 
    BookComponent, 
    BookDetailComponent, 
    BookInsertComponent, BooksToInsertComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(BOOKS_ROUTES),
    SharedModule
  ],
  providers: [
    BooksService
  ]
})
export class BooksModule { }
