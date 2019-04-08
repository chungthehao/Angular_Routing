import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },             // localhost:4200
  
    { path: 'users', component: UsersComponent, children: [
      { path: ':id/:name', component: UserComponent },   // localhost:4200/users/1
    ] },       // localhost:4200/users
  
    { path: 'servers', component: ServersComponent, children: [
      { path: ':id', component: ServerComponent },
      { path: ':id/edit', component: EditServerComponent },
    ] },
  
    { path: 'not-found', component: PageNotFoundComponent },
  
    // Phải ở cuối cùng, khi Angular tìm ko thấy thằng nào match ở trên hết mới gặp dòng này! Vì ** match với mọi route
    { path: '**', redirectTo: '/not-found' }
  ];
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    // From this module, if I were to add this module to the imports of another module what should be accessible to this module which imports this module
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}