import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SensorDataTableComponent } from './components/sensor-data-table/sensor-data-table.component';
import { SensorDataChartComponent } from './components/sensor-data-chart/sensor-data-chart.component';

export const routes: Routes = [
  { path: 'sensor-data-table', component: SensorDataTableComponent },
  { path: 'visualize', component: SensorDataChartComponent },
  { path: '', redirectTo: '/sensor-data-table', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
