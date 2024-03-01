import React from 'react';
import { Stack, Text, Button, Container, Loader } from '@mantine/core';

export function FinalScreen() {
    const isLoading = false;
    const createAccount = () => {};

    if (isLoading) {
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
