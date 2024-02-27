import { Paper, Group, Stack, Skeleton } from '@mantine/core';

export function CatalogInstrumentPlaceholder() {
  return (
    <Paper shadow="xs" p="xl">
      <Group justify="space-between" align="center">
        <Group>
          <Skeleton w={50} h={50} radius={50} />
          <Stack>
            <Skeleton w={100} h={14} />
            <Skeleton w={200} h={12} />
          </Stack>
        </Group>
        <Skeleton w={90} h={16} />
      </Group>
    </Paper>
  );
}
