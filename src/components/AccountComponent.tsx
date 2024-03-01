import React from 'react';
import { List, Paper, Text } from '@mantine/core';
import { Account } from '@/server/src/instruments/accounts';

interface IProps {
    account: Account;
}

export const AccountComponent: React.FC<IProps> = ({ account }) => (
    <Paper key={account.id} shadow="sm" p={24}>
        <Text fw={700}>{account.name}</Text>
        <Text m={12}>Товары:</Text>
        <List>
            {account.instruments.map((instrument) => (
                <List.Item key={instrument.id}>{instrument.name}</List.Item>
            ))}
        </List>
    </Paper>
);
