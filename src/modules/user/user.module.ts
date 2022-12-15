import { Module } from '@nestjs/common';
import { UserResolver } from './graphql/user.resolver';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../database/entities/user.entity';
import { RoleEntity } from '../../database/entities/role.entity';
import { TaskEntity } from '../../database/entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, UserEntity, RoleEntity])],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
