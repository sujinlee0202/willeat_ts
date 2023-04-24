import { RouteObject, createBrowserRouter } from "react-router-dom";
import Home from "./pages/home"
import AddNewPlace from "./pages/addnewplace";
import LoginLayout from "./layout/LoginLayout";

const routeData: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/newplace',
    element: (
      <LoginLayout requireAdmin={true}>
        <AddNewPlace />
      </LoginLayout>
    )
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