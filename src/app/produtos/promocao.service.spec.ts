/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PromocaoService } from './promocao.service';

describe('Service: Promocao', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PromocaoService]
    });
  });

  it('should ...', inject([PromocaoService], (service: PromocaoService) => {
    expect(service).toBeTruthy();
  }));
});
