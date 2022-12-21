import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserService } from './CreateUser.service';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, username, email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);

    await createUserService.execute({
      name,
      username,
      email,
      password,
    });

    return response.status(201).send();
  }
}

export { CreateUserController };
