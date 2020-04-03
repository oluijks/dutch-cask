import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import {CheckoutButtonComponent} from './checkout-button.component';

describe('CheckoutButtonComponent', () => {
  let component: CheckoutButtonComponent;
  let fixture: ComponentFixture<CheckoutButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatBadgeModule, MatIconModule],
      declarations: [CheckoutButtonComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the checkout button component', () => {
    expect(component).toBeTruthy();
  });
});
