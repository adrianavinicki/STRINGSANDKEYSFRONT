import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./views/Home";
import Detail from './views/Detail';
import CreateProduct from "./views/DashBoardAdmin/CreateProductoFolder/CreateProduct";
import Products from "./views/Products";
import DashboardAdmin from "./views/DashBoardAdmin/DashboardAdmin2.0";
import Perfil from "./views/Perfil";
import Cart from "./views/Cart/Cart";
import Token from "./components/Token"
import Nosotros from "./views/Nosotros";
import Payment from "./views/Payment/Payment";
import UpdateProduct from "./views/DashBoardAdmin/UpdateProduct"
import ProductsData from "./views/DashBoardAdmin/ProductsTable";
import MisCompras from "./views/MisCompras"
import PrivateRoute from "./components/SecurityRoutes/PrivateRoutes";
import UsersTable from "./views/DashBoardAdmin/UsersTable";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/compras",
    element: <MisCompras />,
  },
  {
    path: '/detail/:id',
    element: <Detail />,
  },
  {
    path: "/admin/users",
    element: <UsersTable />
  },

  {
    path: "/admin/product/crear",
    element: <CreateProduct />,
  },
  {
    path: "/admin/product",
    element:
      <ProductsData />,
  },
  {
    path: "/admin/product/:id",
    element: <UpdateProduct />,
  },
  {
    path: "/admin/*",
    element: <PrivateRoute><DashboardAdmin /></PrivateRoute>,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/profile",
    element: <PrivateRoute><Perfil /></PrivateRoute>,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/token",
    element: <Token />,
  },
  {
    path: "/us",
    element: <Nosotros />,
  },
  {
    path: "/payment",
    element: <Payment />,
  },

])


function App() {

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
