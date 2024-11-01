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
    const labels = ['pH', 'Rain', 'Water Level', 'Oxygen', 'Temperature']; // Define specific sensor names for X-axis labels
    const values = [
      sensorData.map((data) => data.ph).reduce((a, b) => a + b, 0) / sensorData.length,
      sensorData.map((data) => data.rain).reduce((a, b) => a + b, 0) / sensorData.length,
      sensorData.map((data) => data.waterLevel).reduce((a, b) => a + b, 0) / sensorData.length,
      sensorData.map((data) => data.oxygen).reduce((a, b) => a + b, 0) / sensorData.length,
      sensorData.map((data) => data.temperature).reduce((a, b) => a + b, 0) / sensorData.length,
    ]; // Aggregate each sensor's average values for demonstration

    const ctx = document.getElementById('sensorDataChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar', // Set chart type to 'bar'
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Average Sensor Data',
            data: values,
            backgroundColor: 'rgba(54, 162, 235, 0.6)', // Set bar color
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'category',
            title: {
              display: true,
              text: 'Sensor Name',
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 5, // Set each unit step to 5
              callback: (value) => Number(value).toFixed(0), // Display integer values only
            },
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
