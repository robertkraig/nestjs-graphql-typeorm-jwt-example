import * as jwt from 'jsonwebtoken';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserInput } from '../user/graphql/create-user.input';
import { AuthCredentialInput } from './graphql/auth-credential.input';
import * as bcrypt from 'bcryptjs';
import { AuthObject, UserPayload } from './graphql/auth';
import { JwtPayload } from 'jsonwebtoken';
import { UserEntity } from '../../database/entities/user.entity';

export interface Token {
  createTokenDate: number;
  expiresTokenDate: number;
  accessToken: string;
}

export interface TokenPayload extends JwtPayload {
  user: UserPayload;
}

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(userData: CreateUserInput): Promise<AuthObject> {
    const user = await this.userService.create(userData);
    return this.createResponse(user);
  }

  async auth(input: AuthCredentialInput): Promise<AuthObject> {
    const user = await this.userService.findOneByUsername(input.username, true);
    const match = await bcrypt.compare(input.password, user.password);
    if (match) {
      return this.createResponse(user);
    } else {
      throw new HttpException(
        'Password or username is not validate',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  private createUserPayload(payload: JwtPayload): UserPayload {
    return {
      id: payload.id,
      username: payload.username,
      role: payload.role.name,
      isAdmin: payload.role.isAdmin,
    };
  }

  private createToken(payload: JwtPayload): Token {
    const expiresIn = 3600;
    const createTokenDate = new Date().getTime();
    const expiresTokenDate = createTokenDate + expiresIn;
    const accessToken = jwt.sign(
      <TokenPayload>{
        user: this.createUserPayload(payload),
      },
      process.env.SECRET_KEY,
      { expiresIn: expiresIn },
    );
    return {
      createTokenDate,
      expiresTokenDate,
      accessToken,
    };
  }

  private async createResponse(user: UserEntity): Promise<AuthObject> {
    return {
      Token: this.createToken(user).accessToken,
      User: this.createUserPayload(user),
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return this.userService.findOneByUsername(payload.username, false, true);
  }
}
