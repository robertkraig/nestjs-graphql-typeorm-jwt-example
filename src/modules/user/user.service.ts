import { Injectable, Inject } from '@nestjs/common';
import { CreateUserInput } from './graphql/create-user.input';
import { UserEntity } from '../../database/entities/user.entity';
import { Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { plainToClass } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(input: CreateUserInput): Promise<UserEntity> {
    const newUser = plainToClass(UserEntity, input);
    const user = await this.usersRepository.save(newUser);
    return this.findOneByUsername(user.username);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find({ relations: ['role'] });
  }

  async findById(id: string): Promise<UserEntity> {
    return this.usersRepository.findOne({
      where: {
        id,
      }
    });
  }

  async findOneByUsername(
    username: string,
    withPassword = false,
    withPermission = false,
  ) {
    const options: FindOneOptions<UserEntity> = {
      where: {
        username,
      },
      relations: ['role', 'tasks'],
    };
    if (withPassword) {
      options.select = ['id', 'username', 'password'];
    }
    return this.usersRepository.findOne(options);
  }
}
