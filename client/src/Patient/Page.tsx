import { Box, Container, Drawer, Stack } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { Navbar } from "./comp/Navbar";
import { SideBar } from "./comp/SideBar";
import { useDisclosure } from "@mantine/hooks";

export interface IPatientProps {
}

export function Patient() {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <div>
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
            flex: "4",
            overflow:"auto"
          }}>
            <Container>
              <Stack gap={10} style={{
                overflow:'hidden',
                height:"100vh",
              }}>
                <Box>
                  <Navbar isOpen={open} />
                </Box>
                <Box style={{
                  overflow:"auto"
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
    </div >
  );
}
