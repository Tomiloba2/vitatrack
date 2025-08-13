import { Box, Container, Stack } from "@mantine/core";
import { Navbar } from "./component/Nav";
import { FilterComp } from "./component/Filter";
import { Patients } from "./component/Patients";
import { AverageTemperature } from "./Charts/BodyTemperature";
import { HealthStatus } from "./Charts/HealthCondition";
import { PulseRate } from "./Charts/PulseRate";

export interface IDashboardProps {
}

export function Dashboard() {
  return (
    <div>
      <Container>
        <Stack gap={10}>
          <Box><Navbar /></Box>
          <Box><FilterComp /></Box>
          <Box><HealthStatus /></Box>
          <Box><Patients /></Box>
          <Stack gap={100}>

            <Box><AverageTemperature /></Box>
            <Box><PulseRate /></Box>

          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
