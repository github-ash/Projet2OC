import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { MedalPieChartComponent } from '../../components/medal-pie-chart/medal-pie-chart.component';
import { StatisticsSummaryComponent } from '../../components/statistics-summary/statistics-summary.component';
import { DataService } from '../../services/data.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const dataService = jasmine.createSpyObj<DataService>('DataService', ['getOlympicData']);
  const router = jasmine.createSpyObj<Router>('Router', ['navigate']);

  beforeEach(async () => {
    dataService.getOlympicData.and.returnValue(of([]));
    await TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        MedalPieChartComponent,
        StatisticsSummaryComponent,
      ],
      providers: [
        { provide: DataService, useValue: dataService },
        { provide: Router, useValue: router },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load Olympic data through the data service', () => {
    expect(dataService.getOlympicData).toHaveBeenCalled();
    expect(component.statistics).toEqual([
      { label: 'Number of countries', value: 0 },
      { label: 'Number of JOs', value: 0 },
    ]);
  });
});
