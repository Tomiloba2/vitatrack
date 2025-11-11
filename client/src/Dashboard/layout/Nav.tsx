import { Avatar, Box, Flex, Group, Image, Paper, Text, Tooltip } from "@mantine/core";
import logo from "../../assests/logo.png"
import {
    MdNotifications, MdSettings, MdLogout,
    MdMenu
} from "react-icons/md"
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export interface INavbarProps {
    isOpen: () => void
}

export function Navbar(props: INavbarProps) {
    const navigate = useNavigate()
    const handleLogout = useQuery({
        queryKey: ['logout'],
        queryFn: async () => {
            try {
                const data = await axios.get(`${import.meta.env.VITE_SERVER}/logout`)
                return data.data
            } catch (error) {
                console.error(error)
                throw error
            }
        }
    })
    return (
        <Paper shadow="sm" p={2}>
            <Flex
                justify={"space-between"}
                wrap={"wrap"}
            >
                <Box style={{
                    cursor:"pointer"
                }}>
                    <Image
                        h={50}
                        w={50}
                        radius={100}
                        src={logo}
                        onClick={()=>navigate('/')}
                    />
                </Box>
                <Box>
                    <Avatar
                        src={''}
                        alt={"Doctor name"}
                    >IA</Avatar>
                    <Text size="xs">Isaac Adedara</Text>
                </Box>
                <Group p={{xs:"20"}}>
                    <Box hiddenFrom="sm"><MdMenu color="gray" cursor={"pointer"} size={20} onClick={props.isOpen} /></Box>
                    <Box id="notifications">
                        <MdNotifications onClick={() => navigate('/dashboard/notifications')}
                            style={{
                                color: "gray",
                                fontSize: "20px",
                                cursor: "pointer"
                            }} />
                    </Box>
                    <Box id='settings'>
                        <MdSettings onClick={() => navigate('/dashboard/settings')}
                            style={{
                                color: "gray",
                                fontSize: "20px",
                                cursor: "pointer"
                            }} /></Box>
                    <Box id='logout'> <MdLogout 
                    onClick={()=>handleLogout}
                    style={{
                        color: "gray",
                        fontSize: "20px",
                        cursor: "pointer"
                    }} /></Box>
                </Group>
                {/* -------tooltips------- */}
                <Tooltip label='notifications' target='#notifications' />
                <Tooltip label='settings' target='#settings' />
                <Tooltip label='logout' target='#logout' />
            </Flex>
        </Paper>
    );
}
