import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  isLoading = true;
  isEmpty = false;
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly dataService: DataService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((params) => params.get('id')),
      switchMap((id) => {
        const countryId = Number(id);
        return id && Number.isInteger(countryId) && countryId > 0
          ? this.dataService.getCountryById(countryId)
          : of(undefined);
      }),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (country) => {
        this.isLoading = false;
        if (!country) {
          this.router.navigate(['/not-found']);
          return;
        }

        this.titlePage = country.country;
        const participations = Array.isArray(country.participations) ? country.participations : [];
        this.years = participations.map(({ year }) => year);
        this.medalTotals = participations.map(({ medalsCount }) => medalsCount);
        this.statistics = [
          {
            label: 'Number of entries',
            value: participations.length,
          },
          {
            label: 'Total Number of medals',
            value: this.medalTotals.reduce((total, medals) => total + medals, 0),
          },
          {
            label: 'Total Number of athletes',
            value: participations.reduce((total, participation) => total + participation.athleteCount, 0),
          },
        ];
        this.isEmpty = participations.length === 0;
      },
      error: () => {
        this.isLoading = false;
        this.error = 'Country data could not be loaded. Return to the dashboard and try again.';
      },
    });
  }
}
