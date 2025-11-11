import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import { Home } from "./Home/Page";
import { Login } from "./Auth/pages/Login";
import { ForgotPassword } from "./Auth/pages/ForgotPassword";
import { ResetPassword } from "./Auth/pages/ResetPassword";
import { Dashboard } from "./Dashboard/Page";
import { PatientRecord } from "./Dashboard/Pages/patients/PatientRecord";
import { MainDashboard } from "./Dashboard/Pages/patients/Dashboard";
import { TodoList } from "./Dashboard/Pages/tasks/Task";
import { Profile } from "./Dashboard/Pages/profile/Profile";
import { Appointment } from "./Dashboard/Pages/appointment/Appointment";
import { Notifications } from "./Dashboard/Pages/notifications/Notification";
import { Settings } from "./Dashboard/Pages/settings/Settings";
import { ProtectedRoutes } from "./Dashboard/Protected";
import axios from "axios";

export interface IAppProps {
}

export default function App() {
  axios.defaults.withCredentials = true
  const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: '/forgot-password', element: <ForgotPassword /> },
    { path: "/reset-password", element: <ResetPassword /> },
    {
      element: <ProtectedRoutes />, children: [
        {
          path: '/dashboard', element: <Dashboard />, children: [
            { index: true, element: <MainDashboard /> },
            { path: "appointments", element: <Appointment /> },
            { path: "notifications", element: <Notifications /> },
            { path: "tasks", element: <TodoList /> },
            { path: "profile", element: <Profile /> },
            { path: "settings", element: <Settings /> },
            {
              path: ":id", element: <PatientRecord />
            }
          ]
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
