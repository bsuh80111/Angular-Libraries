import { TestBed } from '@angular/core/testing';

import { NpxResponsiveMaterialComponentsService } from './npx-responsive-material-components.service';

describe('NpxResponsiveMaterialComponentsService', () => {
  let service: NpxResponsiveMaterialComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NpxResponsiveMaterialComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
