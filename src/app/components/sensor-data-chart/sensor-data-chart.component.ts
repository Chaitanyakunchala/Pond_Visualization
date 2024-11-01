import { Component, OnInit } from '@angular/core';
import { SensorDataService } from '../../services/sensor-data.service'; // Adjust the path as necessary
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-sensor-data-chart',
  standalone: true,
  template: `
    <div>
      <canvas id="sensorDataChart"></canvas>
    </div>
  `,
  styles: [
    `
      canvas {
        max-width: 600px;
        margin: auto;
      }
    `,
  ],
})
export class SensorDataChartComponent implements OnInit {
  constructor(private sensorDataService: SensorDataService) {}

  ngOnInit(): void {
    // Register all required Chart.js components
    Chart.register(...registerables);
    this.loadSensorData();
  }

  loadSensorData(): void {
    this.sensorDataService.getAllSensorData().subscribe({
      next: (data) => this.createChart(data),
      error: (err) => console.error('Error fetching sensor data', err),
    });
  }

  createChart(sensorData: any[]): void {
    const labels = sensorData.map((data) => data.timestamp); // Assuming you have a timestamp field
    const values = sensorData.map((data) => data.value); // Replace 'value' with the actual field you want to chart

    const ctx = document.getElementById('sensorDataChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line', // You can change this to bar, pie, etc.
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Sensor Data',
            data: values,
            fill: false,
            borderColor: 'blue',
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'category', // Ensure 'category' type is correctly specified
            title: {
              display: true,
              text: 'Time',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Sensor Value',
            },
          },
        },
      },
    });
  }
}
