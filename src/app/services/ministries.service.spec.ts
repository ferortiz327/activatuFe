import { TestBed } from '@angular/core/testing';

import { MinistriesService } from './ministries.service';

describe('MinistriesService', () => {
  let service: MinistriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinistriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
