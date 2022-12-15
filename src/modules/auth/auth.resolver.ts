import { AuthService } from './auth.service';
import { CreateUserInput } from '../user/graphql/create-user.input';
import { AuthCredentialInput } from './graphql/auth-credential.input';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthObject } from './graphql/auth';

@Resolver('auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthObject)
  async signIn(@Args() input: AuthCredentialInput): Promise<AuthObject> {
    const auth = await this.authService.auth(input);
    console.log('auth', auth);
    return auth;
  }

  @Mutation(() => AuthObject)
  async signUp(@Args('data') input: CreateUserInput) {
    return await this.authService.register(input);
  }
}
