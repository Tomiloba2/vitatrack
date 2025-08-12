import { Button, Drawer, Burger, Stack, Box, Image, Flex } from "@mantine/core";
import { useDisclosure, useHover } from "@mantine/hooks";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assests/logo.png"

export interface INavBarProps {
}

export function NavBar() {
  const [opened, { open, close }] = useDisclosure(false)
  const { hovered, ref } = useHover()
  const navigate=useNavigate()
    const handleClick=()=>{
        navigate('/login')
    }
  return (
    <div>
      <Flex justify={"space-between"} align={"center"} wrap={"nowrap"}>
        <Box p={10}>
          <Image
            h={70}
            w={70}
            radius={100}
            src={Logo}
            alt="vita track logo "
          />
        </Box>
        {/*Burger state */}
        <Box>
          <Burger onClick={open} hiddenFrom="sm" color="soft-blue" />
        </Box>
        <Box visibleFrom="sm">
          <Flex justify={"space-between"} gap={20}>
            <Link ref={ref} style={{
              textDecoration: "none",
              color: `${hovered ? "green" : "soft-blue"}`

            }}
              to={'/'}>Home</Link>
            <Link ref={ref} to='/dashboard' style={{
              textDecoration: "none",
              color: `${hovered ? "green" : "soft-blue"}`

            }}>Dashboard</Link>
            <Button onClick={handleClick} bg={"soft-blue"}>Explore VitaTrack</Button>
          </Flex>
        </Box>
      </Flex>
{/*Drawer component */}
      <Drawer opened={opened} onClose={close}>
        <Stack h={"80vh"} gap={"xl"} justify="center" align="center">
          <Link ref={ref} style={{
            textDecoration: "none",
            color: `${hovered ? "green" : "soft-blue"}`

          }}
            to={'/'}>Home</Link>
          <Link ref={ref} to='/dashboard' style={{
            textDecoration: "none",
            color: `${hovered ? "green" : "soft-blue"}`

          }}>Dashboard</Link>
          <Button onClick={handleClick}  bg={"soft-blue"} w={"50%"}>Explore VitaTrack</Button>
        </Stack>
      </Drawer>
    </div>
  );
}
