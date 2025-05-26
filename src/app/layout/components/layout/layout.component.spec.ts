import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { MenuComponent } from '../menu/menu.component';
import { RouterOutlet } from '@angular/router';
import { provideRouter } from '@angular/router';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterOutlet, TopbarComponent, MenuComponent, LayoutComponent],
      providers: [provideRouter([])]
    }).compileComponents();
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance; fixture.detectChanges();
  });

  it('should create the layout component',
    () => {
      expect(component).toBeTruthy();

    });
  it('should render topbar and menu components',
    () => {
      const compiled = fixture.nativeElement;
      const topbarElement = compiled.querySelector('app-topbar');
      const menuElement = compiled.querySelector('app-menu');
      expect(topbarElement).toBeTruthy(); expect(menuElement).toBeTruthy();
    });
}); // We recommend installing an extension to run jest tests.  