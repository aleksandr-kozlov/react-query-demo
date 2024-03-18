import { Button, SimpleGrid } from '@mantine/core';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getServerUrl } from '@/utils/urls';
import { Account } from '@/server/src/entities/accounts';
import { AccountComponent, AccountComponentPlaceholder } from '@/components/AccountComponent';
import { Paths } from '@/Router';

export const useAccounts = () => useQuery({
        queryKey: ['accounts', 'list'],
        queryFn: () => fetch(getServerUrl('/accounts')).then((res) => res.json() as Promise<Account[]>),
    });

export function AccountsPage() {
  const { data: accounts, isLoading } = useAccounts();
  const navigate = useNavigate();

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
