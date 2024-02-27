import { Button, Group, Stack } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { getServerUrl } from '@/utils/urls';
import { CatalogInstrument } from '@/server/src/instruments/Instrument';

export const ServiceButtons = () => {
  const client = useQueryClient();

  const [count, setCount] = React.useState(0);

  return (
    <Stack mt={20}>
      <Button onClick={() => client.invalidateQueries(['catalog', 'instruments', 'stocks'])}>
        Invalidate
      </Button>
      <Button onClick={() => client.removeQueries(['catalog', 'instruments', 'stocks'])}>
        Remove
      </Button>
      <Button
        onClick={() =>
          client.prefetchQuery(['catalog', 'instruments', 'stocks'], {
            queryFn: () =>
              fetch(getServerUrl('/instrumentsByType/stock')).then(
                (res) => res.json() as Promise<CatalogInstrument[]>
              ),
          })
        }
      >
        Prefetch
      </Button>
      <Button onClick={() => setCount((x) => x + 1)}>increment {count}</Button>
    </Stack>
  );
};
