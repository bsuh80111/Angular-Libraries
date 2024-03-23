import { TestBed } from '@angular/core/testing';

import { ResponsiveMaterialService } from './responsive-material.service';

describe('ResponsiveMaterialService', () => {
  let service: ResponsiveMaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponsiveMaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
