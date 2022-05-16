import { Component, OnInit } from '@angular/core';
import { Hero } from '../heroInterface';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // defines heroes array property
  heroes: Hero[] = [];
  // constructor expects Angular to inject the HeroService into a private heroService property
  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    // returns sliced heroes returning top heroes
    this.heroService
      .getHeroes()
      .subscribe((heroes) => (this.heroes = heroes.slice(1, 5)));
  }
}
