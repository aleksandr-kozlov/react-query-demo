import { SimpleGrid, Skeleton, Stack, Text } from '@mantine/core';
import React from 'react';
import { CatalogInstrument } from '@/server/src/entities/instrument';
import { InstrumentCard } from '../CatalogInstrument/CatalogInstrument';
import { CatalogInstrumentPlaceholder } from '../placeholders/CatalogInstrumentPlaceholder';

interface IProps {
  label: string;
  instruments?: CatalogInstrument[];
}

export const InstrumentSection: React.FC<IProps> = ({ label, instruments }) => (
  <>
    <Text size="lg">{label}</Text>
    <SimpleGrid cols={1} verticalSpacing="xs">
      {instruments?.map((instrument) => (
        <InstrumentCard key={instrument.id} instrument={instrument} />
      ))}
    </SimpleGrid>
  </>
);

export const InstrumentSectionPlaceholder = () => (
  <Stack>
    <Skeleton h={16} w={100} />
    <SimpleGrid cols={1} verticalSpacing="xs">
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <CatalogInstrumentPlaceholder key={index} />
        ))}
    </SimpleGrid>
  </Stack>
);
