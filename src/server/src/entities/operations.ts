import { faker } from '@faker-js/faker';
import { build, oneOf, perBuild } from '@jackfranklin/test-data-bot';
import { CatalogInstrument, CatalogInstrumentBuilder } from './instrument';

export type Operation = {
  id: string;
  type: 'buy';
  status: 'executing' | 'executed';
  instrument: CatalogInstrument;
};

export const OperationBuilder = build<Operation>({
  fields: {
    id: perBuild(() => faker.finance.bitcoinAddress()),
    type: 'buy',
    status: 'executing', //oneOf('executing', 'executed'),
    instrument: perBuild(() => CatalogInstrumentBuilder.one()),
  },
});
