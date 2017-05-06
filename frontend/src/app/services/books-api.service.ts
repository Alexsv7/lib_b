import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {BookModel} from "../models/book-model";
import 'rxjs/Rx';

@Injectable()
export class BooksApiService {

  private BOOKS_API = '';

  private static handleError(error: Response | any) {
    let errMsg: string,
      errObj: any = error;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    if (error._body) {
      errObj = JSON.parse(error._body);
    }

    return Observable.throw(errObj);
  }

  private static extractData(res: Response) {
    return res.json();
  };

  constructor(private http: Http) {
    // ${apiRouteConfig.apiEndpoint}
    this.BOOKS_API = `http://localhost:3000/api/v1/books`;
  }

  getBooks(): Observable<BookModel[]> {
    return this.http.get(this.BOOKS_API)
    .map(BooksApiService.extractData)
    // .map((contract)=>{
    //     return       contract.filter((contract: ContractModel)=>{
    //         console.log(contract.customerId);
    //         return contract.customerId == id;
    //     })
    // })

    .catch(BooksApiService.handleError);
  }

}
