import { EntityManager, In, MigrationInterface, QueryRunner } from 'typeorm';
import { RoleEntity } from '../database/entities/role.entity';
import { RolesData } from '../modules/role/data/role.data';
import { plainToInstance } from 'class-transformer';
import { UserEntity } from '../database/entities/user.entity';

export class fillUsers1530105344263 implements MigrationInterface {
  private async getRole(
    manager: EntityManager,
    name: string,
  ): Promise<RoleEntity> {
    return manager.findOne(RoleEntity, {
      where: {
        name,
      },
    });
  }

  private async generateData(manager: EntityManager): Promise<any[]> {
    return <Array<UserEntity>>[
      {
        username: 'admin',
        password: 'admin',
        fullname: 'AdminFn AdminLn',
        role: await this.getRole(manager, RolesData.Admin),
      },
      {
        username: 'developer',
        password: 'developer',
        fullname: 'DeveloperFn DeveloperLn',
        role: await this.getRole(manager, RolesData.Developer),
      },
      {
        username: 'manager',
        password: 'manager',
        fullname: 'ManagerFn ManagerLn',
        role: await this.getRole(manager, RolesData.Manager),
      },
    ];
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    const manager = queryRunner.manager;
    const usersData = await this.generateData(manager);
    const users = plainToInstance(UserEntity, usersData);
    return await manager.save(UserEntity, users);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    return await queryRunner.manager.delete(UserEntity, {
      username: In(['admin', 'manager', 'developer']),
    });
  }
}
