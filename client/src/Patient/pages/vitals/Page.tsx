
import { Avatar, Box, Group, Stack, Text } from '@mantine/core';
import { MdArrowBack } from 'react-icons/md';
import { Outlet, useNavigate } from 'react-router-dom';

export interface IVitalsProps {
}

export function Vitals() {
    const navigate = useNavigate()
    return (
        <div>
            <Stack gap={20}>
                <Group>
                    <Box onClick={() => navigate(-1)} style={{
                        padding: "5px",
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        border: "1px solid ",
                        borderRadius: "100%",
                        backgroundColor: "warm-gray"
                    }}>
                        <MdArrowBack />
                    </Box>
                    <Avatar
                        src={''}
                        alt='OA'
                        size={'xl'}>OA</Avatar>
                    <Text size='md' c={'dark-gray.9'}>Oluwabori Angel</Text>
                </Group>
                <Outlet />
            </Stack>
        </div>
    );
}
