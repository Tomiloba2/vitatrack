import { Avatar, Box, Flex, Group, Image, Paper, Stack, Text } from "@mantine/core";
import logo from "../../assests/logo.png"
import {
    MdNotifications, MdSettings, MdLogout
} from "react-icons/md"


export interface INavbarProps {
}

export function Navbar() {
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
                    <Box><MdNotifications style={{
                        color: "gray",
                        fontSize: "20px",
                        cursor: "pointer"
                    }} /></Box>
                    <Box><MdSettings style={{
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
