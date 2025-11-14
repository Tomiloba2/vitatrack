import { LineChart } from "@mantine/charts";
import { Box, Stack, Table, Text } from "@mantine/core";
import { IVital } from "../../../../Types/PatientLists";

export interface IRespirationRateProps {
  vitals: IVital[]
}

export function RespirationRate(props:IRespirationRateProps) {
  const { vitals } = props
    const data = vitals?.map((item) => {
        return {
            time: new Date(new Date(item.time_monitored).getTime() + 4 * 60 * 60 * 1000).toLocaleTimeString(),
            respirationRate: item.respiration_rate
        }
    })
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
            strokeWidth={3}
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
