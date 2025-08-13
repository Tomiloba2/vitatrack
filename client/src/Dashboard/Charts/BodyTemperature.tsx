import { LineChart } from '@mantine/charts';
import { Box, Text } from '@mantine/core';

export function AverageTemperature() {
    const data = [
        { date: 'Jan', temperature: 36.9 },
        { date: 'Feb', temperature: 36.95 },
        { date: 'Mar', temperature: 37 },
        { date: 'Apr', temperature: 36.85 },
        { date: 'May', temperature: 36.95 },
        { date: 'Jun', temperature: 36.9 },
        { date: 'Jul', temperature: 37.05 },
        { date: 'Aug', temperature: 37.1 },
        { date: 'Sep', temperature: 36 },
        { date: 'Oct', temperature: 35 },
        { date: 'Nov', temperature: 38},
        { date: 'Dec', temperature: 36.5 },
    ];
    return (
        <Box>
            <Text size='lg' fw={700} p={5}>Average Patients Temperature</Text>
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
                yAxisProps={{ domain: [34.5, 39] }}
                valueFormatter={(value) => `${value}°C`}
            />
        </Box>
    );
}