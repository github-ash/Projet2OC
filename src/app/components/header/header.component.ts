import { Component, Input } from '@angular/core';
import { Statistic } from '../../models/statistic.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() statistics: Statistic[] = [];
  @Input() isLoading = false;
}