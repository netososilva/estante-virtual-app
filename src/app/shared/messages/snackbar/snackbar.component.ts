import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators'

import { NotificationService } from '../../services/notification.service';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'ev-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger('snack-visibility', [
      state('hidden', style({
        opacity: 0,
        bottom: '0px'
      })),
      state('visible', style({
        opacity: 1,
        bottom: '30px'
      })),
      transition('hidden => visible', animate('500ms 0s ease-in')),
      transition('visible => hidden', animate('500ms 0s ease-out'))
    ])
  ]
})
export class SnackbarComponent implements OnInit {

  message: string = 'Hello world!'
  snackVisibility: string = 'hidden'

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.notifier
      .pipe(  
        tap(message => {
            this.message = message as string
            this.snackVisibility = 'visible'
        }),
        switchMap(() => timer(3000))
      ).subscribe(() => this.snackVisibility = 'hidden')
  }

}
