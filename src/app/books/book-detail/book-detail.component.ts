import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../books.service';
import { Book } from '../book/book.model';

@Component({
  selector: 'ev-book-detail',
  templateUrl: './book-detail.component.html'
})
export class BookDetailComponent implements OnInit {

  book: Book

  constructor(private booksService: BooksService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.booksService
      .bookById(this.route.snapshot.params['id'])
      .subscribe(book => this.book = book);
  }

}
