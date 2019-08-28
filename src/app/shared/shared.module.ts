import { NgModule, ModuleWithProviders, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InputComponent } from './input/input.component';
import { LoginService } from './services/login.service';
import { SnackbarComponent } from './messages/snackbar/snackbar.component';
import { LoggedInGuard } from './guards/loggedin.guard';
import { NotificationService } from './services/notification.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ApplicationErrorHandler } from '../app.error-handler';

@NgModule({
  declarations: [
    InputComponent,
    SnackbarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputComponent,
    SnackbarComponent
  ]
})
export class SharedModule { 
  static forRoot(): ModuleWithProviders {
    return {
        ngModule: SharedModule,
        providers: [
          LoggedInGuard,
          LoginService,
          NotificationService,
          { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
          {provide: ErrorHandler, useClass: ApplicationErrorHandler }
        ]
    }
  }
}
