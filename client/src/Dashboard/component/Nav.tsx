import { Avatar, Box, Flex, Group, Image, Paper, Text } from "@mantine/core";
import logo from "../../assests/logo.png"
import {
    MdNotifications, MdSettings, MdLogout,
    MdMenu
} from "react-icons/md"
import { useNavigate } from "react-router-dom";


export interface INavbarProps {
    isOpen: () => void
}

export function Navbar(props: INavbarProps) {
    const navigate = useNavigate()
    return (
        <Paper shadow="lg" p={5}>
            <Flex
                justify={"space-between"}
            >
                <Box>
                    <Image
                        h={50}
                        w={50}
                        radius={100}
                        src={logo}
                    />
                </Box>
                <Box>
                    <Avatar
                        src={''}
                        alt={"Doctor name"}
                    >IA</Avatar>
                    <Text size="xs">Isaac Adedara</Text>
                </Box>
                <Group>
                    <Box hiddenFrom="xs"><MdMenu color="gray" cursor={"pointer"} size={20} onClick={props.isOpen} /></Box>
                    <Box><MdNotifications onClick={()=>navigate('/dashboard/notifications')} style={{
                        color: "gray",
                        fontSize: "20px",
                        cursor: "pointer"
                    }} /></Box>
                    <Box><MdSettings onClick={()=>navigate('/dashboard/settings')} style={{
                        color: "gray",
                        fontSize: "20px",
                        cursor: "pointer"
                    }} /></Box>
                    <Box> <MdLogout style={{
                        color: "gray",
                        fontSize: "20px",
                        cursor: "pointer"
                    }} /></Box>
                </Group>
            </Flex>
        </Paper>
    );
}
