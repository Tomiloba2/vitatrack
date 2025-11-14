import { LineChart } from "@mantine/charts";
import { Box, Stack, Table, Text } from "@mantine/core";
import { IVital } from "../../../../Types/PatientLists";


export interface IBodyTempProps {
    vitals: IVital[]
}

export function BodyTemp(props: IBodyTempProps) {
    const { vitals } = props
    const data = vitals?.map((item) => {
        return {
            date: new Date(new Date(item.time_monitored).getTime() + 4 * 60 * 60 * 1000).toLocaleTimeString(),
            temperature: item.temperature
        }
    })
    console.log(vitals);

    return (
        <div>
            <Box>
                <Stack gap={20}>
                    <Text size='lg' fw={700} p={5}>Body  Temperature</Text>
                    <Box >
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
                            strokeWidth={3}
                            curveType="natural"
                            yAxisProps={{ domain: [35.5, 38.5] }}
                            valueFormatter={(value) => `${value}°C`}
                        />
                    </Box>
                    <Table>
                        <Table.Thead>
                            <Table.Tr>

                                <Table.Th>Time</Table.Th>
                                <Table.Th>Temperature</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {data?.map((item) => {
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
