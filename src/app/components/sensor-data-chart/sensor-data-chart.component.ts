import { Component, OnInit } from '@angular/core';
import { SensorDataService } from '../../services/sensor-data.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-sensor-data-chart',
  standalone: true,
  template: `
    <div class="chart-container">
      <h2>Sensor Data Chart</h2>
      <canvas id="sensorDataChart"></canvas>
    </div>
  `,
  styles: [
    `
      .chart-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-color: #f5f7fa;
        border-radius: 8px;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
        padding: 20px;
        margin: 20px auto;
        max-width: 80%;
      }
      h2 {
        font-family: Arial, sans-serif;
        font-size: 24px;
        color: #333;
        margin-bottom: 10px;
        text-align: center;
      }
      canvas {
        max-width: 1000px;
        height: 500px;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
        padding: 15px;
      }
    `,
  ],
  providers: [SensorDataService],
})
export class SensorDataChartComponent implements OnInit {
  constructor(private sensorDataService: SensorDataService) {}

  ngOnInit(): void {
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
    const labels = ['pH', 'Rain', 'Water Level', 'Oxygen', 'Temperature'];
    const values = [
      sensorData.map((data) => data.ph).reduce((a, b) => a + b, 0) / sensorData.length,
      sensorData.map((data) => data.rain).reduce((a, b) => a + b, 0) / sensorData.length,
      sensorData.map((data) => data.waterLevel).reduce((a, b) => a + b, 0) / sensorData.length,
      sensorData.map((data) => data.oxygen).reduce((a, b) => a + b, 0) / sensorData.length,
      sensorData.map((data) => data.temperature).reduce((a, b) => a + b, 0) / sensorData.length,
    ];

    const ctx = document.getElementById('sensorDataChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Average Sensor Data',
            data: values,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: { title: { display: true, text: 'Sensor Name' } },
          y: {
            beginAtZero: true,
            ticks: { stepSize: 5, callback: (value) => Number(value).toFixed(0) },
            title: { display: true, text: 'Sensor Value' },
          },
        },
      },
    });
  }
}
