import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CountryComponent } from "./pages/country/country.component";
import { CountryMedalChartComponent } from './components/country-medal-chart/country-medal-chart.component';
import { MedalPieChartComponent } from './components/medal-pie-chart/medal-pie-chart.component';
import { StatisticsSummaryComponent } from './components/statistics-summary/statistics-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    CountryComponent,
    CountryMedalChartComponent,
    MedalPieChartComponent,
    StatisticsSummaryComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
