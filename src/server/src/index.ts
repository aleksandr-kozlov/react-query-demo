import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { faker } from '@faker-js/faker';
import { CatalogInstrumentBuilder } from './instruments/Instrument';

dotenv.config();

const throttle = 1000;

const app: Express = express();
app.use(cors());
app.use('/static', express.static(path.join(__dirname, 'public')));

const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.get('/instruments', (req: Request, res: Response) => {
  setTimeout(() => res.send(CatalogInstrumentBuilder.many(6)), throttle);
});

app.get('/instrumentsByType/:type', (req: Request, res: Response) => {
  if (!req.params?.type) {
    res.sendStatus(422);
    return;
  }

  setTimeout(
    () =>
      res.send(CatalogInstrumentBuilder.many(3, { overrides: { type: req.params.type as any } })),
    throttle
  );
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
