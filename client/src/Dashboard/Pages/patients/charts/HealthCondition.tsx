import { PieChart } from '@mantine/charts';
import { Box, Paper, Text } from '@mantine/core';
import { IPatientDetail } from '../../../../Types/PatientLists';

export interface IHealthStatus {
    lists: IPatientDetail[] | []
}

export function HealthStatus({ lists }: IHealthStatus) {
    const data = [
        {
            name: 'Stable',
            value: lists?.filter(item => item.status === "stable").length,
            color: 'success-green'
        },
        {
            name: 'Critical',
            value: lists?.filter(item => item.status === "critical").length,
            color: 'alert-red'
        }
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