import { Routes } from "@angular/router";
import { ClientComponent } from "./client/client.component";
import { AccountComponent } from "./account/account.component";
import { TransactionComponent } from "./transaction/transaction.component";
import { ReportComponent } from "./report/report.component";

export default [
    { path: 'clients', component: ClientComponent },
    { path: 'accounts', component: AccountComponent },
    { path: 'movements', component: TransactionComponent},
    { path: 'reports', component: ReportComponent},
    { path: '', redirectTo: 'clients', pathMatch: 'full' }
] as Routes;