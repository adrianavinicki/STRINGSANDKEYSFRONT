import { createBrowserRouter, RouterProvider } from "react-router-dom";
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


const router = createBrowserRouter([
  {
    path:"/",
    element: <Home />,
  },
  {
    path:'/detail/:id',
    element: <Detail/>,
  },
  {
    path:"/admin/crear-producto",
    element: <CreateProduct/>,
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
