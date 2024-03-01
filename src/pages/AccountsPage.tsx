import { Button } from '@mantine/core';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getServerUrl } from '@/utils/urls';
import { Account } from '@/server/src/instruments/accounts';
import { AccountComponent } from '@/components/AccountComponent';
import { Paths } from '@/Router';

export const useAccounts = () => useQuery({
        queryKey: ['accounts', 'list'],
        queryFn: () => fetch(getServerUrl('/accounts')).then((res) => res.json() as Promise<Account[]>),
    });

export function AccountsPage() {
  const { data: accounts, isLoading } = useAccounts();
  const navigate = useNavigate();

    const handleAddAccount = () => navigate(`/${Paths.addAccount}`);

  if (isLoading) {
      return <div>loading</div>;
  }

  return (
      <>
          {accounts?.map((account) => (
              <AccountComponent key={account.id} account={account} />
          ))}
          <Button onClick={handleAddAccount} mt={20}>Добавить новый счет</Button>
      </>
  );
}
