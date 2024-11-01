import { Component } from '@angular/core';
import { SensorDataTableComponent } from './components/sensor-data-table/sensor-data-table.component'; // Adjust the path as necessary
import { SensorDataChartComponent } from './components/sensor-data-chart/sensor-data-chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h1>Sensor Data Visualization</h1>
    <app-sensor-data-chart></app-sensor-data-chart>
    <app-sensor-data-table></app-sensor-data-table>
  `,
  imports: [SensorDataTableComponent, SensorDataChartComponent],
})
export class AppComponent {}
