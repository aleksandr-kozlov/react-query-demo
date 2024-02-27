import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { CatalogInstrumentBuilder } from './instruments/Instrument';
import { OperationBuilder } from './instruments/operations';

dotenv.config();

const throttle = 1000;

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'public')));

const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.get('/instruments', (req: Request, res: Response) => {
  setTimeout(() => res.send(CatalogInstrumentBuilder.many(6)), throttle);
});

app.put('/instruments/buy', (req: Request, res: Response) => {
  if (!req.body) {
    return res.sendStatus(422);
  }

  try {
    fs.readFile('operations.json', 'utf8', (err, data) => {
      if (err) {
        res.json(err);
      } else {
        const records = JSON.parse(data);
        const operation = OperationBuilder.one({ overrides: { instrument: req.body } });
        records.push(operation);
        fs.writeFileSync('operations.json', JSON.stringify(records, null, 2), 'utf8');
        setTimeout(() => res.json(operation), throttle);
      }
    });
  } catch (e) {
    return res.sendStatus(500);
  }
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

app.get('/operations', (req: Request, res: Response) => {
  const fileData = fs.readFileSync('operations.json', 'utf8');

  setTimeout(() => res.json(JSON.parse(fileData)), 3000);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
