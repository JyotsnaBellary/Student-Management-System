import { TestBed } from '@angular/core/testing';

import { AttendanceService } from './attendance.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('AttendanceService', () => {
  let service: AttendanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(AttendanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
