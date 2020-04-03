import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  BillingComponent,
  CartToolbarComponent,
  DiscountCodeComponent,
  EstimateShippingTaxComponent,
  OrderReviewComponent,
  PaymentComponent,
  PaymentFailedComponent,
  PaymentSuccessComponent,
  ShippingComponent,
} from '../../../../components';
import {MaterialModule} from '../../../material.module';
import {PriceBoxComponent} from '../shared/price-box/price-box.component';
import {ShoppingCartComponent} from './shopping-cart.component';

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FlexLayoutModule, MaterialModule],
      declarations: [
        ShoppingCartComponent,
        PriceBoxComponent,
        EstimateShippingTaxComponent,
        PaymentComponent,
        OrderReviewComponent,
        PaymentSuccessComponent,
        PaymentFailedComponent,
        BillingComponent,
        ShippingComponent,
        CartToolbarComponent,
        DiscountCodeComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create the shopping cart component', () => {
  //   expect(component).toBeTruthy();
  // });
});
