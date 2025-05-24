import { Routes } from "@angular/router";
import { ClientComponent } from "./client/client.component";
import { AccountComponent } from "./account/account.component";

export default [
    { path: 'clients', component: ClientComponent },
    { path: 'accounts', component: AccountComponent },
] as Routes;