import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  countryIds: number[] = [];
  countries: string[] = [];
  medalTotals: number[] = [];
  statistics: Statistic[] = [];
  readonly titlePage = 'Medals per Country';
  error: string | null = null;
  isLoading = true;
  isEmpty = false;
  private readonly destroyRef = inject(DestroyRef);

  constructor(private readonly router: Router, private readonly dataService: DataService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.error = null;
    this.isEmpty = false;

    this.dataService.getOlympicData().pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (countries: OlympicCountry[]) => {
        this.isLoading = false;
        this.countryIds = countries.map(({ id }) => id);
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
        this.isEmpty = countries.length === 0;
      },
      error: () => {
        this.isLoading = false;
        this.error = 'Olympic data could not be loaded. Please try again.';
      },
    });
  }

  openCountry(countryId: number): void {
    this.router.navigate(['country', countryId]);
  }
}

