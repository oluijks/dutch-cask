import {inject, TestBed} from '@angular/core/testing';
import {LoadingSpinnerService} from './loading-spinner.service';

describe('LoggerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingSpinnerService],
    });
  });

  it('should be created', inject(
    [LoadingSpinnerService],
    (service: LoadingSpinnerService) => {
      expect(service).toBeTruthy();
    }
  ));
});
