import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  HomeLayout,
  Error,
  Register,
  Cart,
  Login,
  Products,
  SingleProduct,
  Landing,
  Orders,
  Checkout,
  About,
} from './pages'
//Loader
import { loader as LandingLoader } from './pages/Landing'
import { loader as ProductsLoader } from './pages/Products'
import { loader as SingleProductLoader } from './pages/SingleProduct'
import { loader as CheckoutLoader } from './pages/Checkout'
import { loader as OrdersLoader } from './pages/Orders'
//actions
import { action as LoginAction } from './pages/Login'
import { action as RegisterAction } from './pages/Register'
import { action as CheckoutAction } from './pages/Checkout'
import { store } from './store'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
})
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader: LandingLoader(queryClient),
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/products',
        element: <Products />,
        loader: ProductsLoader(queryClient),
      },
      {
        path: '/products/:id',
        element: <SingleProduct />,
        loader: SingleProductLoader(queryClient),
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/checkout',
        element: <Checkout />,
        loader: CheckoutLoader(store),
        action: CheckoutAction(store),
      },
      {
        path: '/orders',
        element: <Orders />,
        loader: OrdersLoader(store, queryClient),
      },
    ],
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <Error />,
    action: RegisterAction,
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
    action: LoginAction(store),
  },
])
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
export default App
