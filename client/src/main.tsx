import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "@mantine/core/styles.css"
import "@mantine/charts/styles.css"
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import { MantineProvider, createTheme } from "@mantine/core"
import { Notifications } from "@mantine/notifications"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const theme = createTheme({
  colors: {
    "soft-blue": [
      "#e5f5ff",
      "#d2e6fe",
      "#a7cbf4",
      "#78adeb",
      "#4a90e2",
      "#3885df",
      "#287dde",
      "#166bc6",
      "#065fb2",
      "#00529f"
    ],
    "clean-white": [
      "#ffffff",
      "#f0fbff",
      "#cdcdcd",
      "#b2b2b2",
      "#9a9a9a",
      "#8b8b8b",
      "#848484",
      "#717171",
      "#656565",
      "#575757"
    ],
    "muted-teal": [
      "#e2fef9",
      "#d4f6ef",
      "#afe9de",
      "#86dccb",
      "#63d1bc",
      "#48c9b0",
      "#3dc7ad",
      "#2bb097",
      "#1b9d86",
      "#008873"
    ],
    "warm-gray": [
      "#ecf0f1",
      "#e8e8e8",
      "#cfd0d0",
      "#b1b6b8",
      "#98a1a3",
      "#879397",
      "#7d8d91",
      "#6a7a7e",
      "#5c6d71",
      "#4a5f64"
    ],
    "alert-red": [
      "#ffebe8",
      "#ffd6d2",
      "#f6ada5",
      "#ef8075",
      "#e95a4c",
      "#e74c3c",
      "#e53523",
      "#cb2717",
      "#b61f13",
      "#a0140c"
    ],
    "success-green": [
      "#e6fef0",
      "#d5f7e3",
      "#adedc8",
      "#81e3aa",
      "#5dda91",
      "#45d481",
      "#2ecc71",
      "#26b966",
      "#1aa559",
      "#008f4a"
    ],
    "dark-gray": [
      "#f2f5f8",
      "#e5e7e9",
      "#c5ccd4",
      "#a3b1bf",
      "#8799ad",
      "#748ba3",
      "#6a839f",
      "#59718b",
      "#4d647d",
      "#34495e"
    ],
    "light-gray": [
      "#ecf6fd",
      "#e3e8ec",
      "#bdc3c7",
      "#adb3b7",
      "#949ba0",
      "#848d93",
      "#7b868d",
      "#68737b",
      "#5a676f",
      "#485964"
    ]

  }
})

const queryclient = new QueryClient()


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <Notifications />
      <QueryClientProvider client={queryclient}>
        <App />
      </QueryClientProvider>
    </MantineProvider>
  </StrictMode>,
)
