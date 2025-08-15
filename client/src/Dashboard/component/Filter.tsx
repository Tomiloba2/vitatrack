import { Box, Grid, Group, Select, Stack, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { MdSearch } from 'react-icons/md';
import { HealthStatus } from '../Charts/HealthCondition';
import { Patients } from './Patients';

export interface IFilterCompProps {
}

const lists = [
    { img: "", initials: "OD", name: "Oluwabori David Suara", id: 12345, status: "critical", lM: "21mins" },
    { img: "", initials: "OD", name: "Oluwabori David Suara", id: 12345, status: "stable", lM: "21mins" },
    { img: "", initials: "OD", name: "Oluwabori David Suara", id: 12345, status: "critical", lM: "21mins" },
    { img: "", initials: "OD", name: "Oluwabori David Suara", id: 12345, status: "critical", lM: "21mins" },
    { img: "", initials: "OD", name: "Oluwabori David Suara", id: 12345, status: "stable", lM: "21mins" },
    { img: "", initials: "OD", name: "Oluwabori David Suara", id: 12345, status: "critical", lM: "21mins" },
    { img: "", initials: "OD", name: "Oluwabori David Suara", id: 12345, status: "critical", lM: "21mins" },
    { img: "", initials: "OT", name: "Oluwabori David Suara", id: 12345, status: "critical", lM: "21mins" },
    { img: "", initials: "OT", name: "Oluwabori David Suara", id: 12345, status: "critical", lM: "21mins" },
    { img: "", initials: "OT", name: "Oluwabori David Suara", id: 12345, status: "stable", lM: "21mins" },
    { img: "", initials: "OT", name: "Oluwabori David Suara", id: 12345, status: "critical", lM: "21mins" },
    { img: "", initials: "OT", name: "Oluwabori David Suara", id: 12345, status: "critical", lM: "21mins" },
    { img: "", initials: "Os", name: "Oluwabori David Suara", id: 12345, status: "stable", lM: "21mins" },
    { img: "", initials: "Os", name: "Oluwabori David Suara", id: 12345, status: "critical", lM: "21mins" },
    { img: "", initials: "Os", name: "Oluwabori David Suara", id: 12345, status: "critical", lM: "21mins" },
    { img: "", initials: "Os", name: "Oluwabori David Suara", id: 12345, status: "critical", lM: "21mins" },
]

export function FilterComp() {
/*     const [statusValue, setStatusValue] = useState<string | null>("All")
    console.log(statusValue);
 */
    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            search: "",
            status: 'All'
        },
        validate: {
            search: isNotEmpty()
        }
    })
    /* const handleSearch = form.onSubmit((value) => {

    })
    const handleFilter = form.onSubmit((value) => {
        const newList = lists.filter((item) => item.status === value.status)
        console.log(newList);

        return newList
    }) */
    return (
        <div>
            <Stack>
                <Box>
                    <Grid>
                        <Grid.Col span={7}>
                            <form action="">
                                <TextInput
                                    type='search'
                                    placeholder='search by Name or ID'
                                    rightSection={<MdSearch
                                        size={20}
                                        cursor={"pointer"} />}
                                    rightSectionPointerEvents='all'
                                    key={form.key('email')}
                                    {...form.getInputProps('email')} />
                            </form>
                        </Grid.Col>
                        <Grid.Col span={4}>
                            <Group>
                                <Select
                                    placeholder='Stable or Critical'
                                    data={["All", "stable", "critical"]}
                                   defaultValue={"All"}
                                />
                            </Group>
                        </Grid.Col>
                    </Grid>
                </Box>
                <HealthStatus />
                <Patients lists={lists} />
            </Stack>
        </div>
    );
}
