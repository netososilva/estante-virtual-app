import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Book } from './book.model';

@Component({
  selector: 'ev-book',
  templateUrl: './book.component.html',
  animations: [
    trigger('bookAppeared', [
      state('ready', style({opacity: 1})),
      transition('void => ready', [
        style({opacity: 0, transform: 'translate(-30px, -10px)'}),
        animate('300ms 0s ease-in-out')
      ])
    ])
  ]
})
export class BookComponent implements OnInit {

  bookState = 'ready'

  @Input() book: Book

  constructor() { }

  ngOnInit() {
  }

}
