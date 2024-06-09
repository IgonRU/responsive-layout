import { TestBed } from '@angular/core/testing';

import { IgonResponsiveLayoutService } from './responsive-layout.service';

describe('IgonResponsiveLayoutService', () => {
  let service: IgonResponsiveLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IgonResponsiveLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
