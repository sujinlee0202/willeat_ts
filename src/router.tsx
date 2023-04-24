import { RouteObject, createBrowserRouter } from "react-router-dom";
import Home from "./pages/home"
import AddNewPlace from "./pages/addnewplace";

const routeData: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/newplace',
    element: <AddNewPlace />
  }
]

export const routers = createBrowserRouter(
  routeData.map(router => {
    return {
      path: router.path,
      element: router.element,
    }
  })
)