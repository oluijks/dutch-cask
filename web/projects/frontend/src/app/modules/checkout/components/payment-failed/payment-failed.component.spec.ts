import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MaterialModule} from '../../../material.module';
import {PaymentFailedComponent} from './payment-failed.component';

describe('PaymentFailedComponent', () => {
  let component: PaymentFailedComponent;
  let fixture: ComponentFixture<PaymentFailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [PaymentFailedComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the payment failed component', () => {
    expect(component).toBeTruthy();
  });
});
