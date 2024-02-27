import { Group, Paper, Stack, Text, Image, NumberFormatter } from '@mantine/core';
import { CatalogInstrument as CatalogInstrumentType } from '@/server/src/instruments/Instrument';

type Props = {
  instrument: CatalogInstrumentType;
};

export function InstrumentCard({ instrument }: Props) {
  return (
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
        <NumberFormatter
          value={instrument.price}
          prefix="rub "
          thousandSeparator
          decimalScale={2}
          fixedDecimalScale
        />
      </Group>
    </Paper>
  );
}
