import { Flex, Paper, Text } from "@mantine/core";

export interface IFeatureProps {
}

export function Feature() {
  return (
    <div style={{
      paddingTop:"1rem"
    }}>
      <Text fw={900} size="xl" style={{
        textAlign: "center",
        color:"#34495e"
      }}>
        Features
      </Text>
      <Flex wrap={"wrap"} justify={"center"} gap={"sm"}>
        <section>
          <Paper shadow="xl" radius='lg' p="xl" h={150} style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
          }}>
            <Text>Maternal Pulse Rate</Text>
          </Paper>
        </section>
        <section>
          <Paper shadow="xl" radius='lg' p="xl" h={150} style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
          }}>
            <Text>Blood Oxygen Level</Text>
          </Paper>
        </section>
        <section>
          <Paper shadow="xl" radius='lg' p="xl" h={150} style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
          }}>
            <Text>Body Temperature</Text>
          </Paper>
        </section>
        <section>
          <Paper shadow="xl" radius='lg' p="xl" h={150} style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
          }}>
            <Text>Respiratory Rate</Text>
          </Paper>
        </section>
      </Flex>
    </div>
  );
}
