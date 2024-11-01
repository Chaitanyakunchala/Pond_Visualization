import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SensorDataService {
  private apiUrl = 'http://localhost:8080/api/sensor/data';

  constructor(private http: HttpClient) {}

  getAllSensorData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
