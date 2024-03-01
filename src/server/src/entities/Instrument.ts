import { faker } from '@faker-js/faker';
import { build, perBuild, sequence, oneOf } from '@jackfranklin/test-data-bot';

export type CatalogInstrument = {
  id: number;
  name: string;
  description: string;
  logo: string;
  price: number;
  type: 'stock' | 'bond';
};

export const CatalogInstrumentBuilder = build<CatalogInstrument>({
  fields: {
    id: sequence(),
    name: perBuild(() => faker.commerce.product()),
    description: perBuild(() => faker.commerce.productDescription()),
    logo: perBuild(() => faker.color.rgb()),
    price: perBuild(() => faker.number.float({ min: 100, max: 10000 })),
    type: oneOf('stock', 'bond'),
  },
});
