import React from 'react';
import { Button, Container, List, Loader, Stack, Text } from '@mantine/core';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getServerUrl } from '@/utils/urls';
import { Agreement } from '@/server/src/instruments/agreements';

interface IProps {
    onSigned: () => void;
}

export const Documents: React.FC<IProps> = ({ onSigned }) => {
    const { data: documents, isSuccess: isDocumentsGenerated } = useQuery({
        queryKey: ['account', 'documents'],
        queryFn: () => fetch(getServerUrl('/documents')).then(res => res.json() as Promise<Agreement[]>),
        cacheTime: 0,
        retryDelay: 1000,
        retry: true,
    });

    const { mutate: sign, isLoading: isSigning, isSuccess: isSigned } = useMutation({
        mutationFn: () => fetch(getServerUrl('/documents'), {
            method: 'PATCH',
        }),
        onSuccess: onSigned,
    });

    return (
        <Container py={24}>
            <Stack>
                <Text>Подпишите документы для открытия счета</Text>
                {!isDocumentsGenerated || isSigning || isSigned ? <Loader /> : (
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
