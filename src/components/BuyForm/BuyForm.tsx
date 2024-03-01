import { Button, Loader, NumberFormatter, Stack, Text, Select } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { CatalogInstrument } from '@/server/src/instruments/Instrument';
import { getServerUrl } from '@/utils/urls';
import { Operation } from '@/server/src/instruments/operations';
import { useAccounts } from '@/pages/AccountsPage';
import { Account } from '@/server/src/instruments/accounts';

interface IProps {
  instrument: CatalogInstrument;
  onContinue: () => void;
}

export const BuyForm: React.FC<IProps> = ({ instrument, onContinue }) => {
  const client = useQueryClient();

    const [selectedAccount, setSelectedAccount] = React.useState<Account>();
    const { data: accounts } = useAccounts();

  const { mutate, isLoading, isSuccess, isError } = useMutation({
    mutationFn: () =>
      fetch(getServerUrl('/instruments/buy'), {
        method: 'PUT',
        body: JSON.stringify({ instrument, accountId: selectedAccount?.id }),
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => res.json() as Promise<Operation>),
    onSuccess: (data) => {
        client.setQueryData(['operations'], (previous?: Operation[]) => [...(previous || []), data]);
        return client.invalidateQueries(['accounts', 'list']);
    },
  });

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <Text>Ошибка при выставлении заявки</Text>;
  }

  if (isSuccess) {
    return (
      <Stack>
        <Text>Заявка успешно отправлена</Text>
        <Button onClick={onContinue}>Продолжить</Button>
      </Stack>
    );
  }

  return (
    <Stack>
      <Text fw={500}>Покупка: {instrument.name}</Text>
      <Text size="sm">
        Итого:{' '}
        <NumberFormatter
          value={instrument.price}
          prefix="$"
          thousandSeparator
          decimalScale={2}
          fixedDecimalScale
        />
      </Text>
        <Select
          label="Счёт списания"
          placeholder="Pick value"
          value={selectedAccount?.name || ''}
          onChange={(value) => setSelectedAccount(accounts?.find((account) => account.name === value))}
          data={accounts?.map(account => account.name)}
        />
      <Button
        onClick={() =>
          mutate(undefined, {
            onSuccess: () => {},
          })
        }
      >
        Отправить завку
      </Button>
    </Stack>
  );
};
