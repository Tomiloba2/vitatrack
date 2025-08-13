import { Grid, Group, Select, TextInput } from '@mantine/core';
import { MdSearch } from 'react-icons/md';

export interface IFilterCompProps {
}

export function FilterComp() {
    const handleSearch = () => {

    }
    return (
        <div>
            <Grid>
                <Grid.Col span={7}>
                    <TextInput
                        type='search'
                        placeholder='search by Name or ID'
                        rightSection={<MdSearch
                            size={20}
                            onClick={handleSearch}
                            cursor={"pointer"} />}
                        rightSectionPointerEvents='all' />
                </Grid.Col>
                <Grid.Col span={4}>
                    <Group>
                        <Select
                            placeholder='Stable or Critical'
                            defaultValue={"All"}
                            data={["All", "Stable", "Critical"]} />
                    </Group>
                </Grid.Col>
            </Grid>
        </div>
    );
}
