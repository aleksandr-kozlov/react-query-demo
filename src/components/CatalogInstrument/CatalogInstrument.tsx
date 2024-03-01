import {
  Group,
  Paper,
  Stack,
  Text,
  Image,
  NumberFormatter,
  Drawer,
  Button,
  Loader,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { CatalogInstrument as CatalogInstrumentType } from '@/server/src/instruments/Instrument';
import { BuyForm } from '../BuyForm/BuyForm';

type Props = {
  instrument: CatalogInstrumentType;
};

export function InstrumentCard({ instrument }: Props) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer opened={opened} onClose={close} position="right">
        <BuyForm instrument={instrument} onContinue={close} />
      </Drawer>
      <Paper shadow="xs" p="xl" key={instrument.id}>
        <Group justify="space-between" align="center">
          <Group>
            <Stack>
              <Text fw={500}>{instrument.name}</Text>
              <Text size="sm" c="dimmed">
                {instrument.description}
              </Text>
            </Stack>
          </Group>
          <Group>
            <NumberFormatter
              value={instrument.price}
              prefix="rub "
              thousandSeparator
              decimalScale={2}
              fixedDecimalScale
            />
            <Button onClick={open}>Купить</Button>
          </Group>
        </Group>
      </Paper>
    </>
  );
}
