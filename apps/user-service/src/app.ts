import express, { type Express } from 'express';
import type { Request, Response } from 'express';

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World, FROM the user service');
});

export default app;