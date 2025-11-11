import { Box, Button, Flex, Group, Paper, Select, Stack, Text, Tooltip } from "@mantine/core";
import { MdClearAll, MdDangerous, MdInfo, MdRefresh, MdWarning } from "react-icons/md";
import { DateTimePicker } from "@mantine/dates"
import { useState } from "react";
import dayjs from "dayjs";


export interface INotificationsProps {
}

export function Notifications() {
    const [dateValue, setDateValue] = useState<string | null>(null)
    const notificationsFeed = [
        {
            severity: "critical", message: "Patient ID-23345jxjbjx:Heart rate above 150bpm", timestamp: "aug 31,2025-14:32"
        }, {
            severity: "warning", message: "Patient ID-23345jxjbjx:Heart rate above 150bpm", timestamp: "aug 31,2025-14:32"
        }, {
            severity: "critical", message: "Patient ID-23345jxjbjx:Heart rate above 150bpm", timestamp: "aug 31,2025-14:32"
        }, {
            severity: "info", message: "Patient ID-23345jxjbjx:Heart rate above 150bpm", timestamp: "aug 31,2025-14:32"
        }, {
            severity: "critical", message: "Patient ID-23345jxjbjx:Heart rate above 150bpm", timestamp: "aug 31,2025-14:32"
        },

    ]
    const severity = [
        { name: "Critical Alerts", number: "5", icon: <MdDangerous size={'20px'} color="red" /> },
        { name: "Warnings", number: "5", icon: <MdWarning size={'20px'} color="#f1c40f" /> },
        { name: "Info Logs", number: "5", icon: <MdInfo size={'20px'} color="soft-blue" /> }
    ]
    return (
        <Box style={{
            //overflow: "hidden",
            //height: "85vh"
        }}>
            <Stack pt={10} c={"dark-gray.9"}>
                <Flex justify={'space-between'} p={"xs"}>
                    <Text size="xl" fw={"bolder"}>Notifications</Text>
                    <Group>
                        <Box id="refresh">
                            <MdRefresh
                                style={{
                                    color: "gray",
                                    fontSize: "20px",
                                    cursor: "pointer"
                                }} />
                        </Box>
                        <Box id='clearAll'>
                            <MdClearAll
                                style={{
                                    color: "gray",
                                    fontSize: "20px",
                                    cursor: "pointer"
                                }} /></Box>
                    </Group>
                </Flex>
                <Box>
                    <Box>
                        <Flex align={"start"} justify={"space-between"} wrap={'wrap-reverse'} gap={20}>
                            <Stack flex={{ base: 6, md: 4, lg: 5 }}>
                                <Box p={20}>
                                    <Flex justify={'space-evenly'} wrap={'wrap-reverse'}>
                                        <DateTimePicker
                                            dropdownType='modal'
                                            label="Date & Time"
                                            placeholder="04/09/2025 09:45"
                                            presets={[
                                                { value: dayjs().format("DD/MM/YYYY HH:mm"), label: "Today" },
                                                { value: dayjs().add(1, "day").format("DD/MM/YYYY HH:mm"), label: "Tomorrow" },
                                                { value: dayjs().add(2, "day").format("DD/MM/YYYY HH:mm"), label: "Next Tomorrow" },
                                            ]}
                                            value={dateValue}
                                            onChange={setDateValue}
                                        />
                                        <Select
                                            label='Status'
                                            p={'sm'}
                                            placeholder='(critical | warning | stable)'
                                            data={["critical", "warning", "info"]}
                                        />
                                    </Flex>
                                </Box>
                                {notificationsFeed.map((item) => {
                                    return (
                                        <Paper key={item.message} shadow="lg">
                                            <Stack p={'xs'}>
                                                <Box>
                                                    {item.severity === "critical" && (
                                                        <>
                                                            <Group>
                                                                <MdDangerous size={'30px'} color="red" />
                                                                <Text c={'alert-red'}>{item.severity.toUpperCase()}</Text>
                                                            </Group>
                                                        </>
                                                    )}
                                                    {item.severity === "warning" && (
                                                        <>
                                                            <Group>
                                                                <MdWarning size={'30px'} color="#f1c40f" />
                                                                <Text c={'yellow'}>{item.severity.toUpperCase()}</Text>
                                                            </Group>
                                                        </>
                                                    )}
                                                    {item.severity === "info" && (
                                                        <>
                                                            <Group>
                                                                <MdInfo size={'30px'} color="soft-blue" />
                                                                <Text c={"soft-blue"}>{item.severity.toUpperCase()}</Text>
                                                            </Group>
                                                        </>
                                                    )}
                                                </Box>
                                                <Box>
                                                    <Text size="md" fw={'bold'}>{item.message}</Text>
                                                    <Text size="sm">{item.timestamp}</Text>
                                                </Box>
                                                <Box>
                                                    <Group>
                                                        <Button variant="outline">Acknowledged</Button>
                                                        <Button>View Patient</Button>
                                                    </Group>
                                                </Box>
                                            </Stack>
                                        </Paper>
                                    )
                                })}
                            </Stack>
                            <Paper shadow="lg" p={10} h={'100%'} flex={{ base: 6, md: 3, lg: 1 }}>
                                <Stack>
                                    {severity.map((item) => {
                                        return (
                                            <Paper key={item.name} shadow="lg" p={'md'}>
                                                <Group>
                                                    <>{item.icon}</>
                                                    <Text size="sm">{item.name}</Text>
                                                </Group>
                                                <Text size="xl" fw={'bold'} ta={"center"}>{item.number}</Text>
                                            </Paper>
                                        )
                                    })}
                                </Stack>
                            </Paper>
                        </Flex>
                    </Box>
                </Box>
            </Stack>

            {/* -------tooltips------- */}
            <Tooltip label='refresh' target='#refresh' />
            <Tooltip label='clear all' target='#clearAll' />
        </Box>
    )
}