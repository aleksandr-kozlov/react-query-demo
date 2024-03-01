import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { AccountsPage } from './pages/AccountsPage';
import { OperationsPage } from './pages/OperationsPage';
import { CatalogPage } from './pages/Catalog.page';
import { AddAccountPage } from './pages/AddAccountPage';

export enum Paths {
  accounts = 'accounts',
  catalog = 'catalog',
  operations = 'operations',
  addAccount = 'add_account',
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    children: [
      {
        path: Paths.accounts,
        element: <AccountsPage />,
      },
      {
        path: Paths.catalog,
        element: <CatalogPage />,
      },
      {
        path: Paths.operations,
        element: <OperationsPage />,
      },
      {
        path: Paths.addAccount,
        element: <AddAccountPage />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
