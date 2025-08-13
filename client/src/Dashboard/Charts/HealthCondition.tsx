import { PieChart } from '@mantine/charts';
import { Box, Paper, Text } from '@mantine/core';


export function HealthStatus() {
    const data = [
        { name: 'Stable', value: 25, color: 'success-green' },
        { name: 'Critical', value: 10, color: 'alert-red' }
    ];
    return (
        <Box style={{
            display: "flex",
            justifyContent: "center"
        }}>
            <Paper shadow='lg' radius={'lg'}>
                <Text fz="lg" fw={500} ta="center">
                    Health Status
                </Text>
                <PieChart
                    withLabelsLine
                    labelsPosition="outside"
                    labelsType="value" withLabels
                    data={data} withTooltip />
            </Paper>
        </Box>)
}