import { TestBed } from '@angular/core/testing';

import { GestionNoticiasService } from './gestion-noticias.service';

describe('GestionNoticiasService', () => {
  let service: GestionNoticiasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionNoticiasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
