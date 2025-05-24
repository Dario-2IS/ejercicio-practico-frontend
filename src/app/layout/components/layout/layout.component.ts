import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from '../topbar/topbar.component';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, TopbarComponent, MenuComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
