import { Box, List, Text, ThemeIcon } from "@mantine/core";
import { MdBloodtype, MdCo2, MdDashboard, MdDataset, MdEditCalendar, MdMonitorHeart, MdNotifications, MdOutput, MdSettings, MdThermostat } from "react-icons/md";
import styles from "../styles/styles.module.css"
import { Link } from "react-router-dom";

export interface ISideBarProps {
    isClose?: () => void
}

export function SideBar(props: ISideBarProps) {
    const sideNav = [
        { icon: <MdDashboard />, item: "Dashboard", to: "/dashboard" },
        { icon: <MdDataset />, item: "Patient Records", to: "/patient" },
        { icon: <MdThermostat />, item: "Body Temperature", to: "/patient/vitals" },
        { icon: <MdBloodtype />, item: "Blood Oxygen level", to: "/patient/vitals/blood-oxygen" },
        { icon: <MdCo2 />, item: "Respiration Rate", to: "/patient/vitals/respiration-rate" },
        { icon: <MdMonitorHeart />, item: "Pulse Rate", to: "/patient/vitals/pulse-rate" },
        { icon: <MdOutput />, item: "Lab Results", to: "/patient/lab-results" },
        { icon: <MdNotifications />, item: "Notifications", to: "/patient/notifications" },
        { icon: <MdEditCalendar />, item: "Appointment", to: "/patient/appointments" },
        { icon: <MdSettings />, item: "Settings", to: "/patient/settings" },
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
                    <List.Item className={styles.listItem} key={li.item}
                        icon={
                            <ThemeIcon size={24} radius={100} color="soft-blue">
                                {li.icon}
                            </ThemeIcon>
                        }>
                        <Text size="sm">
                            <Link to={li.to} onClick={props.isClose} style={{
                                textDecoration: "none"
                            }}> {li.item}</Link>
                        </Text>
                    </List.Item>
                ))}
            </List>
        </Box>
    );
}
