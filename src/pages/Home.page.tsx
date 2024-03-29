import { AppShell, Badge, Burger, Divider, Group, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconHome2 } from '@tabler/icons-react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Paths } from '@/Router';
import { ServiceButtons } from '@/components/ServiceButtons/ServiceButtons';
import { useActiveOperations } from '@/services/operations/useOperations';
import { OperationBuilder } from '@/server/src/entities/operations';

function NavigationSidebar() {
  const navigate = useNavigate();

  const activeOperations = OperationBuilder.many(3);

  return (
    <>
      <NavLink
        onClick={() => navigate(`${Paths.accounts}`)}
        label="Портфель"
        leftSection={<IconHome2 size="1rem" stroke={1.5} />}
      />
      <NavLink
        onClick={() => navigate(`${Paths.catalog}`)}
        label="Каталог"
        leftSection={<IconHome2 size="1rem" stroke={1.5} />}
      />
      <NavLink
        onClick={() => navigate(`${Paths.operations}`)}
        label="Заявки"
        leftSection={
          activeOperations?.length ? (
            <Badge size="xs" color="red" circle>
              {activeOperations.length}
            </Badge>
          ) : (
            <Badge size="xs" color="grey" circle />
          )
        }
      />
    </>
  );
}

export function HomePage() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 0 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavigationSidebar />
        <Divider />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
