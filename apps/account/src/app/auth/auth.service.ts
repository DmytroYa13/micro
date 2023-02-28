import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser, UserRole } from '@purple/interfaces';
import { UserEntity } from '../user/entities/user.entity';
import { UserRepository } from '../user/repositories/user.repository';
import { RegisterDto } from './auth.controller';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  async register({ email, password, displayName }: RegisterDto) {
    const oldUser = await this.userRepository.findUser(email);
    if (oldUser) {
      throw new Error('User exists');
    }

    const newUserEntity = await new UserEntity({
      email,
      passwordHash: '',
      displayName,
      role: UserRole.Student,
    }).setPassword(password);
    const newUser = await this.userRepository.createUser(newUserEntity);
    return { email: newUser.email };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findUser(email);

    if (!user) {
      throw new Error('User doest not exist');
    }

    const userEntity = await new UserEntity(user);
    const isCorrectPassword = await userEntity.validatePassword(password);

    if (!isCorrectPassword) {
      throw new Error('User doest not exist');
    }

    return { id: user._id };
  }

  async login(id: string) {
    return {
      access_token: await this.jwtService.signAsync({ id }),
    };
  }
}
