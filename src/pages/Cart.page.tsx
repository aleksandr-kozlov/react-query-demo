import { Paper, SimpleGrid, Text } from '@mantine/core';
import { useOperations } from '@/services/operations/useOperations';

export function CartPage() {
  const { data: operations, isLoading } = useOperations();

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <SimpleGrid cols={1} verticalSpacing="xs">
      {operations?.map((operation) => (
        <Paper>
          <Text>{operation.status}</Text>
          <Text>{operation.instrument.name}</Text>
          <Text>{operation.instrument.price}</Text>
        </Paper>
      ))}
    </SimpleGrid>
  );
}
