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
import { PatientRecord } from "./Patient/pages/PatientRecord";
import { LabResults } from "./Patient/pages/LAbResults";
import { Appointment } from "./Patient/pages/Appointment";
import { Notifications } from "./Patient/pages/Notification";
import { Settings } from "./Patient/pages/Settings";
import { Vitals } from "./Patient/pages/vitals/Page";
import { BodyTemp } from "./Patient/pages/vitals/pages/BodyTemperature";
import { PulseRate } from "./Patient/pages/vitals/pages/PulseRate";
import { BloodOxygen } from "./Patient/pages/vitals/pages/BloodOxygen";
import { RespirationRate } from "./Patient/pages/vitals/pages/RespirationRate";
import { MainDashboard } from "./Dashboard/Pages/Dashboard";
import { TodoList } from "./Dashboard/Pages/Task";
import { Profile } from "./Dashboard/Pages/Profile";

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
        { path: "settings", element: <Settings /> }
      ]
    },
    {
      path: "/patient", element: <Patient />, children: [
        { element: <PatientRecord />, index: true },
        { path: 'lab-results', element: <LabResults /> },
        { path: "appointments", element: <Appointment /> },
        { path: "notifications", element: <Notifications /> },
        { path: "profile", element: <Profile /> },
        { path: "settings", element: <Settings /> },
        {
          path: "vitals", element: <Vitals />, children: [
            { index: true, element: <BodyTemp /> },
            { path: "pulse-rate", element: <PulseRate /> },
            { path: "blood-oxygen", element: <BloodOxygen /> },
            { path: "respiration-rate", element: <RespirationRate /> }
          ]
        }
      ]
    }
  ])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
