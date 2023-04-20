import { RouteObject, createBrowserRouter } from "react-router-dom";
import Home from "./home"

const routeData: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
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