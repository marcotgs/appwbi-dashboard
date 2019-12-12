import { Component, Injectable, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of as observableOf, Observable, Subject, merge, of } from 'rxjs';
import { tap, map, switchMap, distinctUntilChanged, debounceTime, catchError, filter } from 'rxjs/operators';

const WIKI_URL = 'https://en.wikipedia.org/w/api.php';
const PARAMS = new HttpParams({
  fromObject: {
    action: 'opensearch',
    format: 'json',
    origin: '*'
  }
});

const states = [
  'Administração',
  'Gerente',
  'Colaborador',
  'Usuário'
];

@Injectable()
export class WikipediaService {
  constructor(private http: HttpClient) {}

  search(term: string) {
    if (term === '') {
      return of([]);
    }

    return this.http.get(WIKI_URL, { params: PARAMS.set('search', term) }).pipe(map(response => response[1]));
  }
}

@Component({
  selector: 'app-form-filiais',
  templateUrl: './form-filiais.component.html',
  providers: [WikipediaService],
  styleUrls: ['./form-filiais.component.css']
})

export class FormFiliaisComponent {
  public model1: any;
  model2: any;
  public model3: any;
  public model5: any;

  model4: any;
  searching = false;
  searchFailed = false;

  @ViewChild('instance', { static: true }) instance;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  search1 = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => (term.length < 2 ? [] : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)))
      // tslint:disable-next-line:semicolon
    );

  search2 = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? states : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
    // tslint:disable-next-line:semicolon
  };

  formatter = (result: string) => result.toUpperCase();

  search3 = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => (term === '' ? [] : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)))
      // tslint:disable-next-line:semicolon
    );

  constructor(private _service: WikipediaService) {}

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap(term =>
        this._service.search(term).pipe(
          tap(() => (this.searchFailed = false)),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          })
        )
      ),
      tap(() => (this.searching = false))
      // tslint:disable-next-line:semicolon
    );

  formatter5 = (x: { name: string }) => x.name;
}
