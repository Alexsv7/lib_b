import { TestBed, inject } from '@angular/core/testing';
import { BooksService } from './books.service';
import { Http, ConnectionBackend, BaseRequestOptions, ResponseOptions, Response, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {BookModel} from "../models/book-model";


export class MockBooksService extends SpyObject {
   getProducts: any;
   search: any;
   fakeResponse: any;

   constructor() {
       super();
       this.fakeResponse = null;
       this.getProducts = this.spy('getProducts').andReturn(this);
       this.search = this.spy('search').andReturn(this);
   }

   subscribe(callback: Function) {
       callback(this.fakeResponse);
   }

   setResponse(json: any): void {
       this.fakeResponse = json;
   }

   getProviders(): Array<any> {
       return [{provide: BooksService, useValue: this}];
   }
}

describe('BooksService', () => {
   beforeEach(() => {
       const mockBooksService: MockBooksService = new MockBooksService();
       TestBed.configureTestingModule({
           providers: [
               BooksService,
               BaseRequestOptions,
               MockBackend,
               {
                   provide: Http,
                   useFactory: (backend: ConnectionBackend,
                                defaultOptions: BaseRequestOptions) => new Http(backend, defaultOptions),
                   deps: [MockBackend, BaseRequestOptions]
               }
           ]
       });

     this.BOOKS_API = `http://localhost:3000/api/v1/books`;
     this.BOOK_BY_ID_API = `http://localhost:3000/api/v1/book/`;

   });

   it('should be defined', inject([BooksService], (service: BooksService) => {
       expect(service).toBeTruthy();
   }));

   it('should have defined API', inject([BooksService], (service: BooksService) => {
       expect(typeof service.getBooks() === 'function').toBeTruthy();
   }));

   describe('Get products', () => {
       it('performs a Get request for product list',
           inject([BooksService, MockBackend],
               fakeAsync((service: BooksService, be: MockBackend) => {
                   be.connections.subscribe((c: MockConnection) => {
                       expect(c.request.method).toBe(RequestMethod.Get);
                   });
                   service.getBooks();
                   tick();
               })));
       it('gets product list by indexes',
           inject([BooksService, MockBackend],
               fakeAsync((service: BooksService, be: MockBackend) => {
                   let res: BookModel[];
                   be.connections.subscribe((c: MockConnection) => {
                       expect(c.request.url).toBe(this.BOOKS_API);
                       let response: ResponseOptions = new ResponseOptions({status: 200, body: {}});
                       c.mockRespond(new Response(response));
                   });

                   service.getBooks()
                       .subscribe((_res) => res = _res);
                   tick();
                   expect(res).toBeTruthy();
               })));
   });

