import { UserEntity } from '../../../database/entities/user.entity';

export type JwtPayload = Partial<UserEntity>;
