import { TestBed } from '@angular/core/testing';

import { TrainingSchoolService } from './training-school.service';

describe('TrainingSchoolService', () => {
  let service: TrainingSchoolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainingSchoolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
