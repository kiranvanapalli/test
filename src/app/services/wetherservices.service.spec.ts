import { TestBed } from '@angular/core/testing';

import { WetherservicesService } from './wetherservices.service';

describe('WetherservicesService', () => {
  let service: WetherservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WetherservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
