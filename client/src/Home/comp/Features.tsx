import { Card, Flex, Image, Text } from "@mantine/core";
import respiratory from "../../assests/respiratory-rate.jpg"
import maternal from "../../assests/maternal-pulse.jpg"
import temp from "../../assests/temperature.jpg"
import blood from "../../assests/blood-oxygen.jpg"
import styles from '../styles.module.css'

export interface IFeatureProps {
}

export function Feature() {
  const featureLists = [
    { text: "Maternal Pulse Rate", img: maternal },
    { text: "Blood Oxygen Level", img: blood },
    { text: "Body Temperature", img: temp },
    { text: "Respiratory Rate", img: respiratory },
  ]
  return (
    <div style={{
      paddingTop: "1rem"
    }}>
      <Text fw={900} size="xl" p={10} style={{
        textAlign: "center",
        color: "#34495e"
      }}>
        Features
      </Text>
      <Flex wrap={"wrap"} justify={"center"} gap={"lg"}>
        {featureLists.map((item) => {
          return (
            <section key={item.text} className={styles.features}>
              <Card shadow="xl" radius='lg'>

                <Card.Section>
                  <Image
                    src={item.img}
                    alt={item.text}
                    h={160}
                  />
                </Card.Section>
                <Text size="sm" fw={600}>{item.text}</Text>
              </Card>
            </section>
          )
        })}
      </Flex>
    </div>
  );
}
