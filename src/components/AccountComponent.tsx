import React from 'react';
import { List, Paper, SimpleGrid, Skeleton, Text } from '@mantine/core';
import { Account } from '@/server/src/instruments/accounts';
import { CatalogInstrumentPlaceholder } from '@/components/placeholders/CatalogInstrumentPlaceholder';

interface IProps {
    account: Account;
}

export const AccountComponent: React.FC<IProps> = ({ account }) => (
    <Paper shadow="sm" p={24}>
        <Text fw={700}>{account.name}</Text>
        <Text m={12}>Товары:</Text>
        <List>
            {account.instruments.map((instrument) => (
                <List.Item key={instrument.id}>{instrument.name}</List.Item>
            ))}
        </List>
    </Paper>
);

export const AccountComponentPlaceholder = () => (
    <Paper shadow="sm" p={24}>
        <Skeleton h={16} w={150} mb={8} />
        <Skeleton h={14} w={100} mb={16} />
        <SimpleGrid cols={1} spacing="xs">
            {Array(3)
                .fill(0)
                .map((_, index) => (
                    <Skeleton key={index} h={14} w={150} />
                ))}
        </SimpleGrid>
    </Paper>
);
