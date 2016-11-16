/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AddstaffService } from './addstaff.service';

describe('Service: Addstaff', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddstaffService]
    });
  });

  it('should ...', inject([AddstaffService], (service: AddstaffService) => {
    expect(service).toBeTruthy();
  }));
});
