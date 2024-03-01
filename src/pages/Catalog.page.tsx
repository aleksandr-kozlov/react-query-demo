import React from 'react';
import { SimpleGrid } from '@mantine/core';
import {
  InstrumentSection,
  InstrumentSectionPlaceholder,
} from '@/components/InstrumentSections/InstrumentSections';
import { CatalogInstrumentBuilder } from '@/server/src/entities/Instrument';

export function CatalogPage() {
  const isLoading = false;
  const instruments = CatalogInstrumentBuilder.many(3);

  return (
    <SimpleGrid cols={1} verticalSpacing="xs">
      {isLoading ? (
        <InstrumentSectionPlaceholder />
      ) : (
        <InstrumentSection instruments={instruments} label="Товары" />
      )}
    </SimpleGrid>
  );
}
