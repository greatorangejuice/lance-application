import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsController } from './reviews/reviews.controller';
import { ReviewsModule } from './reviews/reviews.module';
import { TasksModule } from './tasks/tasks.module';
import { RolesController } from './roles/roles.controller';
import { RolesModule } from './roles/roles.module';
import { SubjectsModule } from './subjects/subjects.module';
import { AnimalsModule } from './animals/animals.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    UsersModule,
    ReviewsModule,
    TasksModule,
    RolesModule,
    SubjectsModule,
    AnimalsModule,
    CommentsModule,
  ],
  controllers: [AppController, ReviewsController],
  providers: [AppService],
})
export class AppModule {}
