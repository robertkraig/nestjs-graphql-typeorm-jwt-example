import { join } from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

import { DataSource } from 'typeorm';
import { TaskEntity } from './database/entities/task.entity';
import { UserEntity } from './database/entities/user.entity';
import { RoleEntity } from './database/entities/role.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number.parseInt(process.env.MYSQL_PORT, 10),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_USER_PASS,
  database: process.env.MYSQL_DB_NAME,
  synchronize: true,
  migrationsTableName: 'migrations',
  migrations: [join(__dirname, 'migration/*.{ts,js}')],
  entities: [UserEntity, RoleEntity, TaskEntity],
  logging: true,
});
