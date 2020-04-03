import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MaterialModule} from '../../../material.module';
import {PaymentSuccessComponent} from './payment-success.component';

describe('PaymentSuccessComponent', () => {
  let component: PaymentSuccessComponent;
  let fixture: ComponentFixture<PaymentSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [PaymentSuccessComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the payment success component', () => {
    expect(component).toBeTruthy();
  });
});
