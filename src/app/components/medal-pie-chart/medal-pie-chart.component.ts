import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-medal-pie-chart',
  templateUrl: './medal-pie-chart.component.html',
  styleUrls: ['./medal-pie-chart.component.scss'],
})
export class MedalPieChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() countries: string[] = [];
  @Input() medalTotals: number[] = [];
  @Output() countrySelected = new EventEmitter<string>();
  @ViewChild('chartCanvas') private chartCanvas?: ElementRef<HTMLCanvasElement>;

  private chart?: Chart<'pie', number[], string>;

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
          backgroundColor: ['#0b868f', '#adc3de', '#7a3c53', '#8f6263', 'orange', '#94819d'],
          hoverOffset: 4,
        }],
      },
      options: {
        aspectRatio: 2.5,
        onClick: (_event, elements) => {
          const country = this.countries[elements[0]?.index ?? -1];
          if (country) {
            this.countrySelected.emit(country);
          }
        },
      },
    });
  }
}
