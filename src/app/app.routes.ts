import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/components/layout/layout.component';

export const routes: Routes = [
    {
    path: '',
    component: LayoutComponent,
    children: [
        { path: 'pages', loadChildren: () => import('./pages/pages.routes') }
    //   { path: 'cuentas', component: CuentasComponent },
    //   { path: 'movimientos', component: MovimientosComponent },
    //   { path: 'reportes', component: ReportesComponent },
    //   { path: '', redirectTo: 'clientes', pathMatch: 'full' },
    ]
  }
];
