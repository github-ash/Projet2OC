import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

const CHART_COLORS = ['#0b868f', '#df714b', '#5979b8', '#8f6263', '#8b9f55', '#94819d'];

@Component({
  selector: 'app-medal-pie-chart',
  templateUrl: './medal-pie-chart.component.html',
  styleUrls: ['./medal-pie-chart.component.scss'],
})
export class MedalPieChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  readonly chartColors = CHART_COLORS;
  @Input() countryIds: number[] = [];
  @Input() countries: string[] = [];
  @Input() medalTotals: number[] = [];
  @Output() countrySelected = new EventEmitter<number>();
  @ViewChild('chartCanvas') private chartCanvas?: ElementRef<HTMLCanvasElement>;

  private chart?: Chart<'pie', number[], string>;

  get textualSummary(): string {
    return this.countries
      .map((country, index) => `${country}: ${this.medalTotals[index] ?? 0} medals`)
      .join('. ');
  }

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
    if (!this.chartCanvas || this.countries.length === 0 || this.medalTotals.length === 0) {
      return;
    }

    this.chart?.destroy();
    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: this.countries,
        datasets: [{
          label: 'Medals',
          data: this.medalTotals,
          backgroundColor: this.chartColors,
          hoverOffset: 4,
        }],
      },
      options: {
        aspectRatio: 2.5,
        animation: false,
        onClick: (event) => {
          if (!event.native) {
            return;
          }

          const points = this.chart?.getElementsAtEventForMode(
            event.native,
            'point',
            { intersect: true },
            true,
          ) ?? [];
          this.selectCountry(points[0]?.index ?? -1);
        },
      },
    });
  }

  selectCountry(index: number): void {
    const countryId = this.countryIds[index];
    if (countryId !== undefined) {
      this.countrySelected.emit(countryId);
    }
  }
}
