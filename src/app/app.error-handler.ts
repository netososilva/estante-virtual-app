import { Injectable, ErrorHandler, Injector, NgZone } from '@angular/core';
import { NotificationService } from './shared/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from './shared/services/login.service';

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {
    
    constructor(private notificationService: NotificationService,
                private injector: Injector,
                private zone: NgZone) {
        super()
    }

    handleError(errorResponse: HttpErrorResponse | any) {
        if (!(errorResponse instanceof HttpErrorResponse)) {
            super.handleError(errorResponse)
            return
        }

        const message = errorResponse.message
        
        this.zone.run(() => {
            switch(errorResponse.status) {
                case 204:
                    this.notificationService.notify(message || 'Recurso não encontrado.')
                    break;
                case 401:
                    this.notificationService.notify(message || 'Não autorizado.')
                    break;
                case 404:
                    this.notificationService.notify(message || 
                        'Recurso não encontrado. Verifique o console para mais detalhes.')
                    break;
                default:
                    this.notificationService.notify(message || 
                        'Algo deu errado. Por favor, tente novamente mais tarde.')
                    break;
            }
        })
        
        super.handleError(errorResponse)
    }
}