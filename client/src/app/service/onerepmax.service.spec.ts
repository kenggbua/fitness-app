import { TestBed } from '@angular/core/testing';

import { OneRepMaxService } from './onerepmax.service';

describe('OneRepMaxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OneRepMaxService = TestBed.get(OneRepMaxService);
    expect(service).toBeTruthy();
  });
});
