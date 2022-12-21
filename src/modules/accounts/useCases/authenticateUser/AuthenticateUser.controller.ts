import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserService } from './AuthenticateUser.service';

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const authenticateUserService = container.resolve(AuthenticateUserService);

    const authenticateInfo = await authenticateUserService.execute({
      username,
      password,
    });

    return response.json(authenticateInfo);
  }
}

export { AuthenticateUserController };
