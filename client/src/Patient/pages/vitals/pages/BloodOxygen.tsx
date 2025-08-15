import { LineChart } from "@mantine/charts";
import { Box, Stack, Table, Text } from "@mantine/core";


export interface IBloodOxygenProps {
}

export function BloodOxygen() {
  const data = [
    { time: '11:00', SpO2: 95 },
    { time: '11:05', SpO2: 90 },
    { time: '11:10', SpO2: 91 },
    { time: '11:15', SpO2: 97 },
    { time: '11:20', SpO2: 93 },
    { time: '11:25', SpO2: 98 },
    { time: '11:30', SpO2: 87 },
    { time: '11:35', SpO2: 82 },
    { time: '11:40', SpO2: 84 },
    { time: '11:45', SpO2: 95 },
    { time: '11:50', SpO2: 98 },
    { time: '11:55', SpO2: 90 },
    { time: '12:00', SpO2: 91 }
  ];
  return (
    <div>
      <Box>
        <Stack gap={20}>
          <Text size='lg' fw={700} p={5}>Blood Oxygen Level</Text>
          <LineChart
            h={200}
            data={data}
            series={[{ name: 'SpO2', label: 'SpO2' }]}
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
            yAxisProps={{ domain: [80.5, 100] }}
            valueFormatter={(value) => `${value}%`}
          />
          <Table>
            <Table.Thead>
              <Table.Tr>

                <Table.Th>Time</Table.Th>
                <Table.Th>Blood Oxygen</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data.map((item) => {
                return (
                  <Table.Tr key={item.time}>
                    <Table.Td><Text c={'dark-gray'}>{item.time}</Text></Table.Td>
                    <Table.Td><Text c={'dark-gray.8'}>{item.SpO2}%</Text></Table.Td>
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
