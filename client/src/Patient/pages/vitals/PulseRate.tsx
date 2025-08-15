import { LineChart } from "@mantine/charts";
import { Box, Stack, Table, Text } from "@mantine/core";


export interface IPulseRateProps {
}

export function PulseRate() {
    const data = [
        { time: '11:00', pulseRate: 95 },
        { time: '11:05', pulseRate: 90 },
        { time: '11:10', pulseRate: 91 },
        { time: '11:15', pulseRate: 97 },
        { time: '11:20', pulseRate: 93 },
        { time: '11:25', pulseRate: 98 },
        { time: '11:30', pulseRate: 87 },
        { time: '11:35', pulseRate: 82 },
        { time: '11:40', pulseRate: 84 },
        { time: '11:45', pulseRate: 95 },
        { time: '11:50', pulseRate: 98 },
        { time: '11:55', pulseRate: 90 },
        { time: '12:00', pulseRate: 91 }
    ];
    return (
        <div>
            <Box>
                <Stack gap={20}>
                    <Text size='lg' fw={700} p={5}>Pulse Rate</Text>
                    <LineChart
                        h={200}
                        data={data}
                        series={[{ name: 'pulseRate', label: 'pulseRate' }]}
                        dataKey="time"
                        type="gradient"
                        gradientStops={[
                            { offset: 0, color: 'red.6' },
                            { offset: 20, color: 'orange.6' },
                            { offset: 40, color: 'yellow.5' },
                            { offset: 70, color: 'lime.5' },
                            { offset: 80, color: 'cyan.5' },
                            { offset: 100, color: 'blue.5' },
                        ]}
                        strokeWidth={5}
                        curveType="natural"
                        yAxisProps={{ domain: [80.5, 120] }}
                        valueFormatter={(value) => `${value}bpm`}
                    />
                    <Table>
                        <Table.Thead>
                            <Table.Tr>

                                <Table.Th>Time</Table.Th>
                                <Table.Th>Pulse Rate</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {data.map((item) => {
                                return (
                                    <Table.Tr key={item.time}>
                                        <Table.Td><Text c={'dark-gray'}>{item.time}</Text></Table.Td>
                                        <Table.Td><Text c={'dark-gray.8'}>{item.pulseRate}bpm</Text></Table.Td>
                                    </Table.Tr>
                                )
                            })}
                        </Table.Tbody>
                    </Table>
                </Stack>
            </Box>
        </div>
    );
}
