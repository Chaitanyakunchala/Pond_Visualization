import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorDataTableComponent } from './sensor-data-table.component';

describe('SensorDataTableComponent', () => {
  let component: SensorDataTableComponent;
  let fixture: ComponentFixture<SensorDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SensorDataTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SensorDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
