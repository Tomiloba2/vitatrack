import { Button, Group, Text } from '@mantine/core';
import { MdRefresh } from 'react-icons/md';

export interface IHeaderProps {
}

export function Header() {
    return (
        <div>
            <Group justify='space-between'>
                <Text size='xl' fw={'bolder'}>Appointments</Text>
                <Button variant='outline' leftSection={<MdRefresh />}>
                    <Text>Refresh</Text>
                </Button>
            </Group>
        </div>
    );
}
