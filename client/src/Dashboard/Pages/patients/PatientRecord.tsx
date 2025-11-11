import { Box, Card, Image, Skeleton, Table, Tabs, Text } from "@mantine/core";
import Img from "../../../assests/file_000000002aa0620aa3f9d707cb9f0974 (1).png"
import { useParams } from "react-router-dom";
import { BodyTemp } from "./vitals/BodyTemperature";
import { PulseRate } from "./vitals/PulseRate";
import { BloodOxygen } from "./vitals/BloodOxygen";
import { RespirationRate } from "./vitals/RespirationRate";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IPatientDetails, IVital } from "../../../Types/PatientLists";


export interface IPatientRecordProps {
}

export function PatientRecord() {
    const { id } = useParams()
    const { data: lists, isError, isLoading/* , error  */} = useQuery({
        queryKey: ["single-patient"],
        queryFn: async (): Promise<IPatientDetails> => {
            try {
                const datlists = await axios.get(`${import.meta.env.VITE_SERVER}/get-patient/${id}`)
                return datlists.data
            } catch (error) {
                console.error(error);
                throw error
            }
        }
    })
    const fetchVitals = useQuery({
        queryKey: ["single-patient-vitals"],
        queryFn: async (): Promise<IVital[]> => {
            try {
                const datlists = await axios.get(`${import.meta.env.VITE_SERVER}/get-vitals/${id}`)
                return datlists.data
            } catch (error) {
                console.error(error);
                throw error
            }
        }
    })
    const patientIdentification = [
        { name: "Patient Name", value: lists?.name },
        { name: "Age", value: lists?.age },
        { name: "Contact", value: lists?.contact },
        { name: "Blood Group", value: lists?.bloodGroup },
        { name: "Gestation Age", value: lists?.GestationAge },
        { name: "Pregnancy Type", value: lists?.pregnancyType },
        { name: "EDD", value: lists?.EDD && new Date(lists?.EDD).toLocaleDateString() },
        { name: "LMP", value: lists?.EDD && new Date(lists?.LMP).toLocaleDateString() },
        { name: "Gravida/Para/Abortion/Living", value: lists?.GPAL },
        { name: "High-Risk", value: lists?.HighRisk.toUpperCase() },
    ]

    return (
        <div >
            <Tabs defaultValue={'first'} pt={20} variant={'outline'}>
                <Tabs.List>
                    <Tabs.Tab value='first'>Patient Info</Tabs.Tab>
                    <Tabs.Tab value='third'>Body Temperature</Tabs.Tab>
                    <Tabs.Tab value='fourth'>Heart Rate</Tabs.Tab>
                    <Tabs.Tab value='fifth'>Blood Oxygen Level</Tabs.Tab>
                    <Tabs.Tab value='sixth'>Respiration Rate</Tabs.Tab>
                </Tabs.List>

                {
                    isLoading || fetchVitals.isLoading && (
                        <>
                            <Box style={{
                                height: "50vh",
                                display: "flex",
                                flexDirection: "column",
                                gap: "20px",
                                justifyContent: "center",
                                alignItem: "center"
                            }}>
                                <Skeleton height={20} width={'100%'} />
                                <Skeleton height={20} width={'100%'} />
                                <Skeleton height={20} width={'100%'} />
                                <Skeleton height={20} width={'100%'} />
                                <Skeleton height={20} width={'100%'} />
                            </Box>
                        </>
                    )}
                {
                    isError || fetchVitals.isError && (
                        <>
                            {"an errow occured"
                            }
                        </>)
                }
                {
                    !isLoading && !isError && lists &&
                    !fetchVitals.isLoading && !fetchVitals.isError && fetchVitals.data &&
                    (
                        <>
                            <Tabs.Panel value="first">
                                <Card pt={20}>
                                    <Card.Section style={{
                                        padding: "20px",
                                        height: "100%",
                                        display: "flex",
                                        alignItems: "center"
                                    }}>
                                        <Image h={160} w={160} src={Img} radius={'lg'} />
                                    </Card.Section>
                                    <Table>
                                        <Table.Tbody>
                                            {patientIdentification?.map((item) => {
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

                            <Tabs.Panel value="third">
                                <BodyTemp vitals={fetchVitals?.data} />
                            </Tabs.Panel>
                            <Tabs.Panel value="fourth">
                                <PulseRate vitals={fetchVitals?.data} />
                            </Tabs.Panel>
                            <Tabs.Panel value="fifth">
                                <BloodOxygen vitals={fetchVitals?.data} />
                            </Tabs.Panel>
                            <Tabs.Panel value="sixth">
                                <RespirationRate vitals={fetchVitals?.data} />
                            </Tabs.Panel>
                        </>

                    )
                }
            </Tabs>
        </div>
    );
}
