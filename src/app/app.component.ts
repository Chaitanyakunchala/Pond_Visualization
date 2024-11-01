import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SensorDataTableComponent } from './components/sensor-data-table/sensor-data-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h1>Sensor Data Visualization</h1>
    <router-outlet></router-outlet>
  `,
  imports: [RouterModule, SensorDataTableComponent],
})
export class AppComponent {}
