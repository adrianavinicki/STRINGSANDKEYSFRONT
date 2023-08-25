import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./views/Home";
import Detail from './views/Detail';
import CreateProduct from "./views/CreateProductoFolder/CreateProduct";
import Products from "./views/Products";
import DashboardAdmin from "./views/DashboardAdmin";
import Perfil from "./views/Perfil";
import Cart from "./views/Cart/Cart";
import Token from "./components/Token"
import Nosotros from "./views/Nosotros";
import Payment from "./views/Payment/Payment";
import ProductsAdmin from "./views/ProductsAdmin"
import UpdateProduct from "./views/UpdateProduct"
import ProductsData from "./views/ProductsTable";
import MisCompras from "./views/MisCompras"


const router = createBrowserRouter([
  {
    path:"/",
    element: <Home />,
  },
  {
    path:"/compras",
    element: <MisCompras />,
  },
  {
    path:'/detail/:id',
    element: <Detail/>,
  },
  {
    path:"/admin/edit/product/crear",
    element: <CreateProduct/>,
  },
  {
    path:"/admin/edit/product",
    element: <ProductsData/>,
  },
  {
    path:"/admin/edit/product/:id",
    element: <UpdateProduct />,
},
  {
    path:"/admin/edit",
    element: <DashboardAdmin/>,
  },
  {
    path:"/products",
    element: <Products />,
  },
  {
    path: "/profile",
    element: <Perfil/>,
  },
  {
    path: "/cart",
    element: <Cart/>,
  },
  {
    path: "/token",
    element: <Token/>,
  },
  {
    path: "/us",
    element: <Nosotros/>,
  },
  {
    path:"/payment",
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
