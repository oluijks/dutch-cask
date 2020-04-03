import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MaterialModule} from '../../../material.module';
import {OrderReviewComponent} from './order-review.component';

describe('OrderReviewComponent', () => {
  let component: OrderReviewComponent;
  let fixture: ComponentFixture<OrderReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [OrderReviewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
