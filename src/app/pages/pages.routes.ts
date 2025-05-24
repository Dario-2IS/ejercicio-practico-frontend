import { Routes } from "@angular/router";
import { ClientComponent } from "./client/client.component";
import { AccountComponent } from "./account/account.component";
import { TransactionComponent } from "./transaction/transaction.component";

export default [
    { path: 'clients', component: ClientComponent },
    { path: 'accounts', component: AccountComponent },
    { path: 'movements', component: TransactionComponent},
    { path: '', redirectTo: 'clients', pathMatch: 'full' }
] as Routes;