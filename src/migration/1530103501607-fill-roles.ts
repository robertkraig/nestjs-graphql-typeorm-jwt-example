import { In, MigrationInterface, QueryRunner } from 'typeorm';
import { RolesData } from '../modules/role/data/role.data';
import { RoleEntity } from '../database/entities/role.entity';
import { plainToInstance } from 'class-transformer';

export class fillRoles1530103501607 implements MigrationInterface {
  private generateData(): any[] {
    return [
      { name: RolesData.Admin },
      { name: RolesData.Manager },
      { name: RolesData.Developer },
    ];
  }

  public async up(queryRunner: QueryRunner): Promise<any> {
    const manager = queryRunner.manager;
    const rolesData = this.generateData();
    const roles: RoleEntity[] = plainToInstance(RoleEntity, rolesData);
    return await manager.save(RoleEntity, roles);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const manager = queryRunner.manager;
    const rolesData = this.generateData();
    return await manager.delete(RoleEntity, {
      name: In(rolesData.map((item) => item.name)),
    });
  }
}
