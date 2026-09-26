import { ComponentFixture, TestBed } from '@angular/core/testing';
import { convertToParamMap, ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { CountryMedalChartComponent } from '../../components/country-medal-chart/country-medal-chart.component';
import { StatisticsSummaryComponent } from '../../components/statistics-summary/statistics-summary.component';
import { DataService } from '../../services/data.service';
import { CountryComponent } from './country.component';

describe('DetailComponent', () => {
  let component: CountryComponent;
  let fixture: ComponentFixture<CountryComponent>;
  const dataService = jasmine.createSpyObj<DataService>('DataService', ['getCountryByName']);
  const router = jasmine.createSpyObj<Router>('Router', ['navigate']);

  beforeEach(async () => {
    dataService.getCountryByName.and.returnValue(of(undefined));
    await TestBed.configureTestingModule({
      declarations: [
        CountryComponent,
        CountryMedalChartComponent,
        StatisticsSummaryComponent,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(convertToParamMap({ countryName: 'Unknown' })) },
        },
        { provide: DataService, useValue: dataService },
        { provide: Router, useValue: router },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect when the requested country does not exist', () => {
    expect(dataService.getCountryByName).toHaveBeenCalledWith('Unknown');
    expect(router.navigate).toHaveBeenCalledWith(['/not-found']);
  });
});
