import { Card, Flex, Image, Text } from "@mantine/core";
import respiratory from "../../assests/respiratory-rate.jpg"
import maternal from "../../assests/maternal-pulse.jpg"
import temp from "../../assests/temperature.jpg"
import blood from "../../assests/blood-oxygen.jpg"

export interface IFeatureProps {
}

export function Feature() {
  return (
    <div style={{
      paddingTop:"1rem"
    }}>
      <Text fw={900} size="xl" p={10} style={{
        textAlign: "center",
        color:"#34495e"
      }}>
        Features
      </Text>
      <Flex wrap={"wrap"} justify={"center"} gap={"lg"}>
        <section>
          <Card shadow="xl" radius='lg'>
            
            <Card.Section>
              <Image
              src={maternal}
              alt="maternal pulse rate"
              h={160}
              />
            </Card.Section>
            <Text size="sm" fw={600}>Maternal Pulse Rate</Text>
          </Card>
        </section>
        <section>
          <Card shadow="xl" radius='lg'>
            
            <Card.Section>
              <Image
              src={blood}
              alt="blood oxygen level"
              h={160}
              />
            </Card.Section>
            <Text size="sm" fw={600}>Blood Oxygen Level</Text>
          </Card>
        </section>
        <section>
          <Card shadow="xl" radius='lg'>
          <Card.Section>
            <Image
            src={temp}
            alt="body temperature"
            h={160}
            />
          </Card.Section>
            <Text size="sm" fw={600}>Body Temperature</Text>
          </Card>
        </section>
        <section>
          <Card shadow="xl" radius='lg'>
            <Card.Section>
              <Image
              src={respiratory}
              alt="respiratory rate"
              h={160}
              />
            </Card.Section>
            <Text size="sm" fw={600}>Respiratory Rate</Text>
          </Card>
        </section>
      </Flex>
    </div>
  );
}
