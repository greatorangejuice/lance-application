import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GreetingComponent } from './greeting/greeting.component';
import { NotFoundComponent } from './core/components/page-not-found/not-found.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { Role } from './models/users/role';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'greeting',
  },

  {
    path: 'greeting',
    loadChildren: () =>
      import('./greeting/greeting.module').then((m) => m.GreetingModule),
  },

  {
    path: 'tasks',
    loadChildren: () =>
      import('./task-manager/task-manager.module').then(
        (m) => m.TaskManagerModule
      ),
    // canActivate: [AuthGuard],
    // data: { roles: [Role.Admin, Role.User, Role.Manager] },
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./user-manager/user-manager.module').then(
        (m) => m.UserManagerModule
      ),
  },
  {
    path: '**',
    component: NotFoundComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
