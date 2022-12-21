import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../entities/User';

export abstract class UsersRepository {
  abstract create(data: ICreateUserDTO): Promise<void>;
  abstract findById(id: string): Promise<User>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findByUsername(email: string): Promise<User | null>;
  abstract save(user: User): Promise<void>;
}
