import { LineChart } from "@mantine/charts";
import { Box, Stack, Table, Text } from "@mantine/core";


export interface IBodyTempProps {
}

export function BodyTemp() {
    const data = [
        { date: '11:00', temperature: 37.0 },
        { date: '11:05', temperature: 37.0 },
        { date: '11:10', temperature: 37.1 },
        { date: '11:15', temperature: 37.2 },
        { date: '11:20', temperature: 37.2 },
        { date: '11:25', temperature: 37.3 },
        { date: '11:30', temperature: 37.3 },
        { date: '11:35', temperature: 36.4 },
        { date: '11:40', temperature: 36.5 },
        { date: '11:45', temperature: 37.2 },
        { date: '11:50', temperature: 36.9 },
        { date: '11:55', temperature: 36.7 },
        { date: '12:00', temperature: 37.5 }
    ];
    return (
        <div>
            <Box>
                <Stack gap={20}>
                    <Text size='lg' fw={700} p={5}>Body  Temperature</Text>
                    <LineChart
                        h={200}
                        data={data}
                        series={[{ name: 'temperature', label: 'Avg. Temperature' }]}
                        dataKey="date"
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
                        yAxisProps={{ domain: [35.5, 38.5] }}
                        valueFormatter={(value) => `${value}°C`}
                    />
                    <Table>
                        <Table.Thead>
                            <Table.Tr>

                                <Table.Th>Time</Table.Th>
                                <Table.Th>Temperature</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {data.map((item) => {
                                return (
                                    <Table.Tr key={item.date}>
                                        <Table.Td><Text c={'dark-gray'}>{item.date}</Text></Table.Td>
                                        <Table.Td><Text c={'dark-gray.8'}>{item.temperature}°C</Text></Table.Td>
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
