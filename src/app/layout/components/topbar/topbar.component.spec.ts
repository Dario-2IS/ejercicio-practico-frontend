import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopbarComponent } from './topbar.component';

describe('TopbarComponent', () => {
  let component: TopbarComponent;
  let fixture: ComponentFixture<TopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the topbar component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the topbar', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('div') ||
      compiled.querySelector('span')
    ).toBeTruthy();
  });
});