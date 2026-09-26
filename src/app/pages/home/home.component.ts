import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OlympicCountry } from '../../models/olympic-country.model';
import { Statistic } from '../../models/statistic.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  countries: string[] = [];
  medalTotals: number[] = [];
  statistics: Statistic[] = [];
  readonly titlePage = 'Medals per Country';
  error: string | null = null;

  constructor(private readonly router: Router, private readonly dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getOlympicData().subscribe({
      next: (countries: OlympicCountry[]) => {
        this.countries = countries.map(({ country }) => country);
        this.medalTotals = countries.map((country) =>
          country.participations.reduce((total, participation) => total + participation.medalsCount, 0),
        );
        const olympicYears = new Set(
          countries.flatMap((country) => country.participations.map(({ year }) => year)),
        );
        this.statistics = [
          { label: 'Number of countries', value: countries.length },
          { label: 'Number of JOs', value: olympicYears.size },
        ];
      },
      error: (error: Error) => {
        this.error = error.message;
      },
    });
  }

  openCountry(countryName: string): void {
    this.router.navigate(['country', countryName]);
  }
}

