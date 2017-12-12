import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Pet } from '../pet';
import { CognitoService } from './cognito.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PetService {

  private Url = 'https://xxxxxxx.execute-api.ap-northeast-1.amazonaws.com/test/pets';  // URL to web api

  constructor(
    private http: HttpClient,
    private cognito: CognitoService) { }

  /** GET pets from the server */
  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.Url);
  }
}

@Injectable()
export class NoopInterceptor implements HttpInterceptor {
  constructor(private cognito: CognitoService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // サービスから認証ヘッダーを取得します。
    const authHeader = this.cognito.getCurrentUserIdToken();
    // 新しいヘッダーを加えたリクエストを複製します。
    const authReq = req.clone({ headers: req.headers.set('Authorization', authHeader) });
    // オリジナルのリクエストの代わりに複製したリクエストを投げます。
    return next.handle(authReq);
  }
}
