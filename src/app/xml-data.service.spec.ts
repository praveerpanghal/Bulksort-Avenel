import { TestBed, inject } from '@angular/core/testing';

import { XmlDataService } from './xml-data.service';

describe('XmlDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [XmlDataService]
    });
  });

  it('should be created', inject([XmlDataService], (service: XmlDataService) => {
    expect(service).toBeTruthy();
  }));
});
