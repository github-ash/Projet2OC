import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HeaderComponent } from '../../components/header/header.component';
import { MedalPieChartComponent } from '../../components/medal-pie-chart/medal-pie-chart.component';
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
        HeaderComponent,
        MedalPieChartComponent,
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
    expect(component.isLoading).toBeFalse();
    expect(component.isEmpty).toBeTrue();
  });

  it('should show a friendly message when loading fails', () => {
    dataService.getOlympicData.and.returnValue(throwError(() => new Error('technical failure')));

    component.loadData();
    fixture.detectChanges();

    expect(component.error).toBe('Olympic data could not be loaded. Please try again.');
    expect(fixture.nativeElement.textContent).not.toContain('technical failure');
  });
});
