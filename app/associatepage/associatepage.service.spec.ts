import { TestBed, inject } from '@angular/core/testing';

import { AssociatepageService } from './associatepage.service';

describe('AssociatepageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssociatepageService]
    });
  });

  it('should be created', inject([AssociatepageService], (service: AssociatepageService) => {
    expect(service).toBeTruthy();
  }));
});
