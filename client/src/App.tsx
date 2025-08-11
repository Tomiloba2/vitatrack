import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import { Home } from "./Home/Page";
import { Login } from "./Auth/pages/Login";
import { ForgotPassword } from "./Auth/pages/ForgotPassword";
import { ResetPassword } from "./Auth/pages/ResetPassword";
import { Dashboard } from "./Dashboard/Page";
import { Patient } from "./Patient/Page";

export interface IAppProps {
}

export default function App() {
  const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: '/forgot-password', element: <ForgotPassword /> },
    { path: "/reset-password", element: <ResetPassword /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: "/patient", element: <Patient /> }
  ])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
