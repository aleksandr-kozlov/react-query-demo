import { build, perBuild } from '@jackfranklin/test-data-bot';
import { faker } from '@faker-js/faker';
import { CatalogInstrument, CatalogInstrumentBuilder } from './Instrument';

export type Account = {
    id: string;
    name: string;
    instruments: CatalogInstrument[];
};

export const AccountBuilder = build<Account>({
    fields: {
        id: perBuild(() => faker.finance.bitcoinAddress()),
        name: perBuild(() => faker.word.noun()),
        instruments: perBuild(() => CatalogInstrumentBuilder.many(3)),
    },
    traits: {
        new_account: {
            overrides: {
                instruments: [],
            },
        },
    },
});
