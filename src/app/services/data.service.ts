import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { OlympicCountry } from '../models/olympic-country.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly olympicDataUrl = 'assets/mock/olympic.json';

  constructor(private readonly http: HttpClient) {}

  getOlympicData(): Observable<OlympicCountry[]> {
    return this.http.get<OlympicCountry[]>(this.olympicDataUrl);
  }

  getCountryById(id: number): Observable<OlympicCountry | undefined> {
    return this.getOlympicData().pipe(
      map((countries) => countries.find((country) => country.id === id)),
    );
  }
}
