import { LineChart } from "@mantine/charts";
import { Box, Stack, Table, Text } from "@mantine/core";

export interface IRespirationRateProps {
}

export function RespirationRate() {
  const data = [
    { time: '11:00', respirationRate: 18 },
    { time: '11:05', respirationRate: 18 },
    { time: '11:10', respirationRate: 19 },
    { time: '11:15', respirationRate: 19 },
    { time: '11:20', respirationRate: 19 },
    { time: '11:25', respirationRate: 21 },
    { time: '11:30', respirationRate: 24 },
    { time: '11:35', respirationRate: 25 },
    { time: '11:40', respirationRate: 20 },
    { time: '11:45', respirationRate: 20 },
    { time: '11:50', respirationRate: 17 },
    { time: '11:55', respirationRate: 17 },
    { time: '12:00', respirationRate: 17 }
  ];
  return (
    <div>
      <Box>
        <Stack gap={20}>
          <Text size='lg' fw={700} p={5}>Respiration Rate</Text>
          <LineChart
            h={200}
            data={data}
            series={[{ name: 'respirationRate', label: 'respirationRate' }]}
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
            yAxisProps={{ domain: [10,30] }}
            valueFormatter={(value) => `${value} bpm`}
          />
          <Table>
            <Table.Thead>
              <Table.Tr>

                <Table.Th>Time</Table.Th>
                <Table.Th>Respiration Rate</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data.map((item) => {
                return (
                  <Table.Tr key={item.time}>
                    <Table.Td><Text c={'dark-gray'}>{item.time}</Text></Table.Td>
                    <Table.Td><Text c={'dark-gray.8'}>{item.respirationRate} bpm</Text></Table.Td>
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
