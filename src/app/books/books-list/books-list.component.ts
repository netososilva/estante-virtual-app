import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { from } from 'rxjs'

import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'

import { Book } from '../book/book.model';
import { BooksService } from '../books.service';

@Component({
  selector: 'ev-books-list',
  templateUrl: './books-list.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        "max-height": "0px"
      })),
      state('visible', style({
        opacity: 1,
        "max-height": "70px",
        "margin-top": "20px"
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})
export class BooksListComponent implements OnInit {

  books: Book[]
    
  searchBarState: string = 'hidden'

  searchForm: FormGroup
  searchControl: FormControl

  constructor(private booksService: BooksService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.searchControl = this.formBuilder.control('')
    this.searchForm = this.formBuilder.group({
      searchControl: this.searchControl
    })

    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(searchTerm => 
          this.booksService
            .listBooks(searchTerm)
            .pipe(
              catchError(() => from([]))
            )
        )
      )
      .subscribe(books => this.books = books)

    this.booksService.listBooks()
      .subscribe(books => this.books = books);
  }

  toggleSearch() {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden'
  }

}
