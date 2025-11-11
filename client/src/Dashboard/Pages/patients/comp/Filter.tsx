import { Box, Grid, Group, Select, Skeleton, Stack, TextInput } from '@mantine/core';
import { MdSearch } from 'react-icons/md';
import { HealthStatus } from '../charts/HealthCondition';
import { Patients } from './Patients';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { IPatientDetail } from '../../../../Types/PatientLists';
import { useState } from 'react';

export interface IFilterCompProps {
}

export function FilterComp() {
    const status = ["All", "stable", "critical"]
    const [statusValue, setStatusValue] = useState<string | null>(status[0])
    const [inputVal, setInputVal] = useState('')
    const { data: lists, isError, isLoading, error } = useQuery({
        queryKey: ["patients lists"],
        queryFn: async (): Promise<IPatientDetail[]> => {
            try {
                const datalist = await axios.get(`${import.meta.env.VITE_SERVER}/get-patients`)
                return datalist.data
            } catch (error) {
                console.error(error);
                throw error

            }
        }
    })
    const filteredStatusList = lists?.filter(item => {
        const search = item.name.toLowerCase().includes(inputVal.toLowerCase())
        if (statusValue === 'All' || statusValue === null) {
            return item
        } else if (inputVal !=='') {
            return search
        }
        return item.status === statusValue
    })
    

    return (
        <div>
            <Stack>
                <Box>
                    <Grid>
                        <Grid.Col span={7}>
                            <form action="">
                                <TextInput
                                    type='search'
                                    value={inputVal}
                                    onChange={(e) => setInputVal(e.target.value)}
                                    placeholder='search by Name or ID'
                                    rightSection={<MdSearch
                                        size={20}
                                        cursor={"pointer"} />}
                                    rightSectionPointerEvents='all' />
                            </form>
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <Group>
                                <Select
                                    placeholder='Stable or Critical'
                                    data={status}
                                    value={statusValue}
                                    defaultValue={"All"}
                                    onChange={(option) => setStatusValue(option)}
                                />
                            </Group>
                        </Grid.Col>
                    </Grid>
                </Box>
                {isLoading ? (
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
                ) : isError ? (
                    <>{error.message}</>
                ) : (<>
                    <HealthStatus lists={lists || []} />
                    <Patients lists={filteredStatusList || []} />
                </>
                )}

            </Stack>
        </div>
    );
}
