import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-country-medal-chart',
  templateUrl: './country-medal-chart.component.html',
  styleUrls: ['./country-medal-chart.component.scss'],
})
export class CountryMedalChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() years: number[] = [];
  @Input() medalTotals: number[] = [];
  @ViewChild('chartCanvas') private chartCanvas?: ElementRef<HTMLCanvasElement>;

  private chart?: Chart<'line', number[], number>;

  ngAfterViewInit(): void {
    this.renderChart();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.renderChart();
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  private renderChart(): void {
    if (!this.chartCanvas || this.years.length === 0 || this.medalTotals.length === 0) {
      return;
    }

    this.chart?.destroy();
    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.years,
        datasets: [{
          label: 'Medals',
          data: this.medalTotals,
          borderColor: '#0b868f',
          backgroundColor: '#0b868f',
        }],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}
