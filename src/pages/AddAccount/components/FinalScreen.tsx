import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Stack, Text, Button, Container, Loader } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { getServerUrl } from '@/utils/urls';

export function FinalScreen() {
    const client = useQueryClient();
    const navigate = useNavigate();

    const { mutate: createAccount, isLoading: isCreating, isSuccess: isCreated } = useMutation({
        mutationFn: () => fetch(getServerUrl('/accounts'), {
            method: 'PUT',
        }),
        onSuccess: async () => {
            await client.invalidateQueries(['accounts', 'list']);
            navigate('/accounts');
        },
    });

    if (isCreating || isCreated) {
        return <Loader />;
    }

    return (
        <Container py={24}>
            <Stack>
                <Text fw={700} mb={20}>Проверьте что все правильно</Text>
                <Button onClick={() => createAccount()}>Все хорошо</Button>
            </Stack>
        </Container>
    );
}
