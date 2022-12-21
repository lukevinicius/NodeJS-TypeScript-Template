import { hash } from 'bcryptjs';
import { injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { UsersRepository } from '../../repositories/UsersRepository';

@injectable()
class CreateUserService {
  constructor(private usersRepository: UsersRepository) {}
  async execute({
    name,
    email,
    username,
    password,
  }: ICreateUserDTO): Promise<void> {
    const emailAlreadyExists = this.usersRepository.findByEmail(email);

    if (!emailAlreadyExists) {
      throw new AppError('User already exists', 403);
    }

    const userAlreadyExists = this.usersRepository.findByEmail(username);

    if (!userAlreadyExists) {
      throw new AppError('User already exists', 403);
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      name,
      email,
      username,
      password: passwordHash,
    });
  }
}

export { CreateUserService };
