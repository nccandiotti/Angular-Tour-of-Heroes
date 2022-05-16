import { Injectable } from '@angular/core';
import { Hero } from './heroInterface';
import { HEROES } from './mock-heroes';
import { Observable, of, throwError } from 'rxjs';
import { MessageService } from './message.service';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  // Angular will inject the singleton MessageService into that property when it creates the HeroService.
  constructor(private messageService: MessageService) {}

  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetches heroes'); //sends a message when the heroes are fetched
    return heroes;
  }

  getHero(id: number): Observable<Hero> {
    const hero = HEROES.find((h) => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }
}
