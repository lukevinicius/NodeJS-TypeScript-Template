import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
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

export { CreateUserUseCase };
