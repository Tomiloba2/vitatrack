import { Box, Container, Drawer, Stack } from "@mantine/core";
import { Navbar } from "./component/Nav";
import { SideBar } from "./component/Sidebar";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router-dom";

export interface IDashboardProps {
}

export function Dashboard() {
  const [opened, { open, close }] = useDisclosure(false)
  return (
    <Box>
      <Box style={{
        overflow: "hidden",
        height: "100vh"
      }}>
        <Box style={{
          display: "flex",
          height: "100%"
        }}>
          <Box visibleFrom="xs" style={{
            flex: "1 0 10%",
          }}>
            <SideBar isClose={close} />
          </Box>
          <Box style={{
            flex: "6",
            overflow: "auto"
          }}>
            <Container>
              <Stack gap={10} style={{
                overflow: 'hidden',
                height: "100vh",
              }}>
                <Box>
                  <Navbar isOpen={open} />
                </Box>
                <Box style={{
                  overflow: "auto"
                }}>
                  <Outlet />
                </Box>
              </Stack>
            </Container>
          </Box>
        </Box>
      </Box>
      <Drawer opened={opened} onClose={close}>
        <SideBar isClose={close} />
      </Drawer>
    </Box>
  );
}
