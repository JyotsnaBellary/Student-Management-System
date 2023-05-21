import { TestBed } from '@angular/core/testing';

import { ExaminationsService } from './examinations.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('ExaminationsService', () => {
  let service: ExaminationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule.withRoutes([])]

    });
    service = TestBed.inject(ExaminationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
