import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { CatalogInstrumentBuilder } from './entities/Instrument';
import { OperationBuilder } from './entities/operations';
import { Account, AccountBuilder } from './entities/accounts';
import { AgreementBuilder } from './entities/agreements';

dotenv.config();

const throttle = 1000;

const accountsStoragePath = path.resolve(__dirname, 'storage/accounts.json');
const operationsStoragePath = path.resolve(__dirname, 'storage/operations.json');

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'public')));

const port = process.env.PORT;

/**
 * Получение инструментов для каталога
 * */
app.get('/instruments', (req: Request, res: Response) => {
  setTimeout(() => res.send(CatalogInstrumentBuilder.many(6)), throttle);
});

/**
 * Получение инструментов по типу
 * */
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

/**
 * Покупка инструмента
 */
app.put('/instruments/buy', (req: Request, res: Response) => {
  if (!req.body) {
    return res.sendStatus(422);
  }

  try {
    fs.readFile(accountsStoragePath, 'utf8', (err, data) => {
      if (err) {
        res.json(err);
      } else {
        const records: Account[] = JSON.parse(data);
        const accounts = records.map((acc) => {
          if (acc.id === req.body.accountId) {
            return {
              ...acc,
              instruments: [...acc.instruments, req.body.instrument],
            };
          }
          return acc;
        });

        fs.writeFileSync(accountsStoragePath, JSON.stringify(accounts, null, 2), 'utf8');
      }
    });

    fs.readFile(operationsStoragePath, 'utf8', (err, data) => {
      if (err) {
        res.json(err);
      } else {
        const records = JSON.parse(data);
        const operation = OperationBuilder.one({ overrides: { instrument: req.body.instrument } });
        records.push(operation);
        fs.writeFileSync(operationsStoragePath, JSON.stringify(records, null, 2), 'utf8');
        setTimeout(() => res.json(operation), throttle);
      }
    });
  } catch (e) {
    return res.sendStatus(500);
  }
});

/**
 * Получение списка операций
 */
app.get('/operations', (req: Request, res: Response) => {
  const fileData = fs.readFileSync(operationsStoragePath, 'utf8');

  setTimeout(() => res.json(JSON.parse(fileData)), 3000);
});

/** получение списка аккаунтов */
app.get('/accounts', (req: Request, res: Response) => {
  const fileData = fs.readFileSync(accountsStoragePath, 'utf8');

  setTimeout(() => res.json(JSON.parse(fileData)), 1000);
});

/** Добавление аккаунта */
app.put('/accounts', (req: Request, res: Response) => {
  if (!req.body) {
    res.sendStatus(422);
  } else {
    fs.readFile(accountsStoragePath, 'utf8', (err, data) => {
      if (err) {
        res.json(err);
      } else {
        const records = JSON.parse(data);
        const newAccount = AccountBuilder.one({ traits: 'new_account' });

        records.push(newAccount);

        fs.writeFileSync(accountsStoragePath, JSON.stringify(records, null, 2), 'utf8');
        setTimeout(() => res.json(newAccount), throttle);
      }
    });
  }
});

/** Получение соглашений */
app.get('/agreements', (req: Request, res: Response) => {
  const agreements = [AgreementBuilder.one({ overrides: { name: 'Соглашение о чем-то' } }), AgreementBuilder.one({ overrides: { name: 'Дополнительное соглашение о чем-то' } })];

  setTimeout(() => res.json(agreements), throttle);
});

/** Подтверждение соглашений */
app.patch('/agreements', (req: Request, res: Response) => {
  setTimeout(() => res.sendStatus(200), throttle);
});

let documentGenerationAttempts = 0;

/** Получение документов */
app.get('/documents', (req: Request, res: Response) => {
  if (documentGenerationAttempts > 5) {
    documentGenerationAttempts = 0;
    setTimeout(() => res.json(AgreementBuilder.many(3)), throttle);
  } else {
    documentGenerationAttempts += 1;
    setTimeout(() => res.sendStatus(404));
  }
});

/** Подписание документов */
app.patch('/documents', (req: Request, res: Response) => {
  setTimeout(() => res.sendStatus(200), throttle);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
