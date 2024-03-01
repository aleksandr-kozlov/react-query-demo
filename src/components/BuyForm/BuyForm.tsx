import { Button, Loader, NumberFormatter, Stack, Text, Select } from '@mantine/core';
import React from 'react';
import { CatalogInstrument } from '@/server/src/entities/Instrument';
import { getServerUrl } from '@/utils/urls';
import { Operation } from '@/server/src/entities/operations';
import { Account, AccountBuilder } from '@/server/src/entities/accounts';

interface IProps {
  instrument: CatalogInstrument;
  onContinue: () => void;
}

export const BuyForm: React.FC<IProps> = ({ instrument, onContinue }) => {
    const [selectedAccount, setSelectedAccount] = React.useState<Account>();
    const accounts = AccountBuilder.many(3);
    const [isLoading, isError, isSuccess] = [false, false, false];

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
        onClick={() => {}}
      >
        Отправить завку
      </Button>
    </Stack>
  );
};
