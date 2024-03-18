import React from 'react';
import { SimpleGrid } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { CatalogInstrument } from '@/server/src/entities/instrument';
import { getServerUrl } from '@/utils/urls';
import {
  InstrumentSection,
  InstrumentSectionPlaceholder,
} from '@/components/InstrumentSections/InstrumentSections';

const useRequest = <T,>(path: string) => {
  const [data, setData] = React.useState<T>();
  const [isLoading, setLoading] = React.useState(true);
  const [isError, setError] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    fetch(getServerUrl(path))
      .then((res) => res.json())
      .then((decoded) => setData(decoded))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return {
    data,
    isLoading,
    isError,
  };
};

const useRequestRefreshable = <T,>(path: string, refreshInterval: number) => {
  const [data, setData] = React.useState<T>();
  const [isLoading, setLoading] = React.useState(true);
  const [isFetching, setFetching] = React.useState(true);
  const [isError, setError] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    const intervalId = setInterval(() => {
      setFetching(true);
      fetch(getServerUrl(path))
        .then((res) => res.json())
        .then((decoded) => setData(decoded))
        .catch(() => setError(true))
        .finally(() => {
          setLoading(false);
          setFetching(false);
        });
    }, refreshInterval);

    return () => clearInterval(intervalId);
  }, []);

  return {
    data,
    isLoading,
    isFetching,
    isError,
  };
};

const splitByTypes = (
  data: CatalogInstrument[]
): {
  stocks: CatalogInstrument[];
  bonds: CatalogInstrument[];
} => {
  console.log('calculate');
  return data.reduce(
    (
      acc: {
        stocks: CatalogInstrument[];
        bonds: CatalogInstrument[];
      },
      item: CatalogInstrument
    ) => {
      switch (item.type) {
        case 'bond':
          return { ...acc, bonds: [...acc.bonds, item] };
        case 'stock':
          return { ...acc, stocks: [...acc.stocks, item] };

        default:
          return acc;
      }
    },
    { stocks: [], bonds: [] }
  );
};

const useInstruments = () =>
  useQuery({
    queryKey: ['catalog', 'instruments'],
    queryFn: () =>
      fetch(getServerUrl('/instruments')).then(
        (res) => res.json() as Promise<CatalogInstrument[]>
      ),
    staleTime: 0,
    cacheTime: 0,
  });

const useStockInstruments = () =>
  useQuery({
    queryKey: ['catalog', 'instruments', 'stocks'],
    queryFn: () =>
      fetch(getServerUrl('/instrumentsByType/stock')).then(
        (res) => res.json() as Promise<CatalogInstrument[]>
      ),
  });

const useBondInstruments = () =>
  useQuery({
    queryKey: ['catalog', 'instruments', 'bonds'],
    queryFn: () =>
      fetch(getServerUrl('/instrumentsByType/bond')).then(
        (res) => res.json() as Promise<CatalogInstrument[]>
      ),
  });

export function CatalogPage() {
  const { data: stocks, isLoading: isStocksLoading } = useStockInstruments();
  const { data: bonds, isLoading: isBondsLoading } = useBondInstruments();

  return (
    <SimpleGrid cols={1} verticalSpacing="xs">
      {isStocksLoading ? (
        <InstrumentSectionPlaceholder />
      ) : (
        <InstrumentSection instruments={stocks} label="stocks" />
      )}
      {isBondsLoading ? (
        <InstrumentSectionPlaceholder />
      ) : (
        <InstrumentSection instruments={bonds} label="bonds" />
      )}
    </SimpleGrid>
  );
}
