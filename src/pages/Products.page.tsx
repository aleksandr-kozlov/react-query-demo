import { Button, Group, Stepper } from '@mantine/core';
import React from 'react';

enum CreationProcess {
  agreements = 0,
  document_generation = 1,
  account_created = 2,
}

export function ProductsPage() {
  const [active, setActive] = React.useState(0);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Stepper active={active} allowNextStepsSelect={false}>
        <Stepper.Step label="Соглашение" description="Примите условия">
          Step 1 content: Create an account
        </Stepper.Step>
        <Stepper.Step label="Документы" description="Подпишите документы">
          Step 2 content: Verify email
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Get full access">
          Step 3 content: Get full access
        </Stepper.Step>
        <Stepper.Completed>Completed, click back button to get to previous step</Stepper.Completed>
      </Stepper>

      <Group justify="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group>
    </>
  );
}
