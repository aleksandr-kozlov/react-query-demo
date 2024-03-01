import { build, perBuild, sequence } from '@jackfranklin/test-data-bot';
import { faker } from '@faker-js/faker';

export type Agreement = {
    id: string;
    name: string;
};

export const AgreementBuilder = build<Agreement>({
    fields: {
        id: sequence((x) => x.toString()),
        name: perBuild(() => faker.word.noun()),
    },
});
