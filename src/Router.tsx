import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { ProductsPage } from './pages/Products.page';
import { CartPage } from './pages/Cart.page';
import { CatalogPage } from './pages/Catalog.page';

export enum Paths {
  portfolio = 'portfolio',
  catalog = 'catalog',
  cart = 'cart',
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    children: [
      { path: Paths.portfolio, element: <ProductsPage /> },
      {
        path: Paths.catalog,
        element: <CatalogPage />,
      },
      {
        path: Paths.cart,
        element: <CartPage />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
