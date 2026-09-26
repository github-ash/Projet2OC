import { Component, Input } from '@angular/core';
import { Statistic } from '../../models/statistic.model';

@Component({
  selector: 'app-statistics-summary',
  templateUrl: './statistics-summary.component.html',
  styleUrls: ['./statistics-summary.component.scss'],
})
export class StatisticsSummaryComponent {
  @Input() statistics: Statistic[] = [];
}
