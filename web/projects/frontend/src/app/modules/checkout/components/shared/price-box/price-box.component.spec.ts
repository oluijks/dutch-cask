import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MaterialModule} from '../../../../material.module';
import {PriceBoxComponent} from './price-box.component';

describe('PriceBoxComponent', () => {
  let component: PriceBoxComponent;
  let fixture: ComponentFixture<PriceBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [PriceBoxComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
