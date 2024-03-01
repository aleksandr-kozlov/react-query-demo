import React from 'react';
import { Button, Container, List, Loader, Stack, Text } from '@mantine/core';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getServerUrl } from '@/utils/urls';
import { Agreement, AgreementBuilder } from '@/server/src/entities/agreements';

interface IProps {
    onSigned: () => void;
}

export const Documents: React.FC<IProps> = ({ onSigned }) => {
    const isLoading = false;
    const documents = AgreementBuilder.many(3);
    const sign = () => {};

    return (
        <Container py={24}>
            <Stack>
                <Text>Подпишите документы для открытия счета</Text>
                {isLoading ? <Loader /> : (
                    <>
                        <List>
                            {documents?.map((document) => (
                                <List.Item key={document.id}>{document.name}</List.Item>
                            ))}
                        </List>
                        <Button onClick={() => sign()}>Подписать</Button>
                    </>
                )}
            </Stack>
        </Container>
    );
};
