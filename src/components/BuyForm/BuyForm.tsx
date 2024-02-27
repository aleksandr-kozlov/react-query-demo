import { Button, Loader, NumberFormatter, Stack, Text } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CatalogInstrument } from '@/server/src/instruments/Instrument';
import { getServerUrl } from '@/utils/urls';
import { Operation } from '@/server/src/instruments/operations';

interface IProps {
  instrument: CatalogInstrument;
  onContinue: () => void;
}

export const BuyForm: React.FC<IProps> = ({ instrument, onContinue }) => {
  const client = useQueryClient();

  const { mutate, isLoading, isSuccess, isError } = useMutation({
    mutationFn: () =>
      fetch(getServerUrl('/instruments/buy'), {
        method: 'PUT',
        body: JSON.stringify(instrument),
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => res.json() as Promise<Operation>),
    onSuccess: (data) =>
      client.setQueryData(['operations'], (previous?: Operation[]) => [...(previous || []), data]),
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
