import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MaterialModule} from '../../../../material.module';
import {CartToolbarComponent} from './cart-toolbar.component';

describe('CartToolbarComponent', () => {
  let component: CartToolbarComponent;
  let fixture: ComponentFixture<CartToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [CartToolbarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
