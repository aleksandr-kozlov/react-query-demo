import React from 'react';
import { Button, Container, List, Loader, Stack, Text } from '@mantine/core';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getServerUrl } from '@/utils/urls';
import { Agreement, AgreementBuilder } from '@/server/src/entities/agreements';

interface IProps {
    onAgreed: () => void;
}

export const Agreements: React.FC<IProps> = ({ onAgreed }) => {
    const isLoading = false;
    const agreements = AgreementBuilder.many(3);
    const agree = () => {};

    return (
        <Container py={24}>
            <Stack>
                <Text fw={700}>Для продолжения открытия счета вам необходимо подписать соглашения</Text>
                {isLoading ? <Loader /> : (
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
