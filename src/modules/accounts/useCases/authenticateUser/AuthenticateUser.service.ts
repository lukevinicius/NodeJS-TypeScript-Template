import { AppError } from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { injectable } from 'tsyringe';

import { UsersRepository } from '../../repositories/UsersRepository';

interface IRequest {
  username: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    username: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(private usersRepository: UsersRepository) {}
  async execute({ username, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(username);

    if (!user) {
      throw new AppError('Email or password incorrect', 403);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect', 403);
    }

    const token = sign({}, '842398f67b4449eb7bf500181aac342d', {
      subject: user.id,
      expiresIn: '1d',
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        username: user.username,
      },
    };

    return tokenReturn;
  }
}

export { AuthenticateUserService };
