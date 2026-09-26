import { ComponentFixture, TestBed } from '@angular/core/testing';
import { convertToParamMap, ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { HeaderComponent } from '../../components/header/header.component';
import { CountryMedalChartComponent } from '../../components/country-medal-chart/country-medal-chart.component';
import { DataService } from '../../services/data.service';
import { CountryComponent } from './country.component';

describe('DetailComponent', () => {
  let component: CountryComponent;
  let fixture: ComponentFixture<CountryComponent>;
  const dataService = jasmine.createSpyObj<DataService>('DataService', ['getCountryById']);
  const router = jasmine.createSpyObj<Router>('Router', ['navigate']);

  beforeEach(async () => {
    dataService.getCountryById.and.returnValue(of(undefined));
    await TestBed.configureTestingModule({
      declarations: [
        CountryComponent,
        HeaderComponent,
        CountryMedalChartComponent,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(convertToParamMap({ id: '999' })) },
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

  it('should redirect when the requested country id does not exist', () => {
    expect(dataService.getCountryById).toHaveBeenCalledWith(999);
    expect(router.navigate).toHaveBeenCalledWith(['/not-found']);
  });
});
