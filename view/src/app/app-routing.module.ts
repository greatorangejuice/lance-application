import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GreetingComponent } from './greeting/greeting.component';
import { NotFoundComponent } from './core/components/page-not-found/not-found.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { Role } from './models/role';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: GreetingComponent,
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
