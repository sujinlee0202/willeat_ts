import { RouteObject, createBrowserRouter } from "react-router-dom";
import Home from "./pages/home"
import AddNewPlace from "./pages/addnewplace";
import LoginLayout from "./layout/LoginLayout";
import SearchPlacePage from "./pages/SearchPlacePage";
import MainPage from "./pages/MainPage";

const routeData: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/search/:id',
        element: <SearchPlacePage />,
      }
    ]
  },
  {
    path: '/newplace',
    element: (
      <LoginLayout requireAdmin={true}>
        <AddNewPlace />
      </LoginLayout>
    )
  },
]

export const routers = createBrowserRouter(
  routeData.map(router => {
    return {
      path: router.path,
      element: router.element,
      children: router.children
    }
  })
)