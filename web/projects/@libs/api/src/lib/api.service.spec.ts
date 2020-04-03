import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {TestBed, async, inject} from '@angular/core/testing';
import {ApiService} from './api.service';

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
  });
  it(`should create`, async(
    inject(
      [HttpTestingController, ApiService],
      (httpClient: HttpTestingController, apiService: ApiService) => {
        expect(apiService).toBeTruthy();
      }
    )
  ));
});
