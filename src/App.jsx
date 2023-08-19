import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./views/Home";
import Detail from './views/Detail';
import CreateProduct from "./views/CreateProductoFolder/CreateProduct";
import Products from "./views/Products";
import EditProduct from "./views/EditProducts";
import Cart from "./views/Cart/Cart"
import Perfil from "./views/Perfil"



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
    element: <EditProduct/>,
  },
  {
    path:"/products",
    element: <Products />,
  },
  {
    path:"/cart",
    element: <Cart />,
  },
  {
    path:"/profile",
    element: <Perfil />,
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
