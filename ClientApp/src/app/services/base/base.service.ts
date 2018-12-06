import { 
    Observable, 
    from as observableFrom, 
    throwError as observableThrowError 
} from 'rxjs';

import { map, catchError } from 'rxjs/operators';

export abstract class BaseService {
    constructor() { }

    protected handlePromise(promise: Promise<any>): Observable<any> {
        return observableFrom(promise)
            .pipe(map(response => response))
            .pipe(catchError(error => this.handleError(error)))
    }

    protected handleError(error: any) {
        const applicationError = error.headers.get('Application-Error');

        if (applicationError) {
            return observableThrowError(applicationError);
        }

        let modelStateErrors: string = '';
        const serverError = error.json();

        if (!serverError.type) {
            for (const key in serverError) {
                if (serverError[key]) {
                modelStateErrors += serverError[key] + '\n';
                }
            }
        }

        modelStateErrors = modelStateErrors === '' ? null : modelStateErrors;
        observableThrowError(modelStateErrors || 'Server error');
    }
}
