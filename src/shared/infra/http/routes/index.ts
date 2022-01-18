import { Router } from 'express';

const router = Router();

router.use('/', (Request, Response) => {
  Response.json({ Message: 'Hello World' });
});

export { router };
