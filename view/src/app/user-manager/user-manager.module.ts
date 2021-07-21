import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagerComponent } from './user-manager.component';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';

@NgModule({
  declarations: [UserManagerComponent],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserManagerComponent,
        // canActivate: [AuthGuard],
      },
    ]),
  ],
})
export class UserManagerModule {}
