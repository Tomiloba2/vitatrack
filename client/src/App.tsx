import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import { Home } from "./Home/Page";
import { Login } from "./Auth/pages/Login";
import { ForgotPassword } from "./Auth/pages/ForgotPassword";
import { ResetPassword } from "./Auth/pages/ResetPassword";
import { Dashboard } from "./Dashboard/Page";
import { PatientRecord } from "./Patient/PatientRecord";
import { MainDashboard } from "./Dashboard/Pages/Dashboard";
import { TodoList } from "./Dashboard/Pages/Task";
import { Profile } from "./Dashboard/Pages/Profile";
import { Appointment } from "./Dashboard/Pages/Appointment";
import { Notifications } from "./Dashboard/Pages/Notification";
import { Settings } from "./Dashboard/Pages/Settings";

export interface IAppProps {
}

export default function App() {
  const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: '/forgot-password', element: <ForgotPassword /> },
    { path: "/reset-password", element: <ResetPassword /> },
    {
      path: '/dashboard', element: <Dashboard />, children: [
        { index: true, element: <MainDashboard /> },
        { path: "appointments", element: <Appointment /> },
        { path: "notifications", element: <Notifications /> },
        { path: "tasks", element: <TodoList /> },
        { path: "profile", element: <Profile /> },
        { path: "settings", element: <Settings /> },
        {
          path: "patient", element: <PatientRecord />
        }
      ]
    },

  ])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
