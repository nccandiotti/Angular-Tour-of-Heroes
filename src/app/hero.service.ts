import { Injectable } from '@angular/core';
import { Hero } from './heroInterface';
import { HEROES } from './mock-heroes';
import { Observable, of, throwError } from 'rxjs';
import { MessageService } from './message.service';
import { catchError, retry, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = 'api/heroes'; // URL to web api
  // Angular will inject the singleton MessageService into that property when it creates the HeroService.
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap((_) => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }
  // HttpClient.get() returns the body of the response as an untyped JSON object by default. Applying the optional type specifier, <Hero[]> , adds TypeScript capabilities, which reduce errors during compile time. Other APIs may bury the data that you want within an object. You might have to dig that data out by processing the Observable result with the RxJS map() operator. If this is the case, you will need to map

  // The catchError() operator intercepts an Observable that failed. The operator then passes the error to the error handling function.
  getHero(id: number): Observable<Hero> {
    const hero = HEROES.find((h) => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  /** GET heroes from the server */
}
