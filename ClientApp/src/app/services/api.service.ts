import { Injectable } from '@angular/core';
import { Observable, from as observableFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base/base.service';

@Injectable()
export class ApiService extends BaseService {
    private headers: any = { withCredentials: false, 'Access-Control-Allow-Origin': '*' };

    public constructor(private readonly http: HttpClient) {
        super();
    }

    public get(url: string): Observable<any> {
        const promise = this.http.get(url, this.headers).toPromise();

        return this.handlePromise(promise);
    }
}
