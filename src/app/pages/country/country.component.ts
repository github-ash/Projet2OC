import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, of, switchMap } from 'rxjs';
import { Statistic } from '../../models/statistic.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  titlePage = '';
  statistics: Statistic[] = [];
  years: number[] = [];
  medalTotals: number[] = [];
  error: string | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly dataService: DataService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((params) => params.get('countryName')),
      switchMap((countryName) => countryName
        ? this.dataService.getCountryByName(countryName)
        : of(undefined)),
    ).subscribe({
      next: (country) => {
        if (!country) {
          this.router.navigate(['/not-found']);
          return;
        }

        this.titlePage = country.country;
        this.years = country.participations.map(({ year }) => year);
        this.medalTotals = country.participations.map(({ medalsCount }) => medalsCount);
        this.statistics = [
          {
            label: 'Number of entries',
            value: country.participations.length,
          },
          {
            label: 'Total Number of medals',
            value: this.medalTotals.reduce((total, medals) => total + medals, 0),
          },
          {
            label: 'Total Number of athletes',
            value: country.participations.reduce((total, participation) => total + participation.athleteCount, 0),
          },
        ];
      },
      error: (error: Error) => {
        this.error = error.message;
      },
    });
  }
}
