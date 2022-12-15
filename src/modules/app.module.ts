import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UserEntity } from '../database/entities/user.entity';
import { RoleEntity } from '../database/entities/role.entity';
import { TaskEntity } from '../database/entities/task.entity';

@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '../../', 'client/dist'), // New
    // }), // New
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: './schema.graphql',
      driver: ApolloDriver,
      debug: true,
      playground: true,
      introspection: true,
      context: ({ req }) => ({ headers: req.headers }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number.parseInt(process.env.MYSQL_PORT, 10),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_USER_PASS,
      database: process.env.MYSQL_DB_NAME,
      entities: [UserEntity, RoleEntity, TaskEntity],
      logging: true,
    }),
    TaskModule,
    AuthModule,
    UserModule,
  ],
  providers: [],
})
export class AppModule {}
