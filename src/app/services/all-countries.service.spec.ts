import { TestBed } from '@angular/core/testing';

import { AllCountriesService } from './all-countries.service';

describe('AllCountriesService', () => {
  let service: AllCountriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllCountriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
