import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '../../../../material.module';
import {EstimateShippingTaxComponent} from './estimate-shipping-tax.component';

describe('EstimateShippingTaxComponent', () => {
  let component: EstimateShippingTaxComponent;
  let fixture: ComponentFixture<EstimateShippingTaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MaterialModule],
      declarations: [EstimateShippingTaxComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimateShippingTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
