import { Routes } from '@angular/router'

import { BooksListComponent } from './books-list/books-list.component';
import { BookInsertComponent } from './book-insert/book-insert.component';
import { BookDetailComponent } from './book-detail/book-detail.component';

export const BOOKS_ROUTES: Routes = [
    {path: '', component: BooksListComponent},
    {path: 'insert', component: BookInsertComponent},
    {path: ':id', component: BookDetailComponent}
]