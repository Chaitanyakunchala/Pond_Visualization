import { Component, OnInit } from '@angular/core';
import { SensorDataService } from '../../services/sensor-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sensor-data-table',
  standalone: true,
  templateUrl: './sensor-data-table.component.html',
  styleUrls: ['./sensor-data-table.component.css'],
  imports: [CommonModule],
  providers: [SensorDataService],
})
export class SensorDataTableComponent implements OnInit {
  sensorDataList: any[] = [];

  constructor(private sensorDataService: SensorDataService) {}

  ngOnInit(): void {
    this.sensorDataService.getAllSensorData().subscribe(
      (data) => {
        this.sensorDataList = data;
      },
      (error) => {
        console.error('Error fetching sensor data:', error);
      }
    );
  }
}
