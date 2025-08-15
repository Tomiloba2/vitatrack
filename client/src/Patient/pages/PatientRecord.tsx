import { Card, Image, Table, Tabs, Text } from "@mantine/core";
import Img from "../../assests/file_000000002aa0620aa3f9d707cb9f0974 (1).png"
import { useNavigate } from "react-router-dom";
import styles from "../../Dashboard/styles.module.css"


export interface IPatientRecordProps {
}

export function PatientRecord() {
    const navigate = useNavigate()
    const patientIdentification = [
        { name: "Patient Name", value: "Oluwabori Angel" },
        { name: "Age", value: "28" },
        { name: "Contact", value: "0803-456-7890" },
        { name: "Blood Group", value: "O+" },
        { name: "Gestation Age", value: "28 weeks, 4 days" },
        { name: "Pregnancy Type", value: "Singleton" },
        { name: "EDD", value: "Nov 15,2025" },
        { name: "LMP", value: "Feb 8,2025" },
        { name: "Gravida/Para/Abortion/Living", value: "G2 P1 A0 L1" },
        { name: "High-Risk", value: "No" },
    ]
    const vitals = [
        { name: "HR", value: "82bpm", to: "/patient/vitals/pulse-rate" },
        { name: "Temp", value: "36.8C", to: "/patient/vitals" },
        { name: "SpO2", value: "98%", to: '/patient/vitals/blood-oxygen' }
    ]
    return (
        <div >
            <Tabs defaultValue={'first'}>
                <Tabs.List>
                    <Tabs.Tab value='first'>Patient Info</Tabs.Tab>
                    <Tabs.Tab value='second'>Vital Info</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="first">
                    <Card pt={20}>
                        <Card.Section style={{
                            padding:"20px",
                            height: "100%",
                            display: "flex",
                            alignItems: "center"
                        }}>
                            <Image h={160} w={160} src={Img} radius={'lg'} />
                        </Card.Section>
                        <Table>
                            <Table.Tbody>
                                {patientIdentification.map((item) => {
                                    return (
                                        <Table.Tr key={item.name}>
                                            <Table.Td><Text c={'dark-gray'}>{item.name}</Text></Table.Td>
                                            <Table.Td><Text c={'dark-gray.8'}>{item.value}</Text></Table.Td>
                                        </Table.Tr>
                                    )
                                })}
                            </Table.Tbody>
                        </Table>
                    </Card>
                </Tabs.Panel>

                <Tabs.Panel value="second">
                    <Card pt={20}>
                        <Table>
                            <Table.Tbody>
                                {vitals.map((item) => {
                                    return (
                                        <Table.Tr key={item.name} className={styles.tableRow} onClick={() => navigate(`${item.to}`)}>
                                            <Table.Td><Text c={'dark-gray'}>{item.name}</Text></Table.Td>
                                            <Table.Td><Text c={'dark-gray.8'}>{item.value}</Text></Table.Td>
                                        </Table.Tr>
                                    )
                                })}
                            </Table.Tbody>
                        </Table>
                    </Card>
                </Tabs.Panel>

            </Tabs>
        </div>
    );
}
