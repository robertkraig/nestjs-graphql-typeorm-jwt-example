import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskResolver } from './task.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from '../../database/entities/task.entity';
import { UserEntity } from '../../database/entities/user.entity';
import { RoleEntity } from '../../database/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, UserEntity, RoleEntity])],
  providers: [TaskService, TaskResolver],
  exports: [TaskService],
})
export class TaskModule {}
