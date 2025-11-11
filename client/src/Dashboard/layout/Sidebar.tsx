import { Box, List, Text, ThemeIcon } from "@mantine/core";
import { MdDashboard, MdEditCalendar, MdList, MdNotifications, MdPerson, MdSettings } from "react-icons/md";
import styles from "../styles.module.css"
import { useNavigate } from "react-router-dom";

export interface ISideBarProps {
    isClose: () => void
}

export function SideBar(props: ISideBarProps) {
    const navigate = useNavigate()
    const handleClick = (route: string) => {
        navigate(route)
        props.isClose()
    }
    const sideNav = [
        { icon: <MdDashboard />, item: "Dashboard", to: "/dashboard" },
        { icon: <MdNotifications />, item: "Notifications", to: "/dashboard/notifications" },
        { icon: <MdEditCalendar />, item: "Appointment", to: "/dashboard/appointments" },
        { icon: <MdList />, item: "Task", to: "/dashboard/tasks" },
        { icon: <MdPerson />, item: "Profile", to: "/dashboard/profile" },
        { icon: <MdSettings />, item: "Settings", to: "/dashboard/settings" }
    ]
    return (
        <Box style={{
            height: "90vh",
            display: "flex",
            justifyContent: "center",
            alignItems: 'center'
        }}>
            <List spacing={"md"} center>
                {sideNav.map((li) => (
                    <List.Item onClick={() => handleClick(`${li.to}`)} className={styles.listItem} key={li.item}
                        icon={
                            <ThemeIcon size={24} radius={100} color="soft-blue">
                                {li.icon}
                            </ThemeIcon>
                        }>
                        <Text size="sm">
                            {li.item}
                        </Text>
                    </List.Item>
                ))}
            </List>
        </Box >
    );
}
