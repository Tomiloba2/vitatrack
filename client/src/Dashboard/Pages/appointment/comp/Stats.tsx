import { Box, Group, Paper, Stack, Text } from '@mantine/core';

export interface IAppointmentStatsProps {
}

export function AppointmentStats() {
  const stats = [
    { name: "Total Appointments Today", number: 12 },
    { name: "Upcoming Appointments", number: 5 },
    { name: "Completed This Week", number: 20 },
  ]
  return (
    <div>
      <Box>
        <Paper shadow='lg' p={20}>
          <Text size='lg' fw={'bolder'}>Stats</Text>
          <Stack>
            {stats.map((item) => {
              return (
                <Group justify='space-between'>
                  <Text size='sm' fw={'500'}>{item.name}</Text>
                  <Text size='sm' fw={'500'}>{item.number}</Text>
                </Group>
              )
            })}
          </Stack>
        </Paper>
      </Box>
    </div>
  );
}
