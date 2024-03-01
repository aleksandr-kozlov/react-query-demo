import { NumberFormatter, Badge, Group, Paper, SimpleGrid, Stack, Text } from '@mantine/core';
import { useOperations } from '@/services/operations/useOperations';
import { OperationBuilder } from '@/server/src/entities/operations';

export function OperationsPage() {
  const operations = OperationBuilder.many(3);
  const isLoading = false;

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <SimpleGrid cols={1} verticalSpacing="xs">
      {operations?.map((operation) => (
        <Paper shadow="xs" p={20}>
          <Group justify="space-between">
            <Stack>
              <Text fw={700}>{operation.instrument.name}</Text>
              <NumberFormatter
                value={operation.instrument.price}
                prefix="rub "
                thousandSeparator
                decimalScale={2}
                fixedDecimalScale
              >{operation.instrument.price}
              </NumberFormatter>
            </Stack>
            {operation.status === 'executed' ? (
                <Badge color="green">Исполнена</Badge>
            ) : (
                <Badge color="yellow">Исполняется</Badge>
            )}

          </Group>
        </Paper>
      ))}
    </SimpleGrid>
  );
}
