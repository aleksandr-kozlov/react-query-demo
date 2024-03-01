import React from 'react';
import { Stepper } from '@mantine/core';
import { Agreements } from '@/pages/AddAccount/components/Agreements';
import { Documents } from '@/pages/AddAccount/components/Documents';
import { FinalScreen } from '@/pages/AddAccount/components/FinalScreen';

enum Step {
    agreements = 0,
    documents = 1,
    final = 2
}

export const AddAccountPage = () => {
    const [active, setActive] = React.useState<Step>(Step.agreements);

    return (
        <>
            <Stepper active={active} allowNextStepsSelect={false}>
                <Stepper.Step label="Соглашение" description="Примите условия">
                    <Agreements onAgreed={() => setActive(Step.documents)} />
                </Stepper.Step>
                <Stepper.Step label="Документы" description="Подпишите документы">
                    <Documents onSigned={() => setActive(Step.final)} />
                </Stepper.Step>
                <Stepper.Step label="Создание аккаунта">
                    <FinalScreen />
                </Stepper.Step>
            </Stepper>
        </>
    );
};
