import { NumberFormatter, Badge, Group, Paper, SimpleGrid, Stack, Text } from '@mantine/core';
import { useOperations } from '@/services/operations/useOperations';

export function OperationsPage() {
  const { data: operations, isLoading } = useOperations();

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
