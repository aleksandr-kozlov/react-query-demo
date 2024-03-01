import { Button, SimpleGrid, Space } from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Account, AccountBuilder } from '@/server/src/entities/accounts';
import { AccountComponent, AccountComponentPlaceholder } from '@/components/AccountComponent';
import { Paths } from '@/Router';

export function AccountsPage() {
    const navigate = useNavigate();
  const isLoading = false;
  const accounts = AccountBuilder.many(3);

    const handleAddAccount = () => navigate(`/${Paths.addAccount}`);

  return (
      <>
          <SimpleGrid spacing="xs" cols={1}>
              {isLoading ? <AccountComponentPlaceholder /> : (
                  <>
                      {accounts?.map((account) => (
                          <AccountComponent key={account.id} account={account} />
                      ))}
                  </>
              )}
          </SimpleGrid>
          <Button onClick={handleAddAccount} mt={20}>Добавить новый счет</Button>
      </>
  );
}
