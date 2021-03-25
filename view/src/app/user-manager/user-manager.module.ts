import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagerComponent } from './user-manager.component';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UserManagerComponent],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserManagerComponent,
      },
    ]),
  ],
})
export class UserManagerModule {}
