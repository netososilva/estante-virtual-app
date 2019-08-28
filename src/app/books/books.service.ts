import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Book } from './book/book.model';
import { LoginService } from '../shared/services/login.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class BooksService {
    
    constructor(private http: HttpClient,
                private loginService: LoginService) {

    }

    listBooks(search?: string): Observable<Book[]> {
        const userId = this.loginService.getUserId()

        if (search) {
            return this.http
                .get<Book[]>(`${environment.ESTANTE_VIRTUAL_API}/userbooks/find/${userId}/${search}`)
        }

        return this.http.get<Book[]>(`${environment.ESTANTE_VIRTUAL_API}/userbooks/${userId}`)
    }

    listBooksIfNotExistsInLibrary() : Observable<Book[]> {
        return this.http
            .get<Book[]>(`${environment.ESTANTE_VIRTUAL_API}/userbooks/notinlibrary/${this.loginService.getUserId()}`)
    }

    insertBook(book: Book) {
        return this.http
            .post(`${environment.ESTANTE_VIRTUAL_API}/userbooks`, 
                {IdUser: this.loginService.getUserId(), IdBook: book.id})   
    }

    bookById(id: number): Observable<Book> {
        return this.http.get<Book>(`${environment.ESTANTE_VIRTUAL_API}/books/${id}`)
    }
}