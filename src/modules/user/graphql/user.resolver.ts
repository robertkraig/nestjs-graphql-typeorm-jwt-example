import { UserService } from '../user.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../role/guards/role.guard';
import { Roles } from '../../role/decorators/role.decorator';
import { RolesData } from '../../role/data/role.data';
import { Query, Resolver } from '@nestjs/graphql';
import { UserObject } from './user';

@Resolver('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserObject])
  @Roles(RolesData.Manager)
  async findAllUsers(): Promise<UserObject[]> {
    return this.userService.findAll();
  }
}
