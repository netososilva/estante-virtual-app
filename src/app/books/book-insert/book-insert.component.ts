import { Component, OnInit } from '@angular/core';
import { Book } from '../book/book.model';
import { BooksService } from '../books.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'ev-book-insert',
  templateUrl: './book-insert.component.html'
})
export class BookInsertComponent implements OnInit {

  books: Book[] = []

  constructor(private booksService: BooksService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.booksService.listBooksIfNotExistsInLibrary()
      .subscribe((books) => this.books = books)
  }

  insertBook(book: Book) {
    this.booksService
      .insertBook(book).subscribe(
        () => {
          this.removeBook(book)
          this.notificationService.notify(`O livro "${book.name}" foi adicionado a sua biblioteca.`)
        }
      )
  }

  removeBook(book: Book) {
    let index = this.books.indexOf(book)
    
    this.books.splice(index, 1)
  }

}
