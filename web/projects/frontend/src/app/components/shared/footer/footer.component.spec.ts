import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FooterComponent} from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FlexLayoutModule],
      declarations: [FooterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the footer component', () => {
    expect(component).toBeTruthy();
  });

  // it(`should have as angVersion 'Angular Version: 6.1.0'`, async(() => {
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('#angVersion').textContent).toContain(
  //     'Angular Version: 6.1.0'
  //   );
  // }));

  // it(`should have as appVersion 'Dutch Cask Version: 1.0.0-dev'`, async(() => {
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('#appVersion').textContent).toContain(
  //     'Dutch Cask Version: 1.0.0-dev'
  //   );
  // }));

  it(`should have as poweredBy 'Powered by Dutch Cask ©2018'`, async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#poweredBy').textContent).toContain(
      'Powered by Dutch Cask ©2018'
    );
  }));

  it(`should have as licensedUnder 'Code licensed under an MIT-style License'`, async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#licensedUnder').textContent).toContain(
      'Code licensed under an MIT-style License'
    );
  }));
});
