import React from 'react';
import { Button, Container, List, Loader, Stack, Text } from '@mantine/core';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getServerUrl } from '@/utils/urls';
import { Agreement } from '@/server/src/entities/agreements';

interface IProps {
    onAgreed: () => void;
}

export const Agreements: React.FC<IProps> = ({ onAgreed }) => {
    const { data: agreements, isLoading: isAgreementsLoading } = useQuery({
        queryKey: ['account', 'agreements'],
        queryFn: () => fetch(getServerUrl('/agreements')).then((res) => res.json() as Promise<Agreement[]>),
        cacheTime: 0,
    });

    const { mutate: agree, isLoading: isConfirming, isSuccess: isConfirmed } = useMutation({
        mutationFn: () => fetch(getServerUrl('/agreements'), {
            method: 'PATCH',
        }),
        onSuccess: onAgreed,
    });

    return (
        <Container py={24}>
            <Stack>
                <Text fw={700}>Для продолжения открытия счета вам необходимо подписать соглашения</Text>
                {isAgreementsLoading || isConfirming || isConfirmed ? <Loader /> : (
                    <>
                        <List>
                            {agreements?.map((agreement) => (
                                <List.Item key={agreement.id}>{agreement.name}</List.Item>
                            ))}
                        </List>
                        <Button onClick={() => agree()}>Согласиться</Button>
                    </>
                )}
            </Stack>
        </Container>
    );
};
